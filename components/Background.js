import React, { Component } from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default class Background extends Component {

 constructor(props) {
    super(props);
    this.state = {
      cover: [
        require('../assets/images/covers/sunrise.jpg'),
        require('../assets/images/covers/evening.jpg'),
        require('../assets/images/covers/night.jpg'),
      ],
      selected: 2,
    };
  }

  componentWillMount() {
    const now = new Date().getHours();
    if (now > 9 && now < 17) {
      this.state.selected=0;
    } else if (now > 17 && now < 20) {
      this.state.selected=1;
    }
  }

  render() {
    return (
      <ImageBackground source={this.state.cover[this.state.selected]} resizeMode='cover' style={styles.coverImage}>
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
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
