// List view with the feeds. Show the stuff that is in the feed. Ensure loading and scrolling goes to 100 pages, each with 10 feeds. 1000 feeds total.

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import Feed from './App/Components/Feed';
import WebPage from './App/Components/WebPage';

const ROUTES = {
  feed_items: Feed,
  web_page: WebPage
}

export default class AppFeed extends Component {

  renderScene(route, navigator) {

    let Component = ROUTES[route.name];
    return (
        <Component route={route} navigator={navigator} url={route.url} />
    );
  }


  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'feed_items', url: ''}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('AppFeed', () => AppFeed);
