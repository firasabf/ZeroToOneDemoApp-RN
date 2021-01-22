import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */

import { SearchTypes } from '../reducers/SearchReducer';

/* ------------- Sagas ------------- */

import { getSearch } from './SearchSagas'


/* ------------- API ------------- */

// import { createStore, applyMiddleware } from 'redux';
// //import { combineReducers } from './index';
// import createSagaMiddleware from 'redux-saga';
// import "regenerator-runtime/runtime";

// //import searchReducer from './SearchReducer';

// const sagaMiddleware = createSagaMiddleware();

// function* exampleSaga() {
//     console.log("Example saga reached");
//   }

// export const store = createStore(getSearch, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(exampleSaga);

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

//const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
    console.log("root SAgag ran")
  yield all([

    takeLatest(SearchTypes.GET_SEARCH_REQUEST, getSearch),

  ])
}
