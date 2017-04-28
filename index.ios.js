// List view with the feeds. Show the stuff that is in the feed. Ensure loading and scrolling goes to 100 pages, each with 10 feeds. 1000 feeds total.

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
