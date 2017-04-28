'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';
import api from '../Api/api';

let feed_items = [];
let total_feed_items = 1000;
let whichPage = 0;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Feed extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Feed',
      dataSource: ds
    };
  }

  componentWillMount() {
    this.getFeed();
  }

  getFeed() {
    // console.log('Running getFeed!')
    if (feed_items.length < 1000 ) {
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
            whichPage += 1;
            // console.log('feed_items at for loop 9: ',feed_items);
            this.setState({
              dataSource: ds.cloneWithRows(feed_items)
            });
          }
        });
      };
    } else {
      console.log('Already loaded 1000 items');
    }
  }

  render() {
      return (
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(data) => <View><Text style={styles.listItem}>{data}{"\n"}</Text></View>}
            onEndReachedThreshold= {10}
            onEndReached={ this.getFeed.bind(this) }
            >
          </ListView>
    );
  }

}

const styles = StyleSheet.create({
  listItem: {
    textAlign: 'center'
  }
});
