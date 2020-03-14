import React, {Component} from 'react';
import {Image, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../utils/theme-context';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';

class AssignedEvent extends React.Component {

  constructor(props) {
    super(props);
    console.log("LabeledEvent");
    console.log(props)
    this.issueAuthorDetails = props.data.actor
    this.issueAssigneeName = props.data.assignee.login
    this.issueAssignedAt = props.data.createdAt
  }

  render() {
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <View style={{flex: 1, backgroundColor: theme.background}}>
                    <View style={{margin: 10}}>
                        <View style={{ height: "100%", flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <MaterialIcons name="assignment-ind" size={20} color={theme.repoUserIconColor}/>
                            </View>
                            <View style={{flex: 10, padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    source = {this.issueAuthorDetails ? {uri: this.issueAuthorDetails.avatarUrl} : require("../../resources/images/avatar.png")}
                                    style = {{width: 20,height: 20}} /> 
                                    <View style={{ justifyContent: 'center', padding: 1}}>
                                        <Text adjustsFontSizeToFit style={{padding: 2, color: theme.textColor, fontSize: 12}}><Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.issueAuthorDetails ? this.issueAuthorDetails.login: "Ghost"}</Text> assigned <Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.issueAssigneeName}</Text> on {moment(this.issueAssignedAt).format("MMM D, YYYY")}</Text>
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

export default AssignedEvent;
