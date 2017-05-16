import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SearchPage from './components/SearchPage';
import Listing from './components/Listing';
import Property from './components/Property';

/*
 * Navigation configuration
 */
const Navigator = StackNavigator({
  SearchPage: {screen: SearchPage},
  Listing: {screen: Listing},
  Property: {screen: Property}
});

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
