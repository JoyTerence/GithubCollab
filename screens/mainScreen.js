import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import GitHub from '../GithubProvider';
import { SearchBar } from 'react-native-elements';
import { queryRepoByNameWithCursor } from '../utils/QueryUtils';
import {  MaterialIcons } from '@expo/vector-icons';
import { fetchTrends } from '../TrendingProvider';
import { ThemeContext } from '../utils/theme-context'

class Home extends Component<props> {

  static navigationOptions = ({ screenProps }) => {
    let currentTheme = screenProps.theme;

    return {
      title: 'Home',
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
      search: ""
    }
    this.endCursor = "";
  }

  _updateSearch = (searchItem) => {
    console.log("-> " + searchItem);
    this.setState( {search: searchItem});
  }

  _fetch = () => {
    return new Promise((resolve, reject) => {
      GitHub.query(queryRepoByNameWithCursor(this.state.search, this.endCursor))
       .then((res) => {
         this.data = res.data.search.edges;
         this.endCursor = res.data.search.pageInfo.endCursor;
         this.hasNextPage = res.data.search.pageInfo.hasNextPage;
         console.log("***************************************");
         resolve([this.data, this.endCursor, this.hasNextPage]);
      })
    })
  }

  _query = (searchItem) => {
    console.log("Main screen query");
    this.props.navigation.navigate('RepositoryList', {fetch: this._fetch});
  }

  scrape = () => {
    fetchTrends("java", "daily")
  }
  

  render() {
    
    return (
      <ThemeContext.Consumer>
        {({ theme }) => {
          
          let isLightTheme = theme.background !== "#121212"
          let searchIconBackgroundColor = isLightTheme ? "#e1e8ee": "#393e42"

          let backgroundColorStyle = {
            backgroundColor: searchIconBackgroundColor
          }

          return ( 
          <View style={{ display: `flex`, flexDirection: `row`}}>
            <SearchBar
              placeholder="Search Repository..."
              onChangeText={this._updateSearch}
              onSubmitEditing={this._query}
              lightTheme={isLightTheme}
              round
              value={this.state.search? this.state.search: ""} 
              containerStyle={{ flex: 10}}/>
            <View style={[styles.searchIconStyle, backgroundColorStyle ]}>
              <MaterialIcons name="check-box" iconStyle={{margin: 0}} size={52} color="lightblue" onPress={()=>this._query()} />
            </View>
          </View>
        )}}
      </ThemeContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  searchIconStyle: {
    flex: 2,
    alignItems: 'center',
  }
})  

export default Home;
