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
    console.log('running query ',query);
    DB.executeSql(sql,['%'+query+'%']).then(results => {
      this.setState({results});
    }, (err) => console.log('executeSql err ', err));


   return [{ icon: 'https://duas.mobi/img/icon-dua.png', 
                    name: 'Ziyarat Warisa', 
                    key: 'warisa',
                    arabic: 'أَلْحَمْدُ لل'  ,
                    screen: 'Detail'
    }];
  }

  render() {
    const { query } = this.state;
    const duas = this.state.results.map(m =>  ({
      name: m.enname,
      key: m.key,
      icon: 'https://duas.mobi/img/' + m.icon,
      arabic: m.arname,
      screen: 'Detail'
    }));

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={duas}
          defaultValue={query}
          onChangeText={text => this.search(text)}
          placeholder="Search for a dua or ziyarat"
          renderItem={({ name, arabic }) => (
            <TouchableOpacity onPress={() => this.setState({ query: name })}>
              <Text style={styles.itemText}>
                {name} ({arabic})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {duas.length > 0 ? (
            this.renderDua(duas[0])
          ) : (
            <Text style={styles.infoText}>
              Enter your dua/ziyarat name
            </Text>
          )}
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
    paddingBottom: 8
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
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
