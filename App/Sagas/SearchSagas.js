import { call, put, all } from 'redux-saga/effects'
import SearchActions from '../reducers/SearchReducer'
import YTSearch from 'youtube-api-search';

export function * getSearch (api, action) {
  const { apiKey, toSearch } = action
  // make the call to the api
  const response = yield call(
      YTSearch({ key: apiKey, toSearch}, videos => {
  }))


  console.log(response)
  if (response.ok) {
    const resp = response.videos 
    console.log(resp)
    yield put(SearchActions.getSearchSuccess(resp))
  } else {
    console.log(response)
    const resp = response.data ? response.data.message : response.problem
    yield put(SearchActions.getSearchFailure(resp))
  }
}

