import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Switch} from 'react-native';
import { ThemeContext } from '../utils/theme-context'
import { human  } from 'react-native-typography';

class Settings extends React.Component {

  static navigationOptions = ({ screenProps }) => {
    let currentTheme = screenProps.theme;

    return {
      title: 'Settings',
      headerShown: true,
      headerTintColor: currentTheme.textColor,
      headerStyle: {
        backgroundColor: currentTheme.headerColor
      },
    };
  };

  constructor(props) {
    super(props);
    console.log("Settings Screen");
    this.state = {
      switchValue: false
    }
  }

  toggleThemeSwitch = (value) => {
    this.setState({ switchValue: !value })
  }

  render() {
      
    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => {
          return (
            <View style={{width: '100%', height: '100%', backgroundColor: theme.background, padding: 10}}>
              <View style={{flexDirection: `row`, alignItems: "center"}}>
                <Text style={[human.body, {color: theme.textColor}]}> Change Theme: </Text>
                <Switch onValueChange={() => {this.toggleThemeSwitch(this.state.switchValue), toggleTheme()}} value={this.state.switchValue} thumbColor={this.state.switchValue?"white":"black"} trackColor={{false: "white", true:"black"}}></Switch>
              </View>
            </View>
        )}}
      </ThemeContext.Consumer>        
    );
  }

}

export default Settings;
