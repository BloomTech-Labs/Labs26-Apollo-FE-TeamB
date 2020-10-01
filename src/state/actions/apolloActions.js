// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_BEARER_TOKEN = 'GET_BEARER_TOKEN';
export const GET_TOPICS = 'GET_TOPICS';
export const GET_ALL_CONTEXTS = 'GET_ALL_CONTEXTS';

// this function sets the username in gloabal state - used in Render Home page
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
