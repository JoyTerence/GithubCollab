import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image, TouchableOpacity, ScrollView} from 'react-native';
import GitHub from '../GithubProvider';
import { queryContributionCalendar } from '../utils/QueryUtils';
import { ThemeContext } from '../utils/theme-context'

export default class Contribution extends Component<props> {

  constructor(props) {
    super(props)
    this.state = {
      calendar: [],
      months: [],
    }
  }

  _getMonths = (theme) => {
    let monthsView = []
    this.state.months.forEach( (month, index) => {
      monthsView.push(<Text key={Math.random()} style={{fontSize: 12, color: theme.textColor}} >{month.name}</Text>)
    });
    return monthsView;
  }

  _createCalendar = (data) => {
    let calendar = []
    count = '0';
    for(let i=0; i < data.viewer.contributionsCollection.contributionCalendar.weeks.length; i++) {
      let WeekSquare = []
      for (let j=0; j < 7; j++) {
        key = count++;
        day = data.viewer.contributionsCollection.contributionCalendar.weeks[i].contributionDays[j];
        color = day? day.color: 'lightgrey';
        WeekSquare.push(<View key={key} style={{ height: 5, width: 5, margin: 1, backgroundColor: color}}></View>);
      }
      calendar.push(<View key={count+i} style={{flexDirection: "column", justifyContent: "space-between"}}>{WeekSquare}</View>);
    }
    this.setState({
      calendar: calendar,
    });
  }

  componentDidMount() {
    GitHub.query(queryContributionCalendar())
      .then((res) => {
        this.setState({
          months: res.data.viewer.contributionsCollection.contributionCalendar.months
        });
        this._createCalendar(res.data);
      });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          <View>
            <View style={{height: 100, flexDirection: "row", margin: 1, backgroundColor: "lightgrey", justifyContent: "center", alignItems: "center" }}>
              <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <Text></Text>
                <Text style={{fontSize: 10, color:theme.textColor}}>Mon</Text>
                <Text style={{fontSize: 10, color:theme.textColor}}>Wed</Text>
                <Text style={{fontSize: 10, color:theme.textColor}}>Fri</Text>
              </View>
              <View style={{flex: 12, flexDirection: "column", width: "100%"}}>
                <View style={{ flexDirection: "row", justifyContent:"space-between"}}>
                  {this._getMonths(theme)}
                </View>
                <View style={{flexDirection: "row", width: "100%"}}>
                  {this.state.calendar}
                </View>
              </View>
            </View>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}


const styles = StyleSheet.create({
  contributionBoxStyle: {
    flex: 1,
    borderColor: "green",
    margin: 1,
    backgroundColor: "red"
  }
});
