import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../utils/theme-context';
import { WebView } from "react-native-webview";

class AboutMe extends React.Component {

    static navigationOptions = ({ screenProps }) => {
        let currentTheme = screenProps.theme;
    
        return {
            title: 'About',
            headerShown: true,
            headerTintColor: currentTheme.textColor,
            headerStyle: {
                backgroundColor: currentTheme.headerColor
            },
        };
    };

    constructor(props) {
        super(props);
    }

    render() {

        let aboutMeText = `This App was inspired by the CodeTriage Website. \n 
Implemented using React Native and rich Expo SDK, this app
aims to bring the open source community closer by enabling
individuals to track their favorite repositories and triage them
and get notified of their issues.
\n
If the users like to contribute do check out the repository at:
\n 
<Add repo link here>`


        return (
            <ThemeContext.Consumer>
                {({ theme }) => ( 
                    <View style={[{backgroundColor: theme.background}, styles.aboutMeContainer]}>
                        <View style={{height: '50%', width: '75%', overflow: 'hidden'}}>
                            <Text style={{textAlign: 'center', fontSize: 20, color: theme.foreground}}>{aboutMeText}</Text>
                        </View>
                    </View> 
                )}
            </ThemeContext.Consumer>
        );
    }

}

const styles = StyleSheet.create({
    aboutMeContainer: {
      flex: 2,
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })  

export default AboutMe;
