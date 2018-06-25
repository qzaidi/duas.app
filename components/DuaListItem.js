import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { RegularText, BoldText } from './StyledText';

export class DuaListItem extends React.Component {
  render() {

    let { icon, name } = this.props.info;
    return (
      <TouchableNativeFeedback
        delayPressIn={80}
        onPress={this.props.onPress}
        delayPressIn={80}
        style={styles.container}
        fallback={TouchableHighlight}
        underlayColor="#ccc">
        <View style={styles.logoContainer}>
          <FadeIn
            placeholderStyle={{
              backgroundColor:
                Platform.OS === 'android' ? 'transparent' : '#eee',
            }}>
            <Image
              resizeMode="contain"
              source={{ uri: icon }}
              style={styles.logo}
            />
          </FadeIn>
        </View>
        <View style={styles.infoContainer}>
          <RegularText style={styles.name}>{name}</RegularText>

          <RegularText style={styles.hours}>
            12:00-14:00
          </RegularText>

          <RegularText style={styles.address}>
            10 Downing St., London
          </RegularText>
        </View>

        <View style={styles.buttonContainer}>
          <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
        </View>
      </TouchableNativeFeedback>
     );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.width,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 16,
  },
  hours: {
    fontSize: 12,
  },
  address: {
    fontSize: 12,
  },
  logoContainer: {
    padding: 15,
  },
  logo: {
    width: 60,
    height: 60,
  },
  buttonContainer: {
    paddingRight: 5,
  },
});
