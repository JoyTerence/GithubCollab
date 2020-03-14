import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Dimensions, TouchableOpacity} from 'react-native';
import { WebView } from "react-native-webview";
import { robotoWeights, material  } from 'react-native-typography';
import { Octicons, Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { HRL } from '../utils/HorizontalLine';
import { ThemeContext } from '../utils/theme-context';
import moment from 'moment';
import { withNavigation } from 'react-navigation';
import Firebasestore from "../FirebaseProvider";

console.ignoredYellowBox = [
  'Setting a timer'
  ];

class RepositoryTile extends Component<props> {

  constructor(props) {
    super(props);
    this.state = {
      addToList: false
    }
  }

  componentDidMount() {
    Firebasestore
      .checkIfTriageRepo(this.props.data.node.id)
      .then((res) => {
        console.log("Document " + this.props.data.node.id + " exists -> " + res)
        this.setState({
          addToList: res
        })
      })
  }

  _onAddToListClick = () => {
    this.setState({
      addToList: !this.state.addToList
    }, () => {
      if (this.state.addToList) {
        Firebasestore.addRepo(this.props.data)
      }
      else {
        Firebasestore.removeRepo(this.props.data.node.id)
      }
    })
  }

  _navigateToRepoScreen = (data) => {
    this.props.navigation.navigate('RepositoryDetails', {data: data, initialTriageState: this.state.addToList, onTriageClick: this._onAddToListClick})
  }

  render() {

    this.color = this.state.addToList? "grey": "black";

    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          <TouchableOpacity style={{height: '100%'}} onPress={() => this._navigateToRepoScreen(this.props.data.node)}> 
            <View style={[{backgroundColor: theme.repoListBackGround, borderRadius: 10}, styles.repoCard]}>
              <View style={styles.repoTileHeader}>
                <View style={{flex:10, margin: 8}}>
                  <Text numberOfLines={1} adjustsFontSizeToFit={true} style={[material.title, robotoWeights.bold, { color: "lightgrey" }]}>{ this.props.data.node.name}</Text>
                </View>
                <View style={{flex:2, flexDirection: 'row', justifyContent: "flex-end", alignItems: "center", margin:10}}>
                  <Octicons name="issue-opened" style={{margin:5}} size={20} color="#f95c40"/>
                  <Text adjustsFontSizeToFit={true} style={[robotoWeights.bold, {color: theme.repoOwnerTextColor}]}>{ (this.props.data.node.issues)? this.props.data.node.issues.totalCount: "NA" }</Text>
                </View>
              </View>
              < HRL />
              <View style={{flex: 4, padding: 6, overflow: 'hidden'}}>
                <WebView
                  source={{ html: `<div  style='text-align: justify; line-height: 1.4; font-size: 2.5em; color: ${theme.repoOwnerTextColor}'> ${(this.props.data.node.description)? this.props.data.node.description: "NA"} </div>` }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator ={false}
                  style={{backgroundColor: theme.repoListBackGround}}
                />
              </View> 
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text numberOfLines={1} style={[{flex:8, marginLeft: 5, justifyContent:'flex-start', color: theme.repoOwnerTextColor}, robotoWeights.regular]}> {(this.props.data.node.nameWithOwner)?this.props.data.node.nameWithOwner: "NA"}</Text>
                <View style={{marginRight: 5}}><Text adjustsFontSizeToFit={true} numberOfLines={1} style={[{flex:4, justifyContent: 'flex-end', color: theme.repoOwnerTextColor}, robotoWeights.bold]}> {(this.props.data.node.primaryLanguage == null)? "": this.props.data.node.primaryLanguage.name}</Text></View>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, margin: 5, flexDirection: 'row', verticalAlign:'center', alignItems:'center', justifyContent: 'flex-start'}}>
                  <Entypo name="star" size={10} color={theme.repoStarIconColor}/>
                  <Text style={{margin:2, fontSize: 10, color: theme.repoOwnerTextColor}}> {(this.props.data.node.stargazers)? this.props.data.node.stargazers.totalCount: "NA"} </Text>
                  <MaterialIcons name="people" size={12} color={theme.repoUserIconColor}/>
                  <Text style={{margin:2, fontSize: 10, color: theme.repoOwnerTextColor}}> {(this.props.data.node.mentionableUsers)? this.props.data.node.mentionableUsers.totalCount: "NA"} </Text>
                  <FontAwesome name="clock-o" size={10} color={theme.repoClockIconColor}/>
                  <Text style={{margin:2, fontSize: 10, color: theme.repoOwnerTextColor}}> {(this.props.data.node.pushedAt)? moment(this.props.data.node.pushedAt).fromNow(): "NA"} </Text>
                </View>
                <View style={{padding: 5}}>
                <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={()=>this._onAddToListClick()}>
                  <Entypo name="add-to-list" size={20} color={this.color}/>
                </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  repoCard: {
    flex: 1, 
    margin: 3,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 0,
  },
  repoTileHeader: {
    flex: 2,
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default withNavigation(RepositoryTile);
