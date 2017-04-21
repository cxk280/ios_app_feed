import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

import Button from 'react-native-button';
import GiftedSpinner from 'react-native-gifted-spinner';

import _ from 'lodash';

export default class WebPage extends Component {
  getInitialState() {
    return {
      isLoading: true
    };
  }

  render(){

    return (
      <Feed />
    );

  }

  truncate(str){
    return _.truncate(str, 20);
  }

  onNavigationStateChange(navState) {

    if(!navState.loading){
      this.setState({
        isLoading: false,
        pageTitle: navState.title
      });
    }
  }

  back(){
     this.props.navigator.pop();
  }
};


  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    webview_header: {
      paddingLeft: 10,
      backgroundColor: '#FF6600',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    header_item: {
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center'
    },
    webview_body: {
      flex: 9
    },
    button: {
      textAlign: 'left',
      color: '#FFF'
    },
    page_title: {
      color: '#FFF'
    },
    spinner: {
      alignItems: 'flex-end'
    }
  });
