import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { LayoutUtil } from '../utils/LayoutUtil';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { ThemeContext } from '../utils/theme-context'
import IssueTileScreen from './IssueTileScreen';
import ContributorsTileScreen from './ContributorsTileScreen';
import IssueTimelineScreen from './IssueTimelineScreen';

class RecyclerList extends Component<props> {

  constructor(props) {
    super(props);
    this.renderItem = props.render
    this.layout = props.layout
    this.callbackOnClick = props.fetch;
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 != r2;
      }),
      layoutProvider: LayoutUtil.getLayoutProvider(this.layout),
      data: [],
      count: 0,
      viewType: 0,
      endCursor: '',
      hasNextPage: false,
      inProgressNetworkReq: false
    };
    this.data;
    this.repoName = "";
    this.repoOwner = "";
  }

  componentDidMount() {
      this.fetchMoredata();
  }

  async fetchMoredata() {
    console.log("FetchMoreData...")
    //console.log(this.callbackOnClick);
    //this.callbackOnClick();
    if (!this.state.inProgressNetworkReq) {
      //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
      //more than once
      this.setState ( { inProgressNetworkReq: true }, () => console.log("here"))

      this.callbackOnClick()
        .then((res) => {
          this.setState({
                 dataProvider: this.state.dataProvider.cloneWithRows(
                   this.state.data.concat(res[0])
                 ),
                 data: this.state.data.concat(res[0]),
                 count: this.state.count +  res[0].length,
                 endCursor: res[1],
                 hasNextPage: res[2],
               })
          this.setState({ inProgressNetworkReq: false})
        });
        
      console.log("endFetchMoreData");
    }
  }

  rowRenderer = (type, data) => {
    //We have only one view type so not checks are needed here
    if (this.renderItem == "issues") {
      return <IssueTileScreen data={data} navigation={this.props.navigation}/>;
    }
    else if (this.renderItem == "Contributors") {
      return <ContributorsTileScreen data={data} navigation={this.props.navigation}/>;
    }
    else if (this.renderItem == "issueTimeline") {
      return <IssueTimelineScreen data={data} navigaton={this.props.navigation} />;
    }
  };

  handleListEnd = () => {
    console.log("list ended")
    if (this.state.hasNextPage) {
      this.fetchMoredata();
    }
    //This is necessary to ensure that activity indicator inside footer gets rendered. This is required given the implementation I have done in this sample
    this.setState({});
  };

  renderFooter = (theme) => {
    //Second view makes sure we don't unnecessarily change height of the list on this event. That might cause indicator to remain invisible
    //The empty view can be removed once you've fetched all the data
    return (this.state.hasNextPage? 
              <ThemeContext.Consumer>
                {({ theme }) => ( 
                  <ActivityIndicator
                    style = {{margin: 10 }}
                    size = "large"
                    color = {theme.textColor}
                  />
                )}
              </ThemeContext.Consumer>
             : <View style = {{ height: 60 }} />);
  }

  render() {
    console.log(this.state.inProgressNetworkReq)
    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          <View style={[styles.container, {backgroundColor: theme.background}]}>
            {this.state.count > 0
              ? <RecyclerListView
                  style={{backgroundColor: theme.background, flex: 1}}
                  contentContainerStyle={{ margin: 3 }}
                  onEndReached={this.handleListEnd}
                  dataProvider={this.state.dataProvider}
                  layoutProvider={this.state.layoutProvider}
                  rowRenderer={this.rowRenderer}
                  renderFooter={this.renderFooter}
                  forceNonDeterministicRendering={this.renderItem == "issueTimeline"? true: false}
                />
              : this.state.inProgressNetworkReq ? 
                <ActivityIndicator
                  style = {{flex: 1, margin: 10}}
                  color = {theme.textColor}
                />
                :
                <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, color: theme.textColor}}> </Text>
                </View>
            }
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

export default RecyclerList;
