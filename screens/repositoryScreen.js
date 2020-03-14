import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ThemeContext } from "../utils/theme-context";
import { robotoWeights, material  } from 'react-native-typography';
import { HRL } from '../utils/HorizontalLine';
import { Entypo, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import MarkdownWebView from 'react-native-github-markdown';
import * as SecureStore from 'expo-secure-store';

class RepositoryDetailScreen extends Component<props> {

  static navigationOptions = ({ screenProps }) => {
    let currentTheme = screenProps.theme;

    return {
      title: 'Repository Details',
      headerShown: true,
      headerTintColor: currentTheme.textColor,
      headerStyle: {
        backgroundColor: currentTheme.headerColor
      },
    };
};

  constructor(props) {
    super(props);
    console.log(props.navigation)
    this.data = props.navigation.getParam('data');
    console.log(this.data)
    this.isAddedToList = props.navigation.getParam('initialTriageState');
    this.onTriageClick = props.navigation.getParam('onTriageClick');
    this.state = {
      addedToList: (this.isAddedToList !== null || this.isAddedToList !== undefined)? this.isAddedToList : false
    }
    
    SecureStore.setItemAsync("RepoName", this.data.name).catch(err => console.log(err))
    SecureStore.setItemAsync("RepoOwner", this.data.owner.login).catch(err => console.log(err))
  }

  _onAddToListClick = () => {
    this.setState({
      addedToList: !this.state.addedToList
    }, () => {
      this.onTriageClick()
    })
  }

  render() {

    const repoName = this.data.name;
    const description = this.data.description;
    const nameWithOwner = this.data.nameWithOwner;
    const primaryLanguage = this.data.primaryLanguage;
    const stargazers = this.data.stargazers;
    const mentionableUsers = this.data.mentionableUsers;
    const pushedAt = this.data.pushedAt;
    const color = "grey";

    const isReadmeContentPresent = (this.data.upCase != null || this.data.lowCase != null)
    const readmeContent = this.data.upCase != null ? this.data.upCase.text : this.data.upCase != null ? this.data.lowCase.text: ""

    return (
      <ThemeContext.Consumer>
        {({ theme }) => {
          let isLightTheme = theme.background !== "#121212"
          return ( 
            <View style={{flex: 1, backgroundColor: theme.background}}>
              <View style={[{backgroundColor: theme.repoListBackGround}, styles.rootContainer]}>
                <ScrollView>
                <View style={{ flex: 2, padding: 10}} >
                  <Text style={[{ color: theme.textColor}, styles.repoName]}>{repoName}</Text>
                </View>
                <HRL/>
                <View style={{ flex: 2, padding: 10}} >
                  <Text style={[{ color: theme.textColor}, styles.repoDesc]}>{description}</Text>
                </View>
                <View style={{ flex: 2, padding: 10, flexDirection: 'row'}}>
                  <Text numberOfLines={1} style={[{flex:8, marginLeft: 5, justifyContent:'flex-start', color: theme.repoOwnerTextColor}, robotoWeights.regular]}> {(nameWithOwner)?nameWithOwner: ""}</Text>
                  <View style={{marginRight: 5}}><Text adjustsFontSizeToFit={true} numberOfLines={1} style={[{flex:4, justifyContent: 'flex-end', color: theme.repoOwnerTextColor}, robotoWeights.bold]}> {(primaryLanguage == null)? "": primaryLanguage.name}</Text></View>
                </View>
                <View style={{ padding: 10 }}>
                  <View style={{marginTop: 20}}>
                    <View style={{flex: 10, flexDirection: 'row', verticalAlign:'center', alignItems:'center', justifyContent: 'flex-start'}}>
                      <Entypo name="star" size={16} color={theme.repoStarIconColor}/>
                      <Text style={{margin:2, fontSize: 10, color: theme.repoOwnerTextColor}}> {(stargazers)? stargazers.totalCount: "NA"} </Text>
                      <MaterialIcons name="people" size={20} color={theme.repoUserIconColor}/>
                      <Text style={{margin:2, fontSize: 10, color: theme.repoOwnerTextColor}}> {(mentionableUsers)? mentionableUsers.totalCount: "NA"} </Text>
                      <FontAwesome name="clock-o" size={15} color={theme.repoClockIconColor}/>
                      <Text style={{margin:2, fontSize: 10, color: theme.repoOwnerTextColor}}> {(pushedAt)? moment(pushedAt).fromNow(): "NA"} </Text>
                    </View>
                  </View>
                  <View style={{ marginTop: 20, marginBottom: 20, justifyContent: 'center'}}>
                    <TouchableOpacity style={{display:'flex', flexDirection: 'row'}} onPress={()=> this._onAddToListClick()}>
                      {this.state.addedToList ? <FontAwesome name="check-circle" size={25} color={color}/>: <Entypo name="circle-with-cross" size={25} color={color}/>}
                      <Text adjustsFontSizeToFit={true} style={[robotoWeights.medium, { color: theme.repoOwnerTextColor, paddingTop: 5, textAlign: 'center'}]}> Triaging </Text>
                    </TouchableOpacity >
                  </View>
                </View>
                <MarkdownWebView
                  style={{marginTop: 10}}
                  content={readmeContent}
                  highlight
                  darkMode={!isLightTheme}
                />
              </ScrollView>
              </View>
            </View>
          )}
        }
      </ThemeContext.Consumer>
    );
  }

}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'column',
    margin: 20,
    borderRadius: 10,
    flex: 2
  },
  repoAndDesc: {
    alignItems: 'center',
    width: '100%',
  },
  repoName: {
    fontSize: 40,
    textAlign: 'center',
    ...robotoWeights.medium,
  },
  repoDesc: {
    textAlign: 'center',
    fontSize: 20,
    ...robotoWeights.medium,
  }
});

export default RepositoryDetailScreen;
