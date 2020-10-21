// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import {
  SET_USER_INFO_SUCCESS,
  SET_USER_INFO_FAIL,
  SET_BEARER_TOKEN_SUCCESS,
  SET_BEARER_TOKEN_FAIL,
  GET_TOPICS_START,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAIL,
  GET_CONTEXTS_START,
  GET_CONTEXTS_SUCCESS,
  GET_CONTEXTS_FAIL,
  SET_TOPIC_SUCCESS,
  SET_TOPIC_FAIL,
  ADD_NEW_SURVEY_SUCCESS,
  ADD_NEW_SURVEY_FAIL
} from '../actions/';

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
    case SET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    // sets the bearer token
    case SET_BEARER_TOKEN_SUCCESS:
      return {
        ...state,
        bearerToken: action.payload,
      };
    case GET_TOPICS_SUCCESS:
      if (action.payload.length > 0) {
        let mostrecentdate = action.payload[0].lastModifiedDate;
        let mostrecenttopic = action.payload[0];
        action.payload.map(topic => {
          if (topic.lastModifiedDate > mostrecentdate) {
            mostrecentdate = topic.lastModifiedDate;
            mostrecenttopic = topic;
          }
        });

        return {
          ...state,
          topics: action.payload,
          currentTopic: mostrecenttopic,
        };
      } else {
        return {
          ...state,
          topics: action.payload,
        };
      }

    case GET_CONTEXTS_SUCCESS:
      return {
        ...state,
        contexts: action.payload,
      };
    case SET_TOPIC_SUCCESS:
      return {
        ...state,
        currentTopic: action.payload,
      };

    case ADD_NEW_SURVEY_SUCCESS:
      return {
        ...state,
        currentTopic: {
          ...state.currentTopic,
          surveysrequests: [
            ...state.currentTopic.surveysrequests,
            action.payload,
          ],
        },
      };
    default:
      return state;
  }
};
