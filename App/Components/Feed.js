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
// import Dataset from 'impagination';
import api from '../Api/api';

let feed_items = [];
// let feed_name = [];
// let feed_text = [];
let total_feed_items = 1000;
let whichPage = 1;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Feed',
      dataSource: ds,
      loaded: false,
      // dataset: null,
      // datasetState: null
    };
  }

  // setupImpagination() {
  //   let dataset = new Dataset({
  //     pageSize: 10,
  //     observe: (datasetState) => {
  //       //Set this as the value to this.state.impaginationState
  //       this.setState({datasetState});
  //     },
  //     fetch(pageOffset, pageSize, stats) {
  //       return fetch(`https://api.addicaid.com/feeds?page=${pageOffset + 1}`)
  //         .then(response => response.json())
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   });

  //   dataset.setReadOffset(0);
  //   this.setState({dataset});
  // }

  componentWillMount() {
    // this.setupImpagination();
    this.getFeed();
  }

  render() {
      return (
        <ListView dataSource={this.state.dataSource} renderRow={(data) => <View><Text>{data}{"\n"}</Text></View>}></ListView>
    );
  }

  getFeed() {
    for(let i = 0; i < 10; i++){
      let item_url = "https://api.addicaid.com/feeds?page=" + whichPage;
      api(item_url).then(
        (item) => {
          feed_items.push('\n');
          feed_items.push('***');
          feed_items.push('\n');
          feed_items.push(item[i].user.username);
          feed_items.push('\n');
          if (item[i].text === '') {
            feed_items.push('No text');
          } else {
            feed_items.push(item[i].text);
          }
        }
      ).then(() => {
        if (i === 9) {
          console.log('feed_items at for loop 9: ',feed_items);
          this.setState({
            title: 'Feed',
            dataSource: ds.cloneWithRows(feed_items),
            loaded: true
          });
        }
      });
    };
  }

}
