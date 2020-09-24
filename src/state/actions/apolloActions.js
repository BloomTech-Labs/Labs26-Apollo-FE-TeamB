// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
export const GET_USERNAME = 'GET_USERNAME';
export const GET_BEARER_TOKEN = 'GET_BEARER_TOKEN';
export const GET_TOPICS = 'GET_TOPICS';

// this function sets the username in gloabal state - used in Render Home page
export const getUsername = username => {
  return dispatch => {
    dispatch({ type: GET_USERNAME, payload: username });
  };
};

// this function sets the bearer in gloabal state to be used with any api call - used in Render Home page and referenced in api calls that need auth
export const getBearerToken = token => {
  return dispatch => {
    dispatch({ type: GET_BEARER_TOKEN, payload: token });
  };
};

//
export const getTopics = topicslist => {
  return dispatch => {
    dispatch({ type: GET_TOPICS, payload: topicslist });
  };
};
