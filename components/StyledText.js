import React from 'react';
import { Text,StyleSheet } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}

export class RegularText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.regular]} />
    );
  }
}

export class LightText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.light]} />
    );
  }
}

export class BoldText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.bold]} />
    );
  }
}

export class ArabicText extends React.Component {
  render() {
    return (
      <Text {...this.props} style={[this.props.style, styles.arabic]} />
    );
  }
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'OpenSans',
  },
  light: {
    fontFamily: 'OpenSans-Light',
  },
  bold: {
    fontFamily: 'OpenSans-Bold',
  },
  arabic: {
    fontFamily: 'Scheherazade',
    fontSize: 20,
    textAlign: 'right',
    letterSpacing: 5,
  },
});
