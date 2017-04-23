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
// import Button from 'react-native-button';
// import GiftedSpinner from 'react-native-gifted-spinner';
// import moment from 'moment';
import api from '../Api/api';

let feed_items = [];
let total_feed_items = 1000;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Feed',
      dataSource: ds.cloneWithRows(feed_items),
      loaded: false
    };
  }


  render() {
      return (
        <ListView dataSource={this.state.dataSource} renderRow={(data) => <View><Text>{data}</Text></View>}></ListView>
    );
  }


  componentWillMount() {

    for(let i = 0; i < 10; i++){
      let item_url = "https://api.addicaid.com/feeds?page=1";
      api(item_url).then(
        (item) => {
          console.log('item[0]._id: ',item[0]._id);
          feed_items.push(item[0]._id);
        }
      ).then(() => {
        if (i === 9) {
          console.log('feed_items at for loop 9: ',feed_items);
          this.setState({dataSource: ds.cloneWithRows(feed_items)});
        }
      });
    };
    console.log('feed_items after for loop: ',feed_items);
  };

}
