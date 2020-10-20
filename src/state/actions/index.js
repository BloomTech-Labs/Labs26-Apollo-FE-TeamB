// ###############################################
export const SET_USER_INFO_SUCCESS = 'SET_USER_INFO_SUCCESS';
export const SET_USER_INFO_FAIL = 'SET_USER_INFO_FAIL';
// ###############################################
export const SET_BEARER_TOKEN_SUCCESS = 'GET_BEARER_TOKEN_SUCCESS';
export const SET_BEARER_TOKEN_FAIL= 'GET_BEARER_TOKEN_FAIL';
// ###############################################
export const GET_TOPICS_START = 'GET_TOPICS_START';
export const GET_TOPICS_SUCCESS = 'GET_TOPICS_SUCCESS';
export const GET_TOPICS_FAIL = 'GET_TOPICS_FAIL';
// ###############################################
export const GET_TOPIC_BY_ID_START = 'GET_TOPIC_BY_ID_START'
export const GET_TOPIC_BY_ID_SUCCESS = 'GET_TOPIC_BY_ID_SUCCESS'
export const GET_TOPIC_BY_ID_FAIL = 'GET_TOPIC_BY_ID_FAIL'
// ###############################################
export const GET_CONTEXTS_START = 'GET_CONTEXTS_START';
export const GET_CONTEXTS_SUCCESS = 'GET_CONTEXTS_SUCCESS';
export const GET_CONTEXTS_FAIL = 'GET_CONTEXTS_FAIL';
// ###############################################
export const SET_TOPIC_SUCCESS = 'SET_CURRENT_TOPIC_SUCCESS';
export const SET_TOPIC_FAIL = 'SET_CURRENT_TOPIC_FAIL';
// ###############################################
export const ADD_NEW_SURVEY_SUCCESS = 'ADD_NEW_SURVEY_SUCCESS';
export const ADD_NEW_SURVEY_FAIL = 'ADD_NEW_SURVEY_FAIL';
// ###############################################
export const CREATE_NEW_TOPIC_START = 'CREATE_NEW_TOPIC_START'
export const CREATE_NEW_TOPIC_SUCCESS = 'CREATE_NEW_TOPIC_SUCCESS'
export const CREATE_NEW_TOPIC_FAIL = 'CREATE_NEW_TOPIC_FAIL'
// ###############################################
export const JOIN_TOPIC_START = 'JOIN_TOPIC_START' 
export const JOIN_TOPIC_SUCCESS= 'JOIN_TOPIC_SUCCESS'
export const JOIN_TOPIC_FAIL= 'JOIN_TOPIC_FAIL'
// ###############################################
export const CREATE_ANSWER_START = 'CREATE_ANSWER_START'
export const CREATE_ANSWER_SUCCESS = 'CREATE_ANSWER_SUCCESS'
export const CREATE_ANSWER_FAIL = 'CREATE_ANSWER_FAIL'
// ###############################################
export const POST_NEW_REQUEST_START = "POST_NEW_REQUEST_START"
export const POST_NEW_REQUEST_SUCCESS= "POST_NEW_REQUEST_SUCCESS"
export const POST_NEW_REQUEST_FAIL= "POST_NEW_REQUEST_FAIL"
// ###############################################

import axiosWithAuth from '../../utils/axiosWithAuth'
import {API_USER_TOPICS, 
  API_CREATE_NEW,
  API_GET_CONTEXTS,
  API_JOIN_TOPIC,
  API_CREATE_ANSWER,
  API_GET_TOPIC_BY_ID
} from '../../api'

export const setUserInfo = userinfo => {
  return dispatch => {
    dispatch({ type: SET_USER_INFO_SUCCESS, payload: userinfo })
    if (userinfo == null) {
      dispatch({ type: SET_USER_INFO_FAIL,
        payload: { error: "Userinfo is null ( check your args )"}})
    }
  };
};

export const setBearerToken = token => {
  return dispatch => {
    dispatch({ type: GET_BEARER_TOKEN_SUCCESS, payload: {error: "", token: token} });
    if (token == null) {
      dispatch({ type: SET_BEARER_TOKEN_FAIL, 
      payload: { error: "Bad token passed ( check your args )" }})
    }
  };
};

export const getUserTopics = () => {
  return dispatch => {
    dispatch({ type: GET_TOPICS_START,
      payload: { error: "", isFetching: true }})

    axiosWithAuth()
      .get(API_USER_TOPICS)
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
      .get(API_CREATE_NEW, topicInfo)
      .then(res => {
        dispatch({ type: CREATE_NEW_TOPIC_SUCCESS,
          payload: { error: "", isFetching: false }}) // what is this setting into state?
      })
      .catch(err => {
        dispatch({ type: CREATE_NEW_TOPIC_FAIL,
          payload: { error: err, isFetching: false }})
      })
  }
}

export const postNewRequest = (topicId, questionsList) => {
  return dispatch => {
    dispatch({ type: POST_NEW_REQUEST_START,
    payload: {error: "", isFetching: true }})
    axiosWithAuth() 
      .post(`${API_POST_NEW_REQUEST}${topicId}`, questionsList)
      .then(_res => { // set request? 
        dispatch({ type: POST_NEW_REQUEST_SUCCESS,
        payload: {error: "", isFetching: false}})
      })
      .catch(err => {
        dispatch({ type: POST_NEW_REQUEST_FAIL,
        payload: {error: err, isFetching: false}})
      })
  }
}

export const getTopicById = topicId => {
  return dispatch => {
    dispatch({ type: GET_TOPIC_BY_ID_START,
    payload: {error: "", isFetching: true}})
    axiosWithAuth()
      .get(`${API_GET_TOPIC_BY_ID}${topicId}`)
      .then(res => {
        dispatch({ type: GET_TOPIC_BY_ID_SUCCESS,
        payload: {error: "", isFetching: false }})
        setTopic(res.data)
      })
      .catch(err => {
        dispatch({ type: GET_TOPIC_BY_ID_FAIL,
        payload: {error: err, isFetching: false}})
      })
  }
}

export const getContexts = () => {
  return dispatch => {
    dispatch({ type: GET_CONTEXTS_START, 
      payload: { error: "", isFetching: true}});
    axiosWithAuth()
      .get(API_GET_CONTEXTS)
      .then(res => {
        dispatch({ type: GET_CONTEXTS_SUCCESS,
          payload: { error: "", isFetching: false, 
          contexts: res.data }})
      })
      .catch(err => {
        dispatch({ type: GET_CONTEXTS_FAIL,
          payload: { error: err, isFetching: false}})
      })
  };
};

export const createAnswer = answer => {
  return dispatch => {
    dispatch({ type: CREATE_ANSWER_START,
    payload: {error: "", isFetching: true }})
    axiosWithAuth()
      .post(API_CREATE_ANSWER, answer)
      .then(_res => {
        dispatch({ type: CREATE_ANSWER_SUCCESS,
        payload: {error: "", isFetching: false }})
      })
      .catch(err => {
        dispatch({ type: CREATE_NEW_TOPIC_FAIL,
        payload: {error: err, isFetching: false }})
      })
  }
}

export const joinTopic = joinCode => {
  return dispatch => {
    dispatch({ type: JOIN_TOPIC_START,
    payload: {error: "", isFetching: true}})
    axiosWithAuth()
      .post(`${API_JOIN_TOPIC}${joinCode}`)
      .then(_res => {
        dispatch({ type: JOIN_TOPIC_SUCCESS,
        payload: {error: "", isFetching: false}})
        getUserTopics()
      })
      .catch(err => {
        dispatch({ type: JOIN_TOPIC_FAIL,
        payload: {error: err, isFetching: false}})
      })
  }
}

export const setTopic = topic => {
  return dispatch => {
    dispatch({ type: SET_TOPIC_SUCCESS, payload: topic });
    if (!topic) {
      dispatch({ type: SET_TOPIC_FAIL, payload: {error: "Bad topic passed ( check your args )" }})
    }
  };
};

export const addNewSurvey = survey => {
  return dispatch => {
    dispatch({ type: ADD_NEW_SURVEY_SUCCESS, payload: survey });
    if (!survey) {
      dispatch({ type: ADD_NEW_SURVEY_FAIL, payload: {error: "Bad survey passed ( check your args )" }})
    }
  };
};
