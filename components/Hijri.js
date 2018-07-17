import React	from 'react';
import {getHijriDate} from '../data/Hijri';

import {
	Text
} from 'react-native';

export default class HijriDate extends React.Component {
	render() {
    const date = getHijriDate()
		return (
		  <Text > {
        date.day + " " + date.monthName + " " + date.year
		  } 
      </Text >
		);
	}
}
