import React, {Component} from 'react';
import { ScrollView, Text, Image, View, Modal, TouchableHighlight } from 'react-native';
import { ThemeContext } from '../utils/theme-context';
import { queryIssuetimeline } from '../utils/QueryUtils';
import RecyclerList from './RecyclerList';
import GitHub from '../GithubProvider';
import moment from 'moment';
import { HRL } from '../utils/HorizontalLine';
import MarkdownWebView from 'react-native-github-markdown';
import { FontAwesome } from '@expo/vector-icons';

class Issue extends React.Component {

    static navigationOptions = ({ screenProps }) => {
        let currentTheme = screenProps.theme;
    
        return {
          title: 'Issue',
          headerShown: true,
          headerTintColor: currentTheme.textColor,
          headerStyle: {
            backgroundColor: currentTheme.headerColor
          }
        };
    };

    constructor(props) {
        super(props);
        this.issueNumber = props.navigation.getParam('number')
        this.repoOwner = props.navigation.getParam('repoOwner')
        this.repoName = props.navigation.getParam('repoName')
        this.endCursor = ""
        this.issueCreatedAt = props.navigation.getParam('createdAt')
        this.issueAuthorDetails = props.navigation.getParam('author')
        this.issueComment = props.navigation.getParam('issueComment')
        this.issueCommentInMarkdown = props.navigation.getParam('issueCommentInMarkdown')
        console.log(this.issueCreatedAt, " ", this.issueAuthorDetails, " ", this.issueComment)

        this.state = {
            modalVisible: false
        }
    }

    fetch = () => {
        return new Promise((resolve, reject) => {
            console.log(this.endCursor)
            GitHub.query(queryIssuetimeline(this.repoName, this.repoOwner, this.issueNumber, this.endCursor))
            .then((res) => {
                this.data = res.data.repository.issue.timelineItems.nodes;
                console.log(this.data)
                this.endCursor = res.data.repository.issue.timelineItems.pageInfo.endCursor;
                this.hasNextPage = res.data.repository.issue.timelineItems.pageInfo.hasNextPage;
                console.log("***************************************");
                resolve([this.data, this.endCursor, this.hasNextPage]);
            })
        })
      }

    render() {        
        return (
            <ThemeContext.Consumer>
                {({ theme }) => {
                    let isLightTheme = theme.background !== "#121212"
                    return ( 
                        <View style={{flex: 1, backgroundColor: theme.background}}>
                            <View style={{flex: 4}}>
                                <Modal
                                    animationType="slide"
                                    transparent={false}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                        this.setState({modalVisible: false})
                                    }}>
                                    <View style={{ flex:1 , backgroundColor: theme.background}}>
                                        <View style={{flex:11}}>
                                            <MarkdownWebView
                                                content={this.issueCommentInMarkdown}
                                                highlight
                                                darkMode={!isLightTheme} />
                                        </View>
                                        <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                                            <TouchableHighlight onPress={() => {this.setState({modalVisible: false})}}>
                                                <FontAwesome name="close" size={25} color={theme.foreground}/>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </Modal>
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, padding: 5}}>
                                        <Image
                                            source = {{uri: this.issueAuthorDetails.avatarUrl}} 
                                            style = {{width: "100%",height: "30%"}} />
                                    </View>
                                    <View style={{ overflow:"hidden", flex: 9, margin: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopRightRadius: 10, backgroundColor: theme.repoListBackGround }}>
                                        <View style={{padding: 5}}>
                                            <Text style={{padding: 8, color: theme.textColor, fontSize: 15}}><Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.issueAuthorDetails ? this.issueAuthorDetails.login: "Ghost"}</Text> commented {moment(this.issueCreatedAt).fromNow()}</Text>
                                            < HRL width={"100%"}/>
                                        </View>
                                        <TouchableHighlight onPress={() => {this.setState({modalVisible: true})}}>
                                            <View>
                                                <Text style={{padding: 8, color: theme.textColor}}>{this.issueComment}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                            <View style={{margin: 10}}>
                                < HRL width={"100%"}/>
                            </View>
                            <View style={{flex: 8}}>
                                <RecyclerList render="issueTimeline" fetch={this.fetch} layout={0} navigation={this.props.navigation}/>
                            </View>
                        </View>
                )}}
            </ThemeContext.Consumer>
        );
    }
}

export default Issue;
