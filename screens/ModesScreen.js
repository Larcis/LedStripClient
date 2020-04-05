import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions  } from 'react-native';
import {
    start_fade,
    cancel_fade, 
    start_patrol_colors, 
    cancel_patrol_colors, 
    start_flash, 
    cancel_flash} from '../constants/modes.js';

let wd = Math.round(Dimensions.get('window').width);
const MODES = {
    FREE: 1,
    FADE: 2,
    PATROL: 3,
    FLASH: 4
}
export default class ModeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        mode: MODES.FREE,
        speed: 10
    };
  }
  componentWillUnmount(){
     this.stop_all();
  }
  stop_all(){
    cancel_fade();
    cancel_patrol_colors();
    cancel_flash();
    this.setState({mode: MODES.FREE});
  }
  toggle_flash= ()=>{
    let md = this.state.mode;
    if(md == MODES.FREE){
        start_flash();
        this.setState({mode: MODES.FLASH});
    } else if(md == MODES.FLASH){
        cancel_flash();
        this.setState({mode: MODES.FREE});
    }
  }
  toggle_fade = ()=>{
    let md = this.state.mode;
    if(md == MODES.FREE){
        start_fade(this.state.speed);
        this.setState({mode: MODES.FADE});
    } else if(md == MODES.FADE){
        cancel_fade();
        this.setState({mode: MODES.FREE});
    }
  }
  toggle_patrol = () => {
    let md = this.state.mode;
    if(md == MODES.FREE){
        start_patrol_colors(this.state.speed);
        this.setState({mode: MODES.PATROL});
    } else if(md == MODES.PATROL){
        cancel_patrol_colors();
        this.setState({mode: MODES.FREE});
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
            style={[styles.button, this.state.mode == MODES.FADE ? {backgroundColor: "green"} : {backgroundColor: "blue"}]}
            onPress={()=> this.toggle_fade()}
        >
        <Text style={{color:"white"}}>Fade</Text>
      </TouchableOpacity>
      <TouchableOpacity
            style={[styles.button, this.state.mode == MODES.PATROL ? {backgroundColor: "green"} : {backgroundColor: "blue"}, {marginTop: 10}]}
            onPress={()=>this.toggle_patrol()}
        >
        <Text style={{color:"white"}}>Patrol</Text>
      </TouchableOpacity>  
      <TouchableOpacity
            style={[styles.button, this.state.mode == MODES.FLASH ? {backgroundColor: "green"} : {backgroundColor: "blue"}, {marginTop: 10}]}
            onPress={()=>this.toggle_flash()}
        >
        <Text style={{color:"white"}}>Flash</Text>
      </TouchableOpacity>
      <TouchableOpacity
            style={[styles.button,  {backgroundColor: "black"}, {marginTop: 10}]}
            onPress={()=>this.stop_all()}
        >
        <Text style={{color:"white"}}>Cancel All</Text>
      </TouchableOpacity>
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: wd-55,
    borderRadius: 15
  },
});