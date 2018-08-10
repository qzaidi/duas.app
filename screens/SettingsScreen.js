import React from 'react';
import { View,Text,SectionList,StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements'


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    value: 0.5,
  };

   _renderItem = ({ item }) => {
    if (item.type === 'slider') {
      return (
        <SectionContent>
          <Text>{item.title}</Text>
          <Slider
            value={item.value}
            onValueChange={(value) => this.setState({value})} />
          <Text>{this.state.value} px</Text>
        </SectionContent>
      );
    } else {
      return (
        <SectionContent>
          <Text>
            {item.value}
          </Text>
        </SectionContent>
      );
    }
  };

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
  };

  render() {

    const sections = [
     { title: 'Fonts', data: [ {value: 0.5, type:'slider', title: 'Arabic' } ]}
    ];

     return (
      <SectionList
        style={styles.container}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => index}
        sections={sections}
      />
    );


    /*
    return  (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <Text>Arabic Font Size</Text>
        <Slider
        value={this.state.value}
          onValueChange={(value) => this.setState({value})} />
        <Text>{this.state.value} px</Text>
      </View>
    )
    */
  }
}

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
      <Text style={styles.sectionHeaderText}>
        {title}
      </Text>
    </View>
  );
};

const SectionContent = props => {
  return (
    <View style={styles.sectionContentContainer}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
});
