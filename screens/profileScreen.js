import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, YellowBox, Image, TouchableOpacity} from 'react-native';
import GitHub from '../GithubProvider';
import { robotoWeights, material , human  } from 'react-native-typography';
import { FontAwesome, Entypo, Octicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { queryProfile } from '../utils/QueryUtils';
import RepositoryList from './repositoryListScreen';
import Contribution from './contributionScreen';
import ContributionStat from './ContributionStatScreen'
import { queryViewerRepo } from '../utils/QueryUtils';
import moment from 'moment';
import { ThemeContext } from '../utils/theme-context'
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class Profile extends Component<props> {

  static navigationOptions = ({ screenProps }) => {

    let currentTheme = screenProps.theme;

    return {
      title: 'Profile',
      headerShown: true,
      headerTintColor: currentTheme.textColor,
      headerStyle: {
        backgroundColor: currentTheme.headerColor
      },
    };
  };

  constructor(props) {
    super(props);
    this.CURRENT_SCREEN = {
      REPOSITORIES: 0,
      HISTORY: 1,
      CONTRIB: 2,
    }
    this.state = {
      name: this.props.navigation.state.params.name,
      path: this.props.navigation.state.params.pathToAvatar,
      location: "",
      followersCount: "",
      followingCount: "",
      createdAt: "",
      currentScreen: this.CURRENT_SCREEN.REPOSITORIES,
    }
  }

  componentDidMount() {
    GitHub.query(queryProfile())
      .then((res) => {
        var viewer = res.data.viewer;
        this.setState({
          location: viewer.location,
          followersCount: viewer.followers.totalCount,
          followingCount: viewer.following.totalCount,
          createdAt: viewer.createdAt,
          repositoryCount: viewer.repositories.totalCount,
        });
      })
      .catch((err) => {
        console.log("Err: " + err);
      });
  }

  _onClick = () => {
    return new Promise((resolve, reject) => {
        GitHub.query(queryViewerRepo(this.endCursor))
         .then((res) => {
           this.data = res.data.viewer.repositories.edges;
           this.endCursor = res.data.viewer.repositories.pageInfo.endCursor;
           this.hasNextPage = res.data.viewer.repositories.pageInfo.hasNextPage;
           resolve([this.data, this.endCursor, this.hasNextPage]);
        })
    })
  }

  _onTabOneClick = () => {
    console.log("***************************************");
    this.setState({
      currentScreen: this.CURRENT_SCREEN.REPOSITORIES,
    });
  }

  _onTabTwoClick = () => {
    console.log("***************************************");
    this.setState({
      currentScreen: this.CURRENT_SCREEN.HISTORY,
    });
  }

  async _onTabThreeClick ()  {
    console.log("***************************************");
    this.setState({
      currentScreen: this.CURRENT_SCREEN.CONTRIB,
    });
  }

  renderHorizontalLine = (theme) => {
    return (
      <View style={{borderBottomColor: theme.lineColor, ...styles.lineStyle}}/>
    )
  }

  renderVerticalLine = (theme) => {
    return (
      <View style={{borderRightColor: theme.lineColor, ...styles.verticalLineStyle}}/>
    )
  }

  render() {

    const isUri = this.props.navigation.state.params.isUri;

    var TabContentView = <RepositoryList fetch={this._onClick}/>

    if (this.state.currentScreen == this.CURRENT_SCREEN.HISTORY) {
      TabContentView = <Contribution/>
    }
    else if (this.state.currentScreen == this.CURRENT_SCREEN.CONTRIB) {
      TabContentView = <ContributionStat/>
    }

    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
        <View style={{flex: 1, backgroundColor: theme.background}}>
          <View style={styles.profileContainer}>
            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', height: '100%'}}>
              <Image
                source= {isUri? {uri: this.state.path}: require("../resources/images/avatar.png")}
                style={styles.profileImage} />
                <Text style={{ color: theme.textColor}}> {this.state.name}</Text>
            </View>
            <View style={{flex: 4, justifyContent: 'center', height: '100%'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                <Text style={[human.body, {color: theme.textColor}]}> Followers:</Text>
                <Text style={[human.body, {color: theme.textColor}]}> {this.state.followersCount} </Text>
                <View style={{borderLeftWidth: 1, borderLeftColor: theme.textColor }}/>
                <Text style={[human.body, {color: theme.textColor}]}> Following:</Text>
                <Text style={[human.body, {color: theme.textColor}]}> {this.state.followingCount}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 15, verticalAlign: 'middle'}}>
                <FontAwesome name="clock-o" size={18} color={theme.iconColor}/>
                <Text style={{ color: theme.textColor, fontSize: 14}}> {moment.utc(this.state.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 15}}>
                <Entypo name="location" size={18} color={theme.iconColor}/>
                <Text style={[human.body, {color: theme.textColor}]}> {this.state.location}</Text>
              </View>
            </View>
          </View>

          { this.renderHorizontalLine(theme) }

          <View style={styles.options}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingTop: 10}}>
              <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={()=>this._onTabOneClick()}>
                <Octicons style={{position: "absolute"}} name="repo" color="blueviolet" size={30}/>
                <Text style={[{ paddingLeft: 3, padding: 1, fontSize: 10, top: -15, bottom:0, left: 10, right: 0, color: theme.textColor, borderWidth: 1, borderRadius: 10, backgroundColor: theme.badgeColor}]}>
                  {this.state.repositoryCount}
                </Text>
              </TouchableOpacity>
            </View>

            { this.renderVerticalLine(theme) }

            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={()=>this._onTabTwoClick()}>
                <AntDesign name="calendar" size={30} color="blueviolet"/>
              </TouchableOpacity>
            </View>

            { this.renderVerticalLine(theme) }

            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity style={{justifyContent: "center", alignItems: "center"}} onPress={()=>this._onTabThreeClick()}>
                <MaterialCommunityIcons name="vector-square" color="blueviolet" size={30}/>
              </TouchableOpacity>
            </View>
            
          </View>
          { this.renderHorizontalLine(theme) }
          <View style={styles.content}>
            {TabContentView}
          </View>
        </View>
        )}
        </ThemeContext.Consumer>
    );
  }
}


const styles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 3,
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 7,
  },
  options: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lineStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  verticalLineStyle: {
    height: '75%',
    borderRightWidth: StyleSheet.hairlineWidth,
  }
});
