// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import {
  GET_USER_INFO,
  GET_BEARER_TOKEN,
  GET_TOPICS,
  GET_ALL_CONTEXTS,
  SET_CURRENT_TOPIC,
} from '../actions/apolloActions';

const initialState = {
  bearerToken: '',
  userInfo: {},
  topics: [],
  contexts: [],
  currentTopic: {},
};

export const apolloReducer = (state = initialState, action) => {
  switch (action.type) {
    // sets the username
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
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
    case GET_ALL_CONTEXTS:
      return {
        ...state,
        contexts: action.payload,
      };
    case SET_CURRENT_TOPIC:
      return {
        ...state,
        currentTopic: action.payload,
      };
    default:
      return state;
  }
};
