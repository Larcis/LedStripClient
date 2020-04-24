import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';
import {hsv2rgb, rgb2text, set_color, get_color} from '../constants/utils.js';
import {set_mode} from "../constants/utils";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hue: 0,
      sat: 0,
      val: 1,
      rgb: ""
    };
    this.onSatValPickerChange = this.onSatValPickerChange.bind(this);
    this.onHuePickerChange = this.onHuePickerChange.bind(this);
    set_mode("free");
    get_color().then((res) => {
      this.setState({
        rgb: rgb2text(res)})
      })
  }

  onSatValPickerChange({ saturation, value }) {
    this.setState({
      sat: saturation,
      val: value,
    });
    set_color(hsv2rgb(this.state.hue,this.state.sat,this.state.val)).then((res)=>{
      this.setState({rgb: rgb2text(res)})
    })
  }

  onHuePickerChange({ hue }) {
    this.setState({
      hue,
    });
    
    set_color(hsv2rgb(this.state.hue,this.state.sat,this.state.val)).then((res)=>{
      this.setState({rgb: rgb2text(res)})
    })
  }

  render() {
    const { hue, sat, val, rgb } = this.state;
    return (
      <View style={styles.container}>
        <Text>{rgb}
        </Text>
        <HsvColorPicker
          huePickerHue={hue}
          onHuePickerDragMove={this.onHuePickerChange}
          onHuePickerPress={this.onHuePickerChange}
          satValPickerHue={hue}
          satValPickerSaturation={sat}
          satValPickerValue={val}
          onSatValPickerDragMove={this.onSatValPickerChange}
          onSatValPickerPress={this.onSatValPickerChange}
          huePickerBarHeight={270}
          huePickerSliderSize={30}
          satValPickerSize={250}
          satValPickerSliderSize={30}
          satValPickerBorderRadius={10}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});