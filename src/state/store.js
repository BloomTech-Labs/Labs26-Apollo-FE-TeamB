import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { apolloReducer } from './reducers/apolloReducer';

export const store = createStore(apolloReducer, applyMiddleware(thunk, logger));

export default store;
