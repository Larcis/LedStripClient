import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Slider,
  ScrollView,
  Switch
} from 'react-native';

import { set_mode } from "../constants/utils";

let wd = Math.round(Dimensions.get('window').width);
const height = Dimensions.get('window').height;

const MODES = {
  FREE: 1,
  FADE: 2,
  PATROL: 3,
  FLASH: 4
}
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
var API = "http://192.168.1.150";
export default class ModeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: MODES.FREE,
      speed: 10,
      fade_delay: "Delay",
      fade_step_size: "Step Size",
      patrol_begin: 30,
      patrol_end: 330,
      patrol_delay: "Delay",
      patrol_is_one_way: false,
      flash_delay_dark: "Delay Dark",
      flash_delay_light: "Delay light",
      flash_random_enabled: false

    };
  }
  componentWillUnmount() {
  }
  toggle_flash = () => {
    let md = this.state.mode;
    if (md != MODES.FLASH) {
      this.setState({ mode: MODES.FLASH });
      let s = this.state;
      fetch(`${API}/change_flash_params?delay_dark=${s.flash_delay_dark}&delay_light=${s.flash_delay_light}&random_enabled=${s.flash_random_enabled ? 1 : 0}`, requestOptions).catch(error => console.log('error', error));
      set_mode("flash");
    } else {
      set_mode("free");
      this.setState({ mode: MODES.FREE });
    }
  }
  toggle_fade = () => {
    let md = this.state.mode;
    if (md != MODES.FADE) {
      this.setState({ mode: MODES.FADE });
      let s = this.state;
      fetch(`${API}/change_fade_params?delay=${s.fade_delay}&step_size=${s.fade_step_size}`, requestOptions).catch(error => console.log('error', error));;
      set_mode("fade");
    } else {
      set_mode("free");
      this.setState({ mode: MODES.FREE });
    }
  }
  toggle_patrol = () => {
    let md = this.state.mode;
    if (md != MODES.PATROL) {
      this.setState({ mode: MODES.PATROL });
      let s = this.state;
      fetch(`${API}/change_patrol_params?interval_start=${s.patrol_begin}&interval_end=${s.patrol_end}&delay=${s.patrol_delay}&one_way=${s.patrol_is_one_way ? 1 : 0}`, requestOptions).catch(error => console.log('error', error));
      set_mode("patrol");
    } else {
      set_mode("free");
      this.setState({ mode: MODES.FREE });
    }
  }
  random_mode = () => {
    fetch("http://192.168.1.150/random_mode", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      switch(result){
        case "fade": this.setState({ mode: MODES.FADE }); break;
        case "flash": this.setState({ mode: MODES.FLASH }); break;
        case "patrol": this.setState({ mode: MODES.PATROL }); break;
      }
    })
    .catch(error => console.log('error', error));
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.divStyle}>
            <TouchableOpacity
              style={[styles.button, this.state.mode == MODES.FADE ? { backgroundColor: "green" } : { backgroundColor: "blue" }]}
              onPress={() => this.toggle_fade()}
            >
              <Text style={{ color: "white" }}>Fade</Text>
            </TouchableOpacity>
            <Text>{this.state.fade_delay}</Text>
            <View style={{ flex: 2 }}>
              <Slider
                minimumValue={1}
                maximumValue={200}
                minimumTrackTintColor="#1EB1FC"
                maximumTractTintColor="#1EB1FC"
                step={1}
                value={10}
                onValueChange={value => this.setState({ fade_delay: value })}
                style={styles.slider}
                thumbTintColor="#1EB1FC"
              />

            </View>
            <Text>{this.state.fade_step_size}</Text>
            <View style={{ flex: 2 }}>

              <Slider
                minimumValue={0.001}
                maximumValue={1}
                minimumTrackTintColor="#1EB1FC"
                maximumTractTintColor="#1EB1FC"
                step={0.01}
                value={0.01}
                onValueChange={value => this.setState({ fade_step_size: value })}
                style={styles.slider}
                thumbTintColor="#1EB1FC"
              />

            </View>
          </View>

          <View style={styles.divStyle}>
            <TouchableOpacity
              style={[styles.button, this.state.mode == MODES.PATROL ? { backgroundColor: "green" } : { backgroundColor: "blue" }, { marginTop: 10 }]}
              onPress={() => this.toggle_patrol()}
            >
              <Text style={{ color: "white" }}>Patrol</Text>
            </TouchableOpacity>
            <Text>Interval</Text>
            <View style={{ flex: 2 }}>
              <View style={{ flex: 1, flexDirection: "row" }}>

                <TextInput
                  style={{ height: 30, width: wd / 3, borderColor: 'black', borderWidth: 1 }}
                  onChangeText={text => this.setState({ patrol_begin: parseInt(text) })}
                  keyboardType='numeric'
                />
                <Text>__________</Text>
                <TextInput
                  style={{ height: 30, width: wd / 3, borderColor: 'black', borderWidth: 1 }}
                  onChangeText={text => this.setState({ patrol_end: parseInt(text) })}
                  keyboardType='numeric'
                />
              </View>

            </View>
            <Text>{this.state.patrol_delay}</Text>
            <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
              <View style={{ flex: 1 }}>
                <Slider
                  minimumValue={1}
                  maximumValue={200}
                  minimumTrackTintColor="#1EB1FC"
                  maximumTractTintColor="#1EB1FC"
                  step={1}
                  value={20}
                  onValueChange={value => this.setState({ patrol_delay: value })}
                  style={styles.slider}
                  thumbTintColor="#1EB1FC"
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text>Is One Way</Text>
                <Switch
                  value={this.state.patrol_is_one_way}
                  onValueChange={v => {
                    this.setState({ patrol_is_one_way: v });
                  }} />
              </View>
            </View>
          </View>
          <View style={styles.divStyle}>

            <TouchableOpacity
              style={[styles.button, this.state.mode == MODES.FLASH ? { backgroundColor: "green" } : { backgroundColor: "blue" }, { marginTop: 10 }]}
              onPress={() => this.toggle_flash()}
            >
              <Text style={{ color: "white" }}>Flash</Text>
            </TouchableOpacity>
            <Text>{this.state.flash_delay_dark}</Text>
            <View style={{ flex: 2 }}>
              <Slider
                minimumValue={1}
                maximumValue={1000}
                minimumTrackTintColor="#1EB1FC"
                maximumTractTintColor="#1EB1FC"
                step={1}
                value={250}
                onValueChange={value => this.setState({ flash_delay_dark: value })}
                style={styles.slider}
                thumbTintColor="#1EB1FC"
              />

            </View>
            <Text>{this.state.flash_delay_light}</Text>
            <View style={{ flex: 2 }}>
              <Slider
                minimumValue={1}
                maximumValue={1000}
                minimumTrackTintColor="#1EB1FC"
                maximumTractTintColor="#1EB1FC"
                step={1}
                value={500}
                onValueChange={value => this.setState({ flash_delay_light: value })}
                style={styles.slider}
                thumbTintColor="#1EB1FC"
              />

            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text>Is Random Enabled</Text>
              <Switch
                value={this.state.flash_random_enabled}
                onValueChange={v => {
                  this.setState({ flash_random_enabled: v });
                }} />
            </View>

          </View>
          
          <View style={[styles.divStyle, {flex: 1}]}>
          <TouchableOpacity
              style={[styles.button,{ backgroundColor: "yellow" }, { marginTop: 10 }]}
              onPress={() => this.random_mode()}
            >
              <Text style={{ color: "black" }}>Random Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "black" }, { marginTop: 10 }]}
              onPress={() => {
                set_mode("free");
                this.setState({ mode: MODES.FREE });
              }}
            >
              <Text style={{ color: "white" }}>Cancel All</Text>
            </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: wd,
    height: height
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: wd - 55,
    borderRadius: 15,
    flex: 1,
    marginTop: 8
  },
  slider: {
    position: 'absolute',
    marginLeft: -height * 0.225,
    width: wd * 0.8,
  },
  divStyle: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});