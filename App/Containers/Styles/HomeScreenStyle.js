import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    logoColor: {
		color: '#1e964a', 
		
		fontSize: 50,
		///fontWeight: 'bold',
		alignSelf: 'center',
		//paddingTop: 25,
	},
	logoColor2: {
		color: '#cfe6db',
		fontSize: 50,
		//fontWeight: 'bold',
		//paddingTop: 25,
	},
	logoAlign: {
		flexDirection: 'row',
		alignSelf: 'center',
		paddingTop: 25,
	},
	HowToUse: {
		paddingTop: 300,
		alignSelf: 'center',
		color: '#1e964a',

	},
	MainPage:{
		//backgroundColor: '#1e964a',
    flex: 1,
    paddingTop: 40
	},
	welcomeIntro: {
		color: '#1e964a',
		alignSelf: 'center',
		paddingTop: 80
	},
	learnMore: {
		color: '#1e964a',
		fontSize: 20,
		paddingTop: 20
	},
	MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  HeaderLogo: {
    width: 280,
    height: 140,
    alignSelf: 'center',
    //resizeMode: 'stretch',
  },








//   mainContainer: {
//     flex:1,
//   },
//   container: {
//     flex: 1,
//     marginTop: Metrics.navBarHeight,
//     backgroundColor: Colors.gold,
//     alignItems: 'center',
//     zIndex:1
//   },
//   newPatientView: {
//     margin:10
//   },
//   drawerView: {
//     backgroundColor: 'red',
//     flex:1
//   },
  headerView: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    zIndex:1
  },

  dataView: {
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center'
  },
  emptyDataText: {
	fontWeight: 'bold',
	fontSize: 20,
	color: '#909090',
  },
//   headerLogo: {
//     height:120,
//     width: 120,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin:30
//   },
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
    alignSelf: 'center'
  },
  searchButtonLabel: {
    fontWeight: 'bold',
	fontSize: 20,
    color: 'white',
    textAlign: 'center',
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
//   filterView: {
//     marginTop: 80,
//     marginHorizontal: 20,
//     backgroundColor: Colors.snow,
//     borderWidth: 2,
//     borderRadius: 5,
//     borderColor: Colors.raspberry,
//     padding: 10
//   },
//   filterButtonView: {
//     flexDirection: 'row',
//   },
//   filterButton: {
//     backgroundColor: Colors.share
//   },
//   filterButtonLabel: {
//     color: Colors.snow
//   }

})

