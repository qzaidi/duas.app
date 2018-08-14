import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { DuaListItem } from './DuaListItem'

import DB from '../data/DB';

@withNavigation
export default class AutocompleteSearch extends Component {
  renderDua(item) {
    return (
      <DuaListItem info={item} onPress={() => this._handlePress(item)}/>
    )
  }



  _handlePress = info => {
    console.log('pressed ',info);
    if (info.screen) {
      this.props.navigation.navigate(info.screen,info);
      // clear dropdowns etc
      this.setState({query: '', results: []});
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      query: ''
    };
  }

  search(query) {
    if (query === '') {
      return [];
    }

    let sql = 'select * from toc where urlkey like ?'
    DB.executeSql(sql,['%'+query+'%']).then(results => {
      this.setState({results});
    }, (err) => console.log('executeSql err ', err));

  }

  render() {
    const { query } = this.state;
    const duas = this.state.results.map(m =>  ({
      name: m.enname,
      key: m.urlkey,
      icon: 'https://duas.mobi/img/icon-' + m.type + '.png',
      arabic: m.arname,
      screen: 'Detail'
    })).slice(0,3);

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          inputContainerStyle={styles.inputContainerStyle}
          data={duas}
          defaultValue={query}
          onChangeText={text => this.search(text)}
          placeholder="Search for a dua or ziyarat"
          renderItem={(item) => (
            <TouchableOpacity onPress={() => this._handlePress(item)}>
              <Text style={styles.itemText}>
                {item.name} ({item.arabic})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {duas.length > 0 &&
            this.renderDua(duas[0])
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 8,
    paddingBottom: 0
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  inputContainerStyle: {
    borderWidth: 0,
    borderRadius: 0,
    margin: 0,
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});
