import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import { ThemeContext } from '../../utils/theme-context';
import moment from 'moment';
import { HRL } from '../../utils/HorizontalLine';

class IssueCommentEvent extends React.Component {

  constructor(props) {
    super(props);
    console.log("IssueCommentEvent");
    this.issueAuthorDetails = props.data.author
    this.issueCreatedAt = props.data.createdAt
    this.issueComment = props.data.bodyText
    console.log(this.issueAuthorDetails)
  }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <View style={{flex: 1}}>
                        <View style={{backgroundColor: theme.background}}>
                            <View style={{ height: "100%", flexDirection: 'row'}}>
                                <View style={{flex: 1.5, margin: 2}}>
                                    <Image
                                        source = {this.issueAuthorDetails ? {uri: this.issueAuthorDetails.avatarUrl} : require("../../resources/images/avatar.png")}
                                        style = {{width: 50, height: 50}} /> 
                                </View>
                                <View style={{flex: 8, margin: 2, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10, backgroundColor: theme.repoListBackGround }}>
                                    <View style={{flex: 2}}>
                                        <Text adjustsFontSizeToFit style={{padding: 2, color: theme.textColor, fontSize: 12}}><Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.issueAuthorDetails ? this.issueAuthorDetails.login: "Ghost"}</Text> commented on {moment(this.issueCreatedAt).format("MMM D, YYYY")}</Text>
                                        < HRL width={"100%"}/>
                                    </View>
                                    <View style={{flex: 5}}>
                                        <Text style={{padding: 8, color: theme.textColor}}>{this.issueComment}</Text>
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

export default IssueCommentEvent;
