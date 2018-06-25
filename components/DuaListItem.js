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
import { RegularText, BoldText, ArabicText } from './StyledText';

export class DuaListItem extends React.Component {
  render() {

    let { icon, name, arabic, desc } = this.props.info;
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

          <ArabicText style={styles.arabic}>
            {arabic}
          </ArabicText>

          <RegularText style={styles.desc}>
            {desc}
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
  arabic: {
    fontSize: 14,
  },
  desc: {
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
