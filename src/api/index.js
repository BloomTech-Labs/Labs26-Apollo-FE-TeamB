import axios from 'axios';

// !MAJOR REFACTOR!
// ####################
// API ENDPOINTS
export const API_LIVE_URL = 'https://apollo-b-api.herokuapp.com'
export const API_LOCAL_TEST_URL = 'http://localhost:2019'
export const API_USER_TOPICS = '/topics/topics'
export const API_CREATE_NEW = '/topics/new'
export const API_GET_CONTEXTS = '/contexts/contexts' 
export const API_URL = `${process.env.REACT_APP_API_URI}`
export const API_JOIN_TOPIC = '/topics/topic/'
export const API_CREATE_ANSWER = '/surveys/response'
export const API_GET_TOPIC_BY_ID = '/topics/topic/'

// ####################
// CALLS REFACTORED
// axiosWithAuth --> utils
// getUserTopics --> actions
// createNewTopic --> actions
// getContexts --> actions
// userJoinTopic --> actions ( as joinTopic ) 
// createAnswer --> actions 
// getTopicById --> actions
// ####################

const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

// const createNewTopic = (newTopicData, fn) => {
//   return axiosWithAuth()
//     .post(createNew, newTopicData)
//     .then(response => {
//       getUserTopics(fn);
//       return response.data.joincode;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const userJoinTopic = (joinCode, fn) => {
//   return axiosWithAuth()
//     .post(`/topics/topic/${joinCode}`)
//     .then(r => {
//       getUserTopics(fn);
//       return 'success';
//     })
//     .catch(err => {
//       return 'error';
//     });
// };

// get the list of contexts when starting the create new topic wizard
// const getContexts = dispatchFunc => {
//   return axiosWithAuth()
//     .get('/contexts/contexts')
//     .then(response => {
//       return dispatchFunc(response.data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

// const createAnswer = (newAnswer, fn) => {
//   return axiosWithAuth()
//     .post(`/surveys/response`, newAnswer)
//     .then(response => {
//       return fn;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// get a topic by topic id, to set the currentTopic to
// const getTopicById = (dispatchFunc, topicid) => {
//   return axiosWithAuth()
//     .get(`/topics/topic/${topicid}`)
//     .then(response => {
//       return dispatchFunc(response.data);
//     })
//     .catch(error => console.log(error));
// };

// send a request to submit a new survey for a topic
const postNewRequest = (topicId, questionslist, dispatchFunc) => {
  return axiosWithAuth()
    .post(`/surveys/topic/${topicId}`, questionslist)
    .then(response => {
      console.log(response.data);
      // refresh the current Topic
      dispatchFunc(response.data);
    })
    .catch(error => {
      console.log(error);
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

export {
  sleep,
  createNewTopic,
  userJoinTopic,
  getContexts,
  createAnswer,
  getTopicById,
  postNewRequest,
  getProfileData,
  getDSData,
  apiAuthGet,
};
