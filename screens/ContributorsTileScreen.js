import React, {Component} from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { ThemeContext } from '../utils/theme-context';

class ContributorsTileScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log("Contribituors tile screen")
  }

  render() {

    const imageURL = this.props.data.author.avatar_url;
    console.log(imageURL)
    return (
        <ThemeContext.Consumer>
            {({ theme }) => (
                <View style={[{flex: 1, flexDirection: 'row', backgroundColor: theme.repoListBackGround}, styles.contributorContainer]}>
                    <Image
                        source = {{uri: imageURL}}
                        style = {{width: "10%",height: "60%"}} />
                    <View style={{padding: 10}}>
                        <Text style={{color: theme.textColor, fontSize: 20, fontWeight: 'bold'}}>{this.props.data.author.login}</Text>
                        <Text style={{color: "grey", fontSize: 10}}>{this.props.data.total}  commits</Text>
                    </View>
                </View>
            )}
        </ThemeContext.Consumer>
    );
  }

}

const styles = StyleSheet.create({
    contributorContainer: {
      margin: 10,
      padding: 5,
      borderRadius: 10,
      alignItems: 'center'
    },
})

export default ContributorsTileScreen;
