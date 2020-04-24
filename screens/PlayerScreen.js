import React from 'react';
import { StyleSheet, View  } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import {set_mode} from "../constants/utils";
export default class PlayerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        html: "merhaba"
    };
  }
  componentWillUnmount(){
    set_mode("free");
  }
  componentDidMount(){
    this.download();
  }
  async download(){
    const indexHtml = Asset.fromModule(require('../assets/html/index.html'))
    await indexHtml.downloadAsync()
    //let HTMLFile = await FileSystem.readAsStringAsync(indexHtml.localUri)
    this.setState({ html: indexHtml.localUri})
  }
  render() {
    return (
           <WebView
            originWhitelist={['*']}
            source={{ uri: this.state.html }}
            allowUniversalAccessFromFileURLs
            allowFileAccessFromFileURLs
            allowFileAccess
            style={styles.WebViewStyle}
          />
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
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 0,
  },
});