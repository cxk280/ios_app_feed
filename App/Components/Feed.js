'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  ScrollView,
  TouchableHightlight,
  AsyncStorage
} from 'react-native';
import Button from 'react-native-button';
import GiftedSpinner from 'react-native-gifted-spinner';
import moment from 'moment';
import api from '../Api/api';

let total_feed_items = 1000;

export default class Feed extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      title: 'Feed',
      dataSource: ds.cloneWithRows(['']),
      feedItems: {},
      loaded: false
    };
  }


  render() {
      return (
        <ListView dataSource={this.state.dataSource} renderRow={(rowData) => <Text>{rowData}</Text>}></ListView>
    );
  }

  getFeed() {

    console.log('getFeed running');

    let feed_items = [];

    AsyncStorage.setItem('time', JSON.stringify({'last_cache': moment()}));

    for(let i = 0; i <= 10; i++){
      let item_url = "https://api.addicaid.com/feeds?page=" + i;
      api(item_url).then(
        (item) => {
          console.log('item: ',item);
          feed_items.push(item);
          updateFeedItemsUI(feed_items);
          updateFeedItemsDB(feed_items);
        }
      );
    }
  };



  viewPage(url){
    this.props.navigator.push({name: 'web_page', url: url});
  }

}
