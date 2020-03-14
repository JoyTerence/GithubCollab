import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


class DashBoard extends React.Component {

  constructor(props) {
    super(props);
    console.log("Dashboard");
  }

  render() {
    return (
      <View>
        <Text>Hello!!!</Text>
      </View>
    );
  }

}

export default DashBoard;
