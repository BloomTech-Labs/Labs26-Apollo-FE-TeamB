import axios from 'axios';
const liveUrl = 'http://apollo-b-api.herokuapp.com';
const localtesturl = 'http://localhost:2019';
const usertopictest = `${localtesturl}/users/users`;
// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/users/users`;
// this gets the token Object from localstorage
const tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
// this sets the bearer token for making api calls that require authorization
const bearerToken = {
  headers: { Authorization: 'Bearer ' + tokenObj.accessToken.accessToken },
};

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

const getUserTopics = () => {
  return axios
    .get(usertopictest, bearerToken)
    .then(response => console.log(response.data[0].ownedtopics))
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
