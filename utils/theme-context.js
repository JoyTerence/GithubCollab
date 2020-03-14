import React  from 'react';

export const themes = {
    light: {
      foreground: '#000',
      background: '#eee',  // If you want to change, change the conditions in searchbarScreen.js and mainScreen.js as well
      textColor: 'black',
      calendarBackgroundColor: 'lightgrey',
      headerColor: '#eee',
      repoListBackGround: '#fff',
      repoUserIconColor: 'green',
      repoStarIconColor: 'red',
      repoClockIconColor: 'orange',
      repoOwnerTextColor: '#725ea5',
      lineColor: "#000",
      iconColor: "#000",
      badgeColor: 'lightblue'
    },
    dark: {
      foreground: '#fff',
      background: '#121212', // If you want to change, change the conditions in searchbarScreen.js and mainScreen.js as well
      textColor: 'white',
      calendarBackgroundColor: 'lightgrey',
      headerColor: '#1d1d1d',
      repoListBackGround: '#1d1d1d',
      repoUserIconColor: 'green',
      repoStarIconColor: 'yellow',
      repoClockIconColor: 'orange',
      repoOwnerTextColor: '#725ea5',
      lineColor: "#fff",
      iconColor: "#fff",
      badgeColor: 'red'
    },
  };
  
  export const ThemeContext = React.createContext(
    themes.dark // default value
  );