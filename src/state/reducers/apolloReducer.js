// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import {
  GET_USERNAME,
  GET_BEARER_TOKEN,
  GET_TOPICS,
} from '../actions/apolloActions';

const initialState = {
  bearerToken: '',
  username: '',
  topics: [],
};

export const apolloReducer = (state = initialState, action) => {
  switch (action.type) {
    // sets the username
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    // sets the bearer token
    case GET_BEARER_TOKEN:
      return {
        ...state,
        bearerToken: action.payload,
      };
    case GET_TOPICS:
      return {
        ...state,
        topics: action.payload,
      };
    default:
      return state;
  }
};
