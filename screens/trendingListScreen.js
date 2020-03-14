import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ActivityIndicator} from 'react-native';
import {fetchTrends} from '../TrendingProvider';
import RepositoryList from './repositoryListScreen';
import CustomSearchBar from './searchBarScreen';
import {languageList} from '../utils/LanguageList';
import {ThemeContext} from '../utils/theme-context';

class TrendingList extends Component<props> {

  static navigationOptions = ({ screenProps }) => {

    let currentTheme = screenProps.theme;

    return {
      title: 'Trending Repositories',
      headerShown: true,
      headerTintColor: currentTheme.textColor,
      headerStyle: {
        backgroundColor: currentTheme.headerColor
      },
    };
  };

  constructor(props) {
    super(props);
    console.log("Trending Page Entered");
    this.state = {
      language: "",
      frequency: "",
      data: [],
      loaded: false,
      key: Math.random()
    }
    this.data = [];
    this.languages = languageList
    this.frequency = ["daily", "weekly", "monthly"]
  }

  _fetch = () => {
    return new Promise((resolve, reject) => {
      resolve([this.state.data, null, false])
    });
  }

  displayTrends = () => {
    fetchTrends(this.state.language, this.state.frequency).then(res => {
      this.setState({
          data: this.state.data.concat(res),
          loaded: true,
          key: Math.random()
      })
    })
  }

  componentDidMount() {
    this.displayTrends()
  }

  componentWillUnmount() {
    this.setState({
      loaded: false
    })
  }

  handleLanguage = (langValue) => {
    console.log("Language is " + langValue)
    this.setState({
      language: langValue, 
      data: [],
      loaded: false,
    }, () => { this.displayTrends() })
  }

  handleFrequency = (freqValue) => {
    console.log("Frequency is " + freqValue)
    this.setState({
      frequency: freqValue,
      data: [],
      loaded: false,
    }, () => { this.displayTrends() })
  }

  renderView = (theme) => {
    console.log(this.state.loaded)
    let ActivityView = <ActivityIndicator style = {{margin: 10 }} size = "large" color = {ThemeContext.foreground} />
    let RepoView =  <RepositoryList fetch={this._fetch} key={this.state.key}/>
    return this.state.loaded ? RepoView : ActivityView
  }

  render() {

    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          <View style={{flex: 1, backgroundColor: theme.background}}>
            <View style={{flexDirection: `row`}}>
              <CustomSearchBar onSelectItem={this.handleLanguage} items={this.languages} placeholder="Select language"/>
              <CustomSearchBar onSelectItem={this.handleFrequency} items={this.frequency} placeholder="Select Date Range"/>
            </View>
            {this.renderView(theme)}
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }

}

export default TrendingList;
