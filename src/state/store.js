import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { apolloReducer } from './reducers/apolloReducer';

export const store = createStore(apolloReducer, applyMiddleware(thunk));

export default store;
