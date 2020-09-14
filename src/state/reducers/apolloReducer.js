// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import { GET_USERNAME } from '../actions/apolloActions';

const initialState = {
  userid: '',
  username: '',
  titles: [],
};

export const apolloReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};
