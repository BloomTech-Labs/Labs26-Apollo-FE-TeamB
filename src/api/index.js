import axios from 'axios';
import { store } from '../index';
const liveUrl = 'http://apollo-b-api.herokuapp.com';
const localtesturl = 'http://localhost:2019';
const usertopictest = `/topics/topics`;
// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}`;

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

// in order for tests to pass token needs to be gathered from authstate
// token is the bearer token in global state - if the api call needs it, just pass token as last argument and connect bearerToken from global state

// get the bearer token to apply to all other axios request functions
const axiosWithAuth = () => {
  const token = store.getState().bearerToken;
  return axios.create({
    headers: {
      Authorization: 'Bearer ' + token,
    },
    baseURL: localtesturl,
  });
};

const getUserTopics = dispatchFunc => {
  return axiosWithAuth()
    .get(usertopictest)
    .then(response => dispatchFunc(response.data))
    .catch(err => {
      console.log(err);
    });
};

const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};

const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};

const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};

const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

export { sleep, getUserTopics, getProfileData, getDSData, apiAuthGet };
