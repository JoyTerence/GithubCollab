import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { ThemeContext } from '../utils/theme-context';

class CustomSearchBar extends Component {
  constructor(props) {
    super(props);
    this.placeholder = props.placeholder
    this.arrayholder = props.items
    this.totalitemlength = props.items.length

    this.state = {
      loading: false,
      data: props.items,
      selected: false,
      focus: false,
      error: null,
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginLeft: '0.01%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    }, () => {console.log(this.state.data)});
  };

  _onItemPress = (item) => {
    this.setState({
        value: item,
        selected: true
    })
    this.props.onSelectItem(item)
  }

  onClear = () => {
    this.setState({
        value: "",
        selected: true
    })
    this.props.onSelectItem("")
  }

  onFocus = () => {
    this.setState({
      selected: false,
      focus: true
    })
  }

  onSubmit = () => {
    this.setState({
      selected: false,
      focus: true
    })
    if (this.state.value != undefined && this.arrayholder.map( a => {return a.toUpperCase()} ).includes(this.state.value.toUpperCase())) {
      this.props.onSelectItem(this.state.value)
    }
  }

  renderHeader = (theme) => {
    let isLightTheme = theme.background !== "#121212"
    console.log(theme.textColor)
    return (
      <SearchBar
        placeholder={this.placeholder}
        lightTheme={isLightTheme}
        round
        onChangeText={text => this.searchFilterFunction(text)}
        onClear={ () => this.onClear() }
        onFocus={ () => this.onFocus() }
        autoCorrect={false}
        onSubmitEditing={ () => this.onSubmit() }
        value={this.state.value}
      />
    );
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => ( 
          <View style={{ width:`50%` }}>
            {this.renderHeader(theme)}
            {!this.state.selected && this.state.focus && 
            <FlatList
              key = {Math.random()}
              data={this.state.data}
              renderItem={({ item }) => (
                <ListItem
                    key = {Math.random()}
                    title={<Text numberOfLines={1} style={{color: theme.textColor}}>{item}</Text>}
                    onPress={() => this._onItemPress(item)}
                    containerStyle = {{ height: 2, margin: 2, borderRadius: 15, backgroundColor: theme.repoListBackGround}}
                    contentContainerStyle = {{ alignItems: `center`, justifyContent: `center`}}
                />
              )}
            />}
          </View>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default CustomSearchBar;