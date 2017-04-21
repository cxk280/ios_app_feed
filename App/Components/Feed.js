'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
  Text,
  ListView,
  View,
  ScrollView,
  TouchableHightlight,
  AsyncStorage
} from 'react-native';
import api from '../Api/api';

let total_feed_items = 1000;

export default class Feed extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      title: 'Feed',
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      feedItems: {},
      loaded: false
    };
  },

  componentDidMount: function() {

    AsyncStorage.getItem('feed_items').then((feed_items_str) => {

      let feed_items = JSON.parse(feed_items_str);

      if(feed_items != null){

        AsyncStorage.getItem('time').then((time_str) => {
          let time = JSON.parse(time_str);
          let last_cache = time.last_cache;
          let current_datetime = moment();

          let diff_days = current_datetime.diff(last_cache, 'days');

          if(diff_days > 0){
            this.getFeed();
          }else{
            this.updateFeedItemsUI(let_items);
          }

        });


      }else{
        this.getFeed();
      }

    }).done();

  },

  updateFeedItemsUI: function(feed_items){

    if(feed_items.length == total_feed_items){

      let ds = this.state.dataSource.cloneWithRows(feed_items);
      this.setState({
        'feed': ds,
        'loaded': true
      });

    }

  },

  updateFeedItemDB: function(feed_items){

    if(feed_items.length == total_feed_items){
      AsyncStorage.setItem('feed_items', JSON.stringify(feed_items));
    }

  },

  getFeed: function() {

      let FEED_URL = 'https://api.addicaid.com/feeds';
      let feed_items = [];

    AsyncStorage.setItem('time', JSON.stringify({'last_cache': moment()}));

      api(FEED_URL).then(
        (top_items) => {
          for(let i = 0; i <= 10; i++){
            let item_url = "https://api.addicaid.com/feeds?page=" + i;
            api(item_url).then(
              (item) => {
                feed_items.push(item);
                // this.updateFeedItemsUI(feed_items);
                this.updateFeedItemDB(feed_items);
              }
            );
          }
        }
      );
  };

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }
}
