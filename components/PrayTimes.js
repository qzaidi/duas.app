import React, { Component } from 'react';
import { Platform, FlatList, StyleSheet, Text, View } from 'react-native';
import { DuaListItem } from './DuaListItem'
import PT from '../data/PrayTimes'
import { Constants, Location, Permissions } from 'expo';

const   timeNames = {
  fajr     : { en: 'Fajr', ar:'' },
  sunrise  : { en: 'Sunrise', ar: '' },
  dhuhr    : { en: 'Dhuhr', ar: '' },
  asr      : { en: 'Asr', ar: '' },
  maghrib  : { en: 'Maghrib', ar: '' },
  isha     : { en: 'Isha', ar: '' },
};

function relativeTime(time,now) {
  var next = new Date(now.getTime());
  var hm = time.split(':')
  var isfuture;
  var rh,rm;
  var str = ' in ';

  next.setHours(hm[0]);
  next.setMinutes(hm[1]);

  seconds = (next.getTime() - now.getTime())/1000;
  if (seconds > 0) {
    rh = (seconds/3600)|0;
    rm = (seconds - rh*3600)/60
    if (rh) {
      str += rh + ' hours ';
    }
    str += rm + ' minutes.'
    return str;
  }

  return '';
}

export default class PrayTimesView extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS == 'android' && !Constants.isDevice) {
      this.setState({
          errorMessage: 'Oops, this will not work in an emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }


  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status != 'granted') {
      this.setState({
        errorMessage: 'Permission to location was denied',
      })
    }
    let location = await Location.getCurrentPositionAsync({})
    this.setState({ location })
  };

  render() {
    let data = [ { name: 'Loading ...', key: 'loading' } ];

    if (this.state.errorMessage) {
    } else if (this.state.location) {
      let curtime = new Date()
      let times = PT.getTimes(curtime, [this.state.location.coords.latitude, this.state.location.coords.longitude]);
      data = Object.keys(timeNames).map(function(k,idx) { 
        return { icon: 'https://duas.mobi/img/salat/'+idx+'.png',  key: k, name: times[k], desc: relativeTime(times[k],curtime), arabic: timeNames[k].en }; 
      });
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
       />
      </View>
     );
  }

  _renderItem = ({ item }) => {
    return (
      <DuaListItem info={item} onPress={() => this._handlePress(item)}/>
    );
  }

  _handlePress = info => {
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 0,
    fontSize: 18,
    height: 44,
  }
});
