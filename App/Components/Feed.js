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
    this.state = {
      title: 'Feed',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      feedItems: {},
      loaded: false
    };
  }

  componentDidMount() {

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

  }

  updateFeedItemsUI(feed_items) {

    if(feed_items.length == total_feed_items){

      let ds = this.state.dataSource.cloneWithRows(feed_items);
      this.setState({
        'feed': ds,
        'loaded': true
      });

    }

  }

  updateFeedItemDB(feed_items) {

    if(feed_items.length == total_feed_items){
      AsyncStorage.setItem('feed_items', JSON.stringify(feed_items));
    }

  }

  getFeed() {

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
                this.updateFeedItemsUI(feed_items);
                this.updateFeedItemDB(feed_items);
              }
            );
          }
        }
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_item}>
            <Text style={styles.header_text}>{this.state.title}</Text>
          </View>
          <View style={styles.header_item}>
          {  !this.state.loaded &&
            <GiftedSpinner />
          }
          </View>
        </View>
        <View style={styles.body}>
        <ScrollView ref="scrollView">
        {
          this.state.loaded &&

          <ListView initialListSize={1} dataSource={this.state.feedItems} style={styles.feed_item} renderRow={this.renderFeed}></ListView>

        }
        </ScrollView>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: '#FF6600',
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  body: {
    flex: 9,
    backgroundColor: '#F6F6EF'
  },
  header_item: {
  paddingLeft: 10,
  paddingRight: 10,
  justifyContent: 'center'
  },
  header_text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  feed_item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5
  },
  feed_item_text: {
    color: '#575757',
    fontSize: 18
  }
});
