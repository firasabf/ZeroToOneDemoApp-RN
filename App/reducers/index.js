import { combineReducers } from 'redux';
import Authreducer from './AuthReducer';
import searchReducer from './SearchReducer';


export const appReducers = combineReducers({
	auth: Authreducer,
	search: require('./SearchReducer').reducer,
});



export default () => {
  
	//let { store, sagasManager, sagaMiddleware } = configureStore(appReducers, rootSaga)
	let nextRootReducer
  
	if (module.hot) {
	  module.hot.accept(() => {
		nextRootReducer = require('./').appReducers
		//store.replaceReducer(nextRootReducer)
  
		const newYieldedSagas = require('../Sagas').default
		sagasManager.cancel()
		sagasManager.done.then(() => {
		  sagasManager = sagaMiddleware(newYieldedSagas)
		})
	  })
	}
  
	return nextRootReducer
  }