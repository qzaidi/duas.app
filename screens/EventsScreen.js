import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DuaListView } from '../components/DuaList';
import { ExpoLinksView } from '@expo/samples';
import DB from '../data/DB';
import { withNavigation } from 'react-navigation';
import { getHijriDate,getGregorianDate,getHijriMonth } from '../data/Hijri';

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


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

  sortEvents(hdate,rows) {
   var i;
   for(i = 0; i < rows.length; i++) {
      row = rows[i];
      if (row.hijrimonth >= hdate.month) {
         break;
      }
   }
   return rows.slice(i).concat(rows.slice(0,i))  
  }

  componentDidMount() {
    query = 'select urlkey,name,hijridate, hijrimonth,image from events order by hijrimonth,hijridate'
    DB.executeSql(query).then(data => {
      const hdate = getHijriDate()
      items = this.sortEvents(hdate,data);
      items = items.map(m => ({
          key: m.urlkey,
          name: m.name,
          arabic: m.hijridate + getHijriMonth(m.hijrimonth),
          icon: 'https://duas.mobi/cache/64x64/' + m.image,
          desc: formatDate(getGregorianDate({day: m.hijridate, month: m.hijrimonth-1, year: m.hijrimonth>=hdate.month?hdate.year:hdate.year+1})),

      }))
      this.setState({items})
    }, (err) => console.log('executeSql err ', err) )
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
