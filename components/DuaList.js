import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DuaListItem } from './DuaListItem'

export class DuaListView extends Component {

  state = {
      renderContents: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          {...this.props}
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
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
