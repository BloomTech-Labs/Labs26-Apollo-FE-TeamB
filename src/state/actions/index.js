// ###############################################
export const GET_USER_INFO_START = 'GET_USER_INFO_START';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL';
// ###############################################
export const SET_BEARER_TOKEN_SUCCESS = 'GET_BEARER_TOKEN_SUCCESS';
export const SET_BEARER_TOKEN_FAIL= 'GET_BEARER_TOKEN_FAIL';
// ###############################################
export const GET_TOPICS_START = 'GET_TOPICS_START';
export const GET_TOPICS_SUCCESS = 'GET_TOPICS_SUCCESS';
export const GET_TOPICS_FAIL = 'GET_TOPICS_FAIL';
// ###############################################
export const GET_ALL_CONTEXTS_START = 'GET_ALL_CONTEXTS_START';
export const GET_ALL_CONTEXTS_SUCCESS = 'GET_ALL_CONTEXTS_SUCCESS';
export const GET_ALL_CONTEXTS_FAIL = 'GET_ALL_CONTEXTS_FAIL';
// ###############################################
export const SET_CURRENT_TOPIC_START = 'SET_CURRENT_TOPIC_START';
export const SET_CURRENT_TOPIC_SUCCESS = 'SET_CURRENT_TOPIC_SUCCESS';
export const SET_CURRENT_TOPIC_FAIL = 'SET_CURRENT_TOPIC_FAIL';
// ###############################################
export const ADD_NEW_SURVEY_START = 'ADD_NEW_SURVEY_START';
export const ADD_NEW_SURVEY_SUCCESS = 'ADD_NEW_SURVEY_SUCCESS';
export const ADD_NEW_SURVEY_FAIL = 'ADD_NEW_SURVEY_FAIL';
// ###############################################
export const CREATE_NEW_TOPIC_START = 'CREATE_NEW_TOPIC_START'
export const CREATE_NEW_TOPIC_SUCCESS = 'CREATE_NEW_TOPIC_SUCCESS'
export const CREATE_NEW_TOPIC_FAIL = 'CREATE_NEW_TOPIC_FAIL'
// ###############################################

import axiosWithAuth from '../../utils/axiosWithAuth'
import {USER_TOPICS, CREATE_NEW} from '../../api'

// this function sets the username in gloabal state - used in Render Home page
// export const getUserInfo = userinfo => {
//   return dispatch => {
//     dispatch({ type: GET_USER_INFO, payload: userinfo })
//   };
// };

// sets the bearer in gloabal state to be used with any api call - used in Render Home page and referenced in api calls that need auth
export const setBearerToken = token => {
  return dispatch => {
    dispatch({ type: GET_BEARER_TOKEN_SUCCESS, payload: {error: "", token: token} });
    if (token == null) {
      dispatch({ type: SET_BEARER_TOKEN_FAIL, 
      payload: { error: "Bad token passed ( check your args )" }})
    }
  };
};

// gets topics on initial login & upon joining a topic
export const getUserTopics = () => {
  return dispatch => {
    dispatch({ type: GET_TOPICS_START,
      payload: { error: "", isFetching: true }})

    axiosWithAuth()
      .get(USER_TOPICS)
      .then(res => {
        dispatch({ type: GET_TOPICS_SUCCESS, 
          payload: { error: "", isFetching: false, topics: res.data }});
      })
      .catch(err => {
        dispatch({ type: GET_USER_INFO_FAIL,
        payload: { error: err, isFetching: false }})
      })
  };
};

export const createNewTopic = topicInfo => {
  return dispatch => {
    dispatch({ type: CREATE_NEW_TOPIC_START,
      payload: {error: "", isFetching: true}})
    axiosWithAuth()
      .get(CREATE_NEW, topicInfo)
      .then(res => {
        dispatch({ type: CREATE_NEW_TOPIC_SUCCESS,
          payload: { error: "", isFetching: false }}) // what is this setting into state?
      })

  }
}

// export const getAllContexts = contexts => {
//   return dispatch => {
//     dispatch({ type: GET_ALL_CONTEXTS, payload: contexts });
//   };
// };

// action to take the topic from get topic by id call and add to state
// export const getCurrentTopic = topic => {
//   return dispatch => {
//     dispatch({ type: SET_CURRENT_TOPIC, payload: topic });
//   };
// };

// export const addNewSurvey = survey => {
//   return dispatch => {
//     dispatch({ type: ADD_NEW_SURVEY, payload: survey });
//   };
// };
