import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from './index';
import createSagaMiddleware from 'redux-saga';
import "regenerator-runtime/runtime";

import searchReducer from './SearchReducer';

const sagaMiddleware = createSagaMiddleware();

function* exampleSaga() {
    console.log("Example saga reached");
  }

export const store = createStore(searchReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(exampleSaga);