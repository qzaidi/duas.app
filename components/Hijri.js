import React	from 'react';
import {getHijriDate} from '../data/Hijri';
import {StyleSheet,Platform,Text,View} from 'react-native';
import { LightText } from './StyledText';
import DB from '../data/DB';


export default class HijriDate extends React.Component {
  state = {
      nextEvent: null,
      date: getHijriDate(),
      message: '',
  };

  componentDidMount() {
    const query = 'select urlkey,name,hijridate from events where hijridate > ? and hijrimonth = ?';
    const date = this.state.date;
    DB.executeSql(query,[date.day,date.month]).then(results => {
      if (results.length > 0) {
        this.setState({ message: results[0].name + ' on ' + results[0].hijridate});
      }
    }, (err) => console.log('executeSql hijri-event err ', err));
  }

	render() {
    const date = this.state.date;
		return (
      <View style={styles.tabBarInfoContainer}>
		    <Text > {
          date.day + " " + date.monthName + " " + date.year
		    } 
        </Text >
        <View style={styles.navigationFilename}>
          <LightText>
            {this.state.message}
          </LightText>
        </View>
      </View>
		);
	}
}
 
const styles = StyleSheet.create({
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },

  navigationFilename: {
    marginTop: 5,
  },

});
