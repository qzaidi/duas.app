import React, { Component } from 'react';
import Expo, { SQLite } from 'expo';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { RegularText, BoldText, ArabicText } from './StyledText';

const db = SQLite.openDatabase('duas.db');


export default class DuaListView extends Component {

  state = {
    items: [],
  }

  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(sql, params, 
          (_, { rows }) => resolve(rows._array), reject)
      },
      (err) => console.log('error in tx',err) , 
      () => console.log('tx completed'))
    )
  }

  componentDidMount() {
    // run the query here, and get the data
    this.executeSql('select * from praise limit 10', []).then(items => {
      console.log('resolved with ',items);
      this.setState({items});
    }, (err) => console.log('executeSql err ', err));
  }


  render() {

    console.log('rendering ...');
    var data = [];
    data.push(
      <View key={'vbasmala'} style={styles.row}>
        <ArabicText style={styles.arabic} key={'abasmala'}>بسم الله الرحمن الرحيم</ArabicText>
        <RegularText key={'e_basmala'}>In the name of Allah, Most Merciful and the Benevolent</RegularText>
     </View>
    )
 
    for (let i = 0; i < this.state.items.length; i++ ) {
      data.push(
        <View key={'v_' + i} style={styles.row}>
          <ArabicText style={styles.arabic} key={'a_'+i}>{this.state.items[i].arabic}</ArabicText>
          <RegularText key={'e_'+i}>{this.state.items[i].english}</RegularText>
        </View>
      )
    }

    return (
      <View style={styles.container}>
      { data }
      </View>
     );
  }

}

const styles = StyleSheet.create({
  row: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  arabic: {
    fontSize: 28,
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
