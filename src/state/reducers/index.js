// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

const initialState = {
  userid: '',
  username: '',
  titles: [],
};

export const apolloReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
