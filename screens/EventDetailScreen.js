import React from 'react';
import { Dimensions,View,Text,StyleSheet } from 'react-native';
import { Tile } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Html from 'react-native-render-html';

@withNavigation
export default class EventDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.name}`,
    };
  };


  render() {
    const name = this.props.navigation.getParam('name');
    const desc = this.props.navigation.getParam('description');
    const grdate = this.props.navigation.getParam('desc');
    const image = 'https://duas.mobi' + this.props.navigation.getParam('image');
    const date = this.props.navigation.getParam('arabic');
    console.log(name,desc,image,date);
    return (
     <View>
      <Tile
          imageSrc={ {uri: image} }
          title={name}
          caption={date}
          featured
      >
      </Tile>
      <View style={styles.contentContainer}>
        <Html html={desc}
        />
        <Text>Its expected to fall on {grdate} this year.</Text>
      </View>
     </View>
   )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    margin: 5,
  },
  description: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
