import React, { Component } from 'react';
import { TextInput, View, Text, Alert, Button,FlatList, TouchableOpacity, StyleSheet, Platform, Image, SafeAreaView} from 'react-native';
import styles from './Styles/HomeScreenStyle';
import { connect } from 'react-redux';

import SearchReducer from '../reducers/SearchReducer'

import SearchBar from '../Components/SearchBar';

import YTSearch from 'youtube-api-search';


// api key must be saved in an .env file 
const API_KEY = 'AIzaSyCh2s8lPGE4xpjLdpWv_WvgYzAFn6OuXzY'


class HomeScreen extends Component {
static navigationOptions = {
   header: () => null
  };

constructor(props) {
    super(props);
    this.state = {
      youtubeVideos: [],
      searchBar: '',
    };
  }

  _searchBarOnChangeText = (value) => {
    this.setState({searchBar: value})
    console.log(this.props.states)
  }

  _startSearch = () => {
    let term = this.state.searchBar;
    console.log('term', term)
    this.props.attemptStartSearch(API_KEY, term)
    // YTSearch({ key: API_KEY, term}, videos => {
    //   //console.log(videos)
    // })
  }


render() {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      name: 'Video Name',
      description: 'Description Name',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      name: 'Video Name',
      description: 'Description Name',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      name: 'Video Name',
      description: 'Description Name',
    },
  ];

  const renderItem = ({ item }) => (
    <View>
    <Text>{item.title}</Text>
    </View>
  );
	return (
  <SafeAreaView style={{flex: 1}}>

    <SearchBar onPress={()=> this._startSearch()} 
    onChangeText={(value) => this._searchBarOnChangeText(value)}>
      {this.state.searchBar}
      </SearchBar>

    {(this.state.youtubeVideos.length == 0) ?
    <View style={styles.dataView}>
    <Text style={styles.emptyDataText}>No match Found</Text>
    </View>
    :
    <View style={styles.dataView}>
    <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
    }

    </SafeAreaView>
	);

}
}



const mapStateToProps = (state) => {
  return {

    fetching: state.search.fetching,
    states: state.search,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptStartSearch: (apiKey, term) => {return dispatch(SearchReducer.getSearchRequest(apiKey, term))},

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);