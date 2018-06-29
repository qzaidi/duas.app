import React, { Component } from 'react';
import { WebView } from 'react-native';
import { withNavigation } from 'react-navigation';


@withNavigation
export default class WebviewScreen extends Component {
  render() {
    const key = this.props.navigation.getParam('key', "praise");

    return (
      <WebView
      source={{uri: 'https://duas.mobi/' + key}}
        style={{marginTop: 20}}
        />
    );
  }
}
