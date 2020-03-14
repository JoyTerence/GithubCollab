import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import Firebasestore from '../FirebaseProvider';
import RepositoryList from './repositoryListScreen';
import {ThemeContext} from '../utils/theme-context';

class TriagingList extends Component<props> {

  static navigationOptions = ({ screenProps }) => {

    let currentTheme = screenProps.theme;

    return {
      title: 'Triaging Repositories',
      headerShown: true,
      headerTintColor: currentTheme.textColor,
      headerStyle: {
        backgroundColor: currentTheme.headerColor
      },
    };
  };

  constructor(props) {
    super(props);
    console.log("Home");
    this.state = {
      language: "Python",
      data: [],
      loaded: false,
    }
    this.data = [];
  }

  _fetch = () => {
    return new Promise((resolve, reject) => {
        resolve([this.state.data, null, false]);
    });
  }

  componentDidMount() {
    Firebasestore.getAllRepos().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          //Handle this better, really bad way and not neccessary
          data: this.state.data.concat(doc.data())
        });
      })
      console.log(this.state.data)
      this.setState({
        loaded: true
      })
    })
  }

  componentWillUnmount() {
    this.setState({
      loaded: false
    })
  }

  renderView = (theme) => {
    console.log(this.state.loaded)
    let ActivityView = <ActivityIndicator style = {{margin: 10 }} size = "large" color = {ThemeContext.foreground} />
    let RepoView =  <RepositoryList fetch={this._fetch}/>
    return this.state.loaded ? RepoView : ActivityView
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          <View style={{flex: 1, backgroundColor: theme.repoListBackGround}}>
              {this.renderView(theme)}
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }

}

export default TriagingList;
