import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import DuaDetailView from '../components/DuaDetailView';
import { ExpoLinksView } from '@expo/samples';
import { withNavigation } from 'react-navigation';

@withNavigation
export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.name}`,
    };
  };


  render() {
    const key = this.props.navigation.getParam('key', "praise");

    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <DuaDetailView data={key}/>
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
