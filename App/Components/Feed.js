'use strict';
import React, { Component } from 'react';
import {
  Text,
  ListView
} from 'react-native';
import api from '../Api/api';

let total_feed_items = 1000;

export default class Feed extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      title: 'Feed',
      dataSource: ds.cloneWithRows(['woo 1', 'woo 2']),
      feedItems: {},
      loaded: false
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }
}
