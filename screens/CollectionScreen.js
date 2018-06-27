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


  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.name}`,
    };
  };

  componentDidMount() {
    const key = this.props.navigation.getParam('key', "munajat");
    if (key) {
      console.log('runnign query for '+key);
      query = 'select * from toc where type = ?'
      DB.executeSql(query,[key]).then(data => {
        // transform for FlatListView, then call this.setState
        items = data.map(m => ({
          key: m.urlkey,
          name: m.enname,
          icon: 'https://duas.mobi/img/icon-' + key + '.png',
          arabic: m.arname,
          desc: m.endesc,
          screen: 'Detail',
        }))
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
