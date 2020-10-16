// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_BEARER_TOKEN = 'GET_BEARER_TOKEN';
export const GET_TOPICS = 'GET_TOPICS';
export const GET_ALL_CONTEXTS = 'GET_ALL_CONTEXTS';
export const SET_CURRENT_TOPIC = 'SET_CURRENT_TOPIC';
export const ADD_NEW_SURVEY = 'ADD_NEW_SURVEY';
export const SET_CURRENT_REQUEST = 'SET_CURRENT_REQUEST';
export const SET_MEMBER_ANSWERS = 'SET_MEMBER_ANSWERS';

// this function sets the username in global state - used in Render Home page
export const getUserInfo = userinfo => {
  return dispatch => {
    dispatch({ type: GET_USER_INFO, payload: userinfo });
  };
};

// this function sets the bearer in gloabal state to be used with any api call - used in Render Home page and referenced in api calls that need auth
export const getBearerToken = token => {
  return dispatch => {
    dispatch({ type: GET_BEARER_TOKEN, payload: token });
  };
};

// this gets topics on initial login and when a user joins a topic
export const getTopics = topicslist => {
  return dispatch => {
    dispatch({ type: GET_TOPICS, payload: topicslist });
  };
};

export const getAllContexts = contexts => {
  return dispatch => {
    dispatch({ type: GET_ALL_CONTEXTS, payload: contexts });
  };
};

// action to take the topic from get topic by id call and add to state
export const getCurrentTopic = topic => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_TOPIC, payload: topic });
  };
};

export const addNewSurvey = survey => {
  return dispatch => {
    dispatch({ type: ADD_NEW_SURVEY, payload: survey });
  };
};

// action to change current request to a new request
export const getCurrentRequest = request => {
  return dispatch => {
    dispatch({ type: SET_CURRENT_REQUEST, payload: request });
  };
};

// action to set the current member answers - can choose a single member or get all answers
export const setMemberAnswers = memberid => {
  return dispatch => {
    dispatch({ type: SET_MEMBER_ANSWERS, payload: memberid });
  };
};
