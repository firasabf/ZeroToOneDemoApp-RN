import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  headerView: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    zIndex:1
  },

  textInput: {
    flex:3,
    fontSize: 20,
    margin: 10,
    padding: 10,
    borderColor: '#4ba6d0',
    borderWidth: 1,
    borderRadius: 4
},

searchButton: {
    flex:1,
    padding: 8,
    marginRight: 10,
    backgroundColor: '#4ba6d0',
    borderColor: '#4ba6d0',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
},

searchButtonLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
},



})

