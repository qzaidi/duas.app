import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default class Background extends Component {

 constructor(props) {
    super(props);
    this.state = {
      cover: '',
    };
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/cover.jpg')} resizeMode='cover' style={styles.coverImage}>
        {this.props.children}
      </ImageBackground>
    )
  }

}

const styles = StyleSheet.create({
  coverImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
