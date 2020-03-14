import React, {Component} from 'react';
import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { ThemeContext } from '../utils/theme-context';
import { queryRestAPIContributors } from '../utils/QueryUtils';
import Github from '../GithubProvider';
import RecyclerList from './RecyclerList';

class ContributorsListScreen extends React.Component {

  static navigationOptions = ({ screenProps }) => {
    let currentTheme = screenProps.theme;

    return {
      title: 'Contributors',
      headerShown: true,
      headerTintColor: currentTheme.textColor,
      headerStyle: {
        backgroundColor: currentTheme.headerColor
      },
    };
  };

  constructor(props) {
    super(props);
  }

  fetch = () => {
    return new Promise((resolve, reject) => {
      let repoNamePromise = SecureStore.getItemAsync("RepoName")
      let repoOwnerPromise = SecureStore.getItemAsync("RepoOwner")
      Promise.all([repoNamePromise, repoOwnerPromise]).then(res => {
        this.repoName = res[0]
        this.repoOwner = res[1]
        Github.query_v3(queryRestAPIContributors(this.repoOwner, this.repoName))
        .then(res => {
          console.log(res)
          let data = res.length > 1 ? res.reverse() : res
          resolve([data, null, false])
        });
      })
    });
  }

  render() {
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <View style={{flex: 1}}>
                    <RecyclerList render="Contributors" fetch={this.fetch} layout={0} navigation={this.props.navigation}/>
                </View>
            )}
        </ThemeContext.Consumer>
    )
  }
}

export default ContributorsListScreen;
