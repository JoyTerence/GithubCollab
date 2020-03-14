import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import { ThemeContext } from '../utils/theme-context';
import moment from 'moment';
import { HRL } from '../utils/HorizontalLine';
import { Octicons } from '@expo/vector-icons';

class IssueTileScreen extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    onIssueClicked = () => {
        console.log("++++++")
        console.log(this.props.data)
        this.props.navigation.navigate('Issue', {repoOwner: this.props.data.repository.owner.login, 
                                                repoName: this.props.data.repository.name,
                                                number: this.props.data.number,
                                                author: this.props.data.author,
                                                createdAt: this.props.data.createdAt,
                                                issueComment: this.props.data.bodyText,
                                                issueCommentInMarkdown: this.props.data.body})
    }

    render() {
        console.log(this.props)
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <View style={[{flex: 1, flexDirection: 'column', backgroundColor: theme.repoListBackGround}, styles.issueContainer]}>
                        <TouchableOpacity onPress={() => this.onIssueClicked()}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 10}}>
                                    <View style={{marginBottom: 5}}>
                                        <Text adjustsFontSizeToFit numberOfLines={1} style={{fontSize: 20, color: theme.repoOwnerTextColor}}>{this.props.data.title}</Text>
                                    </View>
                                    < HRL width={"100%"}/>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <Text style={{fontSize: 10, color: "grey"}}>#{this.props.data.number}</Text>
                                        <Text style={{fontSize: 10, color: "grey"}}> opened {moment(this.props.data.createdAt).fromNow()}</Text>
                                        <Text style={{fontSize: 10, color: "grey"}}> by {this.props.data.author? this.props.data.author.login : "ghost"}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                    <Octicons name="comment-discussion" size={25} color={theme.repoStarIconColor}/>
                                    <Text style={{fontSize: 10, color: "grey"}}>{this.props.data.comments.totalCount}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </ThemeContext.Consumer>
        );
    }
}


const styles = StyleSheet.create({
    issueContainer: {
      margin: 15,
      padding: 5,
      borderRadius: 10,
      justifyContent: 'center'
    },
})

export default IssueTileScreen;
