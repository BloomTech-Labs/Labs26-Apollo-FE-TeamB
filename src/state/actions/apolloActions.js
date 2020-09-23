// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
export const GET_USERNAME = 'GET_USERNAME';
export const GET_BEARER_TOKEN = 'GET_BEARER_TOKEN';

export const getUsername = username => {
  return dispatch => {
    dispatch({ type: GET_USERNAME, payload: username });
  };
};

export const getBearerToken = token => {
  return dispatch => {
    dispatch({ type: GET_BEARER_TOKEN, payload: token });
  };
};
