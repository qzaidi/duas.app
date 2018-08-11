import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DuaListView } from '../components/DuaList';
import { ExpoLinksView } from '@expo/samples';
import DB from '../data/DB';
import { withNavigation } from 'react-navigation';


@withNavigation
export default class CollectionMapScreen extends React.Component {

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
    const key = this.props.navigation.getParam('arabic'); //this actually has Fajr,Dhuhr etc
    console.log('runnign query for '+key);
    if (key) {
      query = 'select * from collection_map where collection = ?'
      DB.executeSql(query,[key]).then(data => {
        // transform for FlatListView, then call this.setState
        items = data.map(m => ({
          key: m.prayer,
          name: m.prayername,
          icon: 'https://duas.mobi/img/icon-' + m.type + '.png',
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
