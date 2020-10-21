import { API_LIVE_URL } from '../api';
import axios from 'axios';
import { store } from '../state/store';

export const axiosWithAuth = () => {
  const token = store.getState().bearerToken;
  return axios.create({
    headers: {
      Authorization: 'Bearer ' + token,
    },
    baseURL: API_LIVE_URL,
  });
};

export const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

export const apiAuthGet = authHeader => {
  return axios.get(API_LIVE_URL, { headers: authHeader });
};

export const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

export const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });
