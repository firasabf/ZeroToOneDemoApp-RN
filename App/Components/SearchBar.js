import React from 'react';
import { Text, View,TextInput, TouchableOpacity } from 'react-native';

import styles from './Styles/SeachBarStyle';

const SearchBar = ({ onPress, onChangeText, children }) => {
	return (
        <View style={styles.headerView}>
        <TextInput
          onChangeText={onChangeText}
          placeholder="Search Youtube"
          style={styles.textInput}
          value={children}
          numberOfLines = {1} />
  
        <TouchableOpacity onPress={onPress} style={styles.searchButton}>
          <Text style={styles.searchButtonLabel}>Search</Text>
        </TouchableOpacity>
      </View>
		);
};


export default SearchBar;