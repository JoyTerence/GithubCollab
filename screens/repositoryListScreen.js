import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Picker, ActivityIndicator} from 'react-native';
import { LayoutUtil } from '../utils/LayoutUtil';
import RepositoryTile from './repositoryTileScreen';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { ThemeContext } from '../utils/theme-context'

class RepositoryList extends Component<props> {

  static navigationOptions = ({ screenProps }) => {
    let currentTheme = screenProps.theme;

    return {
      title: 'Repositories',
      headerShown: true,
      headerTintColor: currentTheme.textColor,
      headerStyle: {
        backgroundColor: currentTheme.background
      },
    };
  };

  constructor(props) {
    super(props);
    this.callbackOnClick = (props.navigation!=null && props.navigation.getParam('fetch')!=null)? props.navigation.getParam('fetch'): props.fetch;
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 != r2;
      }),
      layoutProvider: LayoutUtil.getLayoutProvider(),
      data: [],
      count: 0,
      viewType: 0,
      endCursor: '',
      hasNextPage: false,
    };
    this.data;
    this.inProgressNetworkReq = false;
  }

  componentDidMount() {
    this.fetchMoredata();
  }

  async fetchMoredata() {
    console.log("FetchMoreData...")
    //console.log(this.callbackOnClick);
    //this.callbackOnClick();
    if (!this.inProgressNetworkReq) {
      //To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
      //more than once
      this.inProgressNetworkReq = true;

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
        });
      this.inProgressNetworkReq = false;
      console.log("endFetchMoreData");
    }
  }

  rowRenderer = (type, data) => {
    //We have only one view type so not checks are needed here
    console.log("Data rowrenderer: " + data.node.name, "Count: " + this.state.count);
    return <RepositoryTile data={data} />;
  };

  handleListEnd = () => {
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
    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          <View style={styles.container}>
            {this.state.count > 0
              ? <RecyclerListView
                  style={{ flex: 1, backgroundColor: theme.background }}
                  contentContainerStyle={{ margin: 3 }}
                  onEndReached={this.handleListEnd}
                  dataProvider={this.state.dataProvider}
                  layoutProvider={this.state.layoutProvider}
                  rowRenderer={this.rowRenderer}
                  renderFooter={this.renderFooter}
                />
              : null}
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

export default RepositoryList;
