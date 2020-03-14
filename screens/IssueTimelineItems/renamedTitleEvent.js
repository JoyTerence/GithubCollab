import React, {Component} from 'react';
import {Image, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../utils/theme-context';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class RenamedTitleEvent extends React.Component {

  constructor(props) {
    super(props);
    console.log("RenamedTitleEvent");
    this.issueAuthorDetails = props.data.actor
    this.issueRenamedAt = props.data.createdAt
    this.issuePreviousTitle = props.data.previousTitle
    this.issueCurrentTitle = props.data.currentTitle
  }

  render() {
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <View style={{flex: 1, backgroundColor: theme.background}}>
                    <View style={{ margin: 10}}>
                        <View style={{ height: "100%", flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <MaterialCommunityIcons name="rename-box" size={20} color="#444d56"/>
                            </View>
                            <View style={{flex: 10, padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    source = {this.issueAuthorDetails ? {uri: this.issueAuthorDetails.avatarUrl} : require("../../resources/images/avatar.png")} 
                                    style = {{width: 20, height: 20}} /> 
                                    <View style={{justifyContent: 'center', padding: 1}}>
                                        <Text adjustsFontSizeToFit style={{padding: 2, color: theme.textColor, fontSize: 12}}><Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.issueAuthorDetails ? this.issueAuthorDetails.login: "Ghost"}</Text> changed the title <Text style={{fontSize: 12, fontWeight: 'bold', textDecorationLine: 'line-through'}}>{this.issuePreviousTitle}</Text> <Text style={{fontSize: 12, fontWeight: 'bold'}}>{this.issueCurrentTitle}</Text> on {moment(this.issueRenamedAt).format("MMM D, YYYY")}</Text>
                                    </View>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ThemeContext.Consumer>
    );
  }

}

export default RenamedTitleEvent;
