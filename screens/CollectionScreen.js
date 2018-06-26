import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DuaListView } from '../components/DuaList';
import { ExpoLinksView } from '@expo/samples';
import DB from '../data/DB';
import { withNavigation } from 'react-navigation';


@withNavigation
export default class CollectionScreen extends React.Component {

  state = {
      items: [
        {
          key: 'loading',
          name: 'Loading',
          arabic: 'please wait ...',
        },
      ],
  };


  static navigationOptions = {
    title: 'Collection',
  };

  componentDidMount() {
    const query = this.props.navigation.getParam('query', 'select * from toc where type = "munajat"');
    if (query) {
      DB.executeSql(query).then(data => {
        // transform for FlatListView, then call this.setState
        items = data.map(m => ({
          key: m.urlkey,
          name: m.enname,
          icon: 'icon-munajat.png',
          arabic: m.arname,
          desc: m.endesc,
        }))
        console.log(items);
        this.setState({items})
      }, (err) => console.log('executeSql err ', err) )
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <DuaListView data={this.state.items}/>
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
