
import React, {Component}  from 'react';
import { View } from 'react-native';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator , DrawerNavigation, DrawerItems } from 'react-navigation-drawer';
import LoginScreen from './screens/loginScreen';
import DashBoard from './screens/dashboardScreen';
import Settings from './screens/settingsScreen';
import DrawerContent from './screens/drawerScreen';
import Profile from './screens/profileScreen';
import Home from  './screens/mainScreen';
import RepositoryList from './screens/repositoryListScreen';
import Repository from './screens/repositoryScreen';
import TriagingList from './screens/triagingListScreen'; 
import TrendingList from './screens/trendingListScreen';
import AboutMe from './screens/aboutMeScreen';
import {ThemeContext, themes} from './utils/theme-context';
import IssueListScreen from './screens/issueListScreen';
import ContributorsListScreen from './screens/ContributorsListScreen';
import Issue from './screens/Issue';
import { MaterialIcons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

const TabNavigator = createBottomTabNavigator({
  Repository: {
    screen: Repository,
    navigationOptions: {
      tabBarLabel: 'Repository',
      tabBarIcon:   ({focused, tintColor}) => (<MaterialIcons name="book" style={{margin:5}} size={focused?25:20} color={tintColor}/>)
    },
  },
  Issues: {
    screen: new createStackNavigator({ IssueListScreen, Issue }),
    navigationOptions: {
      tabBarLabel: 'Issues',
      tabBarIcon:   ({focused, tintColor}) => (<Octicons name="issue-opened" style={{margin:5}} size={focused?28:20} color={tintColor}/>)
    },
  },
  Contributors: {
    screen: new createStackNavigator({ ContributorsListScreen }),
    navigationOptions: {
      tabBarLabel: 'Contributors',
      tabBarIcon:   ({focused, tintColor}) => (<MaterialCommunityIcons name="human-male-male" style={{margin:5}} size={focused?25:20} color={tintColor}/>)
    },
  },
  },{
    tabBarOptions: {
      showLabel: false, // hide labels
      activeTintColor: '#F8F8F8', // active icon color
      inactiveTintColor: '#586589',  // inactive icon color
      style: {
          backgroundColor: '#171F33' // TabBar background
      }
  }
});

const AppStackNavigator = createStackNavigator(
  {
    MainScreen: Home,
    Dashboard: DashBoard,
    Repository: Repository,
    RepositoryList: RepositoryList,
    Profile: Profile,
    Triage: TriagingList,
    Trend: TrendingList,
    Setting: Settings,
    About: AboutMe,
    RepositoryDetails: TabNavigator,
  },
  {
    initialRouteName: 'MainScreen',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerShown: false,
        headerLeft: <ThemeContext.Consumer>
                      {({ theme }) => ( 
                      <MaterialIcons
                        name="menu"
                        size={30}
                        style={{paddingLeft: 10}}
                        color={theme.textColor}
                        onPress = {() => {navigation.openDrawer();}} 
                      /> )}
                      </ThemeContext.Consumer>,
        headerRight:  <ThemeContext.Consumer>
                        {({ theme }) => ( 
                        <MaterialIcons
                          name="search"
                          size={20}
                          color={theme.textColor}
                          style={{paddingRight: 10}}
                          onPress = {() => {navigation.navigate('MainScreen')}} />
                        )}
                      </ThemeContext.Consumer>
      };
    }
  }
)

const AppDrawerNavigator = createDrawerNavigator({
    Home: AppStackNavigator,
  }, {
    initialRouteName: 'Home',
    drawerPosition: 'Left',
    contentComponent:  DrawerContent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  },
);

const StackAppDrawerNavigator = createStackNavigator({
  StackAppDrawer: {
    screen: AppDrawerNavigator,
    navigationOptions: {header: null}
  }
});

const AppSwitchNavigator = createSwitchNavigator(
  {
    LoginFlow: {
      screen: createSwitchNavigator({
        Login: LoginScreen,
      }, {
        initialRouteName: 'Login',
      })
    },
    MainFlow: {
      screen: StackAppDrawerNavigator,
    }
  },
  {
    initialRouteName: 'LoginFlow',
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

type Props = {};
class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      theme: themes.dark,
    };
  }

  toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  };
  
  toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.dark ? themes.light : themes.dark,
    }));
   };

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <ThemeContext.Provider value={{theme: this.state.theme, toggleTheme: this.toggleTheme}}>
          <AppContainer screenProps={{ theme: this.state.theme }} />
        </ThemeContext.Provider>
      </View>
    );
  }
}

export default App;