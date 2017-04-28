import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';

import Feed from './App/Components/Feed';

export default class AppFeed extends Component {



  render() {
    return (
      <Feed />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('AppFeed', () => AppFeed);
