import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import { ThemeContext } from './theme-context'

export class HRL extends Component<props> {

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => ( 
                    <View style = {{ alignContent: "center", alignItems: "center"}}>
                        <View
                            style={{
                                alignItems: "center",
                                borderBottomWidth: 1,
                                borderBottomColor: theme.textColor,
                                width: this.props!=={}? this.props.width: "95%",
                            }}
                        />
                    </View>
                )}
            </ThemeContext.Consumer>
        )
    }

}
