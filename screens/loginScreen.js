import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import GitHub from '../GithubProvider';
import Firebasestore from '../FirebaseProvider';
import { Octicons } from '@expo/vector-icons';
import { ThemeContext } from '../utils/theme-context';

import { queryViewerNameAndURL } from '../utils/QueryUtils';
import Github from '../GithubProvider';

class LoginScreen extends Component<Props> {


  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount () {
    this.setState({
      isLoggedIn: Github.isLoggedInWithGithub()
    })
  }

  _login() {
    console.log("login()");
    GitHub.signInAsync()
     .then((res) => {
        if (res) {
          this._fetchBasicInfo();
          Firebasestore.connectFirebase()
        }
        this.setState({
          isLoggedIn: res
        });
      }); 
  }

  _fetchBasicInfo() {
    console.log("...fetching basic info...")
    GitHub.query(queryViewerNameAndURL())
      .then((res) => {
        var viewer = res.data.viewer;
        
    console.log(this.props)
        this.props.navigation.navigate('StackAppDrawer', { name: viewer.name,  profilePic: viewer.avatarUrl, remote: true});
      });
  }

  render() {

    if (this.state.isLoggedIn == true) {
      console.log("fetching basic info as already loggedin...")
      this._fetchBasicInfo();
    }
    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          !this.state.isLoggedIn && 
            <View style={{ backgroundColor: theme.background, ...styles.container}}>
              <Octicons.Button name="octoface" title="Login with Github" onPress={()=>{this._login();}}> Login With Github </Octicons.Button>
            </View>
         )}
      </ThemeContext.Consumer>
    );
  }

}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
});
