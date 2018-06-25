import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DuaListView } from '../components/DuaList';
import { ExpoLinksView } from '@expo/samples';
import PrayTimesView from '../components/PrayTimes';

export default class PrayerScreen extends React.Component {
  static navigationOptions = {
    title: 'Prayer Times',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <PrayTimesView/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
