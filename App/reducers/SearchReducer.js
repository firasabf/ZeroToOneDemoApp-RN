import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getSearchRequest: ['id'],
  getSearchSuccess: ['videos'],
  getSearchFailure: ['errorMessage'],
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: null,
    errorMessage: null,
    errorGetSearchResults:null,
    searchResults: null
})


/* ------------- Reducers ------------- */

// request to start Search
export const requestGetSearch = (state, { id }) => {
  return state.merge({
    fetching: true,
    errorMessage: null,
    errorGetSearchResults:null,
    searchResults: null})
}
// successfully getting results of search
export const successGetSearch = (state, action) => {
  const { searchResults } = action
  return state.merge({
    fetching: false,
    errorGetSearchResults:false,
    searchResults})
}
// failed to get the searched results
export const failureGetSearch = (state, action) => {
  const { errorMessage } = action
  return state.merge({
    fetching: false,
    errorGetSearchResults:true,
    errorMessage })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SEARCH_REQUEST]: requestGetSearch,
  [Types.GET_SEARCH_SUCCESS]: successGetSearch,
  [Types.GET_SEARCH_FAILURE]: failureGetSearch,
})
