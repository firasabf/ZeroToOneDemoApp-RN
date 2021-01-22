import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import createStore from './App/reducers'
// create our store
export const store = createStore()
import Router from './App/Navigation/Router';


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
      <Router />
      </Provider>
    );
  }
}
