import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Image} from 'react-native';
import GitHub from '../GithubProvider';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';
import { ThemeContext } from '../utils/theme-context';
export default class DrawerContent extends Component<props> {

  constructor(props) {
    super(props);
    this.profilePic = this.props.navigation.state.params.profilePic;
    this.isUri = this.props.navigation.state.params.remote;
  }

  _logout() {
    GitHub.logout();
    this.props.navigation.navigate('LoginFlow');
  }

  _onProfileClick() {
    console.log("onProfileClick()");
    this.props.navigation.navigate('Profile', { isUri: this.isUri, pathToAvatar: this.profilePic, name: this.props.navigation.state.params.name});
  }

  _onTrendingClick() {
    console.log("onTrendingClick()");
    this.props.navigation.navigate('Trend');
  }

  _onTriagingClick() {
    console.log("onTriagingClick()");
    this.props.navigation.navigate('Triage');
  }

  _onSettingsClick() {
    console.log("onSettingsClick()");
    this.props.navigation.navigate('Setting')
  }

  _onAboutClick() {
    console.log("onAboutClick()");
    this.props.navigation.navigate('About');
  }

  renderLine = (theme) => {
    return (
      <View style={{borderBottomColor: theme.lineColor, ...styles.lineStyle}}/>
    )
  }

  render() {
    return (
      <ThemeContext.Consumer>
      {({ theme }) => ( 
        <View style={[ {backgroundColor: theme.background}, styles.base]}>
          <View style={ styles.profileContainer }>
            <Image
              source= {this.isUri? {uri:this.profilePic}: require("../resources/images/avatar.png")}
              style={styles.profileImage} />
            <Text numberOfLines={2} style={{fontSize: 20, margin: 25, color: theme.textColor}}> {this.props.navigation.state.params.name}</Text>
            { this.renderLine(theme) }
          </View>
          <View style={styles.dashboardOptionsContainer}>
            <View style={{flexDirection: 'row', verticalAlign:'center', alignItems:'center', justifyContent: 'space-between', width: '150%'}}>
              <MaterialIcons name="account-box" size={20} color="blue"/>
              <Text style={{color: theme.textColor}} onPress={()=>{this._onProfileClick();}}> Profile </Text>
            </View>
            { this.renderLine(theme) }
            <View style={{flexDirection: 'row', verticalAlign:'center', alignItems:'center', justifyContent: 'space-between', width: '150%'}}>
              <MaterialIcons name="trending-up" size={20} color="green"/>
              <Text style={{color: theme.textColor}} onPress={()=>{this._onTrendingClick();}}> Trending </Text>
            </View>
            { this.renderLine(theme) }
            <View style={{flexDirection: 'row', verticalAlign:'center', alignItems:'center', justifyContent: 'space-between', width: '150%'}}>
              <FontAwesome name="handshake-o" size={15} color="#e0ac69"/>
              <Text style={{color: theme.textColor}} onPress={()=>{this._onTriagingClick();}}> Triaging </Text>
            </View>
            { this.renderLine(theme) }
            <View style={{flexDirection: 'row', verticalAlign:'center', alignItems:'center', justifyContent: 'space-between', width: '150%'}}>
              <MaterialCommunityIcons name="settings-outline" size={20} color="red"/>
              <Text style={{color: theme.textColor}} onPress={()=>{this._onSettingsClick();}}> Settings </Text>
            </View>
            { this.renderLine(theme) }
            <View style={{flexDirection: 'row', verticalAlign:'center', alignItems:'center', justifyContent: 'space-between', width: '150%'}}>
              <FontAwesome name="info-circle" size={18} color="grey"/>
              <Text style={{color: theme.textColor}} onPress={()=>{this._onAboutClick();}}> About </Text>
            </View>
            { this.renderLine(theme) }
            <Button style={{color: theme.textColor}} onPress={()=>{this._logout();}} title="LogOut" />
          </View>
        </View>
      )}
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  profileContainer: {
    flex: 4,
    justifyContent: "space-between",
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 50,
  },
  dashboardOptionsContainer: {
     flex: 6,
     justifyContent: "space-between",
     padding: 90,
  },
  lineStyle: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
