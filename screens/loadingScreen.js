import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';


class Loading extends React.Component {

  constructor(props) {
    super(props);
    console.log("Dashboard");
  }

  render() {
    return (
      <View>
        <Text>Hello_loading!!!</Text>
      </View>
    );
  }

}

export default Loading;
