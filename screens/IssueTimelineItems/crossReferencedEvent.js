import React, {Component} from 'react';
import {Image, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../utils/theme-context';
import moment from 'moment';
import { Octicons } from '@expo/vector-icons';

class CrossReferencedEvent extends React.Component {

  constructor(props) {
    super(props);
    console.log("CrossReferencedEvent");
    this.issueAuthorDetails = props.data.actor
    this.issueReferencedAt = props.data.referencedAt
    this.issueTitle = props.data.source.title
    this.issueNumber = props.data.source.number
  }

  render() {
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <View style={{flex: 1, backgroundColor: theme.background}}>
                    <View style={{ margin: 10 }}>
                        <View style={{ height: "100%", flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <Octicons name="bookmark" size={20} color="blue"/>
                            </View>
                            <View style={{flex:10, flexDirection: 'column'}}>
                                <View style={{flex: 10, padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                                    <Image
                                        source = {this.issueAuthorDetails ? {uri: this.issueAuthorDetails.avatarUrl} : require("../../resources/images/avatar.png")}
                                        style = {{width: 20,height: 20}} /> 
                                    <View style={{justifyContent: 'center', padding: 1}}>
                                        <Text adjustsFontSizeToFit style={{padding: 2, color: theme.textColor, fontSize: 12}}><Text style={{fontSize: 15, fontWeight: 'bold'}}>{this.issueAuthorDetails ? this.issueAuthorDetails.login: "Ghost"}</Text> mentioned this issue on {moment(this.issueReferencedAt).format("MMM D, YYYY")}</Text>
                                    </View>
                                </View>
                                <Text adjustsFontSizeToFit numberOfLines={1} style={{color: theme.textColor, fontSize: 15, fontWeight: 'bold', marginLeft: 30}}>{this.issueTitle} <Text style={{fontSize: 12, color: "grey"}}>#{this.issueNumber}</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ThemeContext.Consumer>
    );
  }

}

export default CrossReferencedEvent;
