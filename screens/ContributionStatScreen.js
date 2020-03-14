import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import Github from '../GithubProvider'
import { queryContributionStats } from '../utils/QueryUtils'
import { ThemeContext } from "../utils/theme-context";

class ContributionStat extends React.Component {

  constructor(props) {
    super(props);
    console.log("ContributionStat");
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    Github.query(queryContributionStats()).then(res => {
      let contributionStats = res.data.viewer.contributionsCollection;
      this.totalIssueContributions = contributionStats.totalIssueContributions
      this.totalCommitContributions = contributionStats.totalCommitContributions
      this.totalRepositoryContributions = contributionStats.totalRepositoryContributions
      this.totalPullRequestContributions = contributionStats.totalPullRequestContributions
      this.totalPullRequestReviewContributions = contributionStats.totalPullRequestReviewContributions
      this.totalRepositoriesWithContributedIssues = contributionStats.totalRepositoriesWithContributedIssues
      this.totalRepositoriesWithContributedCommits = contributionStats.totalRepositoriesWithContributedCommits
      this.totalRepositoriesWithContributedPullRequests = contributionStats.totalRepositoriesWithContributedPullRequests
      this.setState({ loading: false })
    })
  }

  render() {
    console.log(this.state.loading)
    console.log(this.totalIssueContributions)

    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <View style={{flex: 1, backgroundColor: theme.background}}>
            <Text style={{color: theme.textColor, textAlign: 'center', margin: 10, fontSize: 20, fontWeight: "bold"}}>Contribution Stats</Text>
            <ScrollView> 
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                  <Text style={{ color: theme.textColor, textAlign: 'center', margin: 10}}>Total Issues</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalIssueContributions}</Text>
                </View>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                  <Text style={{ color: theme.textColor, textAlign: 'center', margin: 10}}>Total Commits</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalCommitContributions}</Text>
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                <Text style={{ color: theme.textColor, textAlign: 'center', margin: 10 }}>Total Repositories</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalRepositoryContributions}</Text>
                </View>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                  <Text style={{ color: theme.textColor, textAlign: 'center', margin: 10 }}>Total Pull Requests</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalPullRequestContributions}</Text>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                  <Text style={{ color: theme.textColor, textAlign: 'center', margin: 10 }}>Total Pull Request reviews</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalPullRequestReviewContributions}</Text>
                </View>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                  <Text style={{ color: theme.textColor, textAlign: 'center', margin: 10 }}>Total Repos with Contributed Issues</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalRepositoriesWithContributedIssues}</Text>
                </View>
              </View>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                  <Text style={{ color: theme.textColor,textAlign: 'center', margin: 10 }}>Total Repos with Contributed Commits</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalRepositoriesWithContributedCommits}</Text>
                </View>
                <View style={[{backgroundColor: theme.repoListBackGround}, styles.contributionViewStyle]}>
                  <Text style={{ color: theme.textColor,textAlign: 'center', margin: 10 }}>Total Repos with Contributed Pull Requests</Text>
                  <Text style={{ color: theme.textColor}}>{this.totalRepositoriesWithContributedPullRequests}</Text>
                </View>
              </View>

             </ScrollView>
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}


const styles = StyleSheet.create({
  contributionViewStyle: {
    flex: 1,
    height: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  }
});

export default ContributionStat;
