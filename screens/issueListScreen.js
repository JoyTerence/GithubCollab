import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import RecyclerList from './RecyclerList';
import GitHub from '../GithubProvider';
import { queryIssueStats } from '../utils/QueryUtils';
import * as SecureStore from 'expo-secure-store';

class IssueListScreen extends React.Component {

    static navigationOptions = ({ screenProps }) => {
      let currentTheme = screenProps.theme;
  
      return {
        title: 'Issues List',
        headerShown: true,
        headerTintColor: currentTheme.textColor,
        headerStyle: {
          backgroundColor: currentTheme.background
        },
      };
    };

    constructor(props) {
        super(props);
        console.log("IssueListScreen");
        this.endCursor = "";
        this.repoNamePromise = SecureStore.getItemAsync("RepoName")
        this.repoOwnerPromise = SecureStore.getItemAsync("RepoOwner")
    }


    fetch = () => {
      return new Promise((resolve, reject) => {
          Promise.all([this.repoNamePromise, this.repoOwnerPromise]).then(result => {
              this.repoName = result[0]
              this.repoOwner = result[1]
              GitHub.query(queryIssueStats(this.repoName, this.repoOwner, this.endCursor))
              .then((res) => {
                  this.data = res.data.repository.issues.nodes;
                  console.log(this.data)
                  this.endCursor = res.data.repository.issues.pageInfo.endCursor;
                  this.hasNextPage = res.data.repository.issues.pageInfo.hasNextPage;
                  console.log("***************************************");
                  resolve([this.data, this.endCursor, this.hasNextPage]);
              })
          })
      })
    }

    render() {
        return (
        <View style={{flex: 1}}>
            <RecyclerList render="issues" fetch={this.fetch} layout={0} navigation={this.props.navigation}/>
        </View>
        );
    }

}

export default IssueListScreen;
