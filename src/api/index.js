import axios from 'axios';
import { store } from '../state/store';

// the live api
const liveUrl = 'https://apollo-b-api.herokuapp.com';
// for testing locally
const localtesturl = 'http://localhost:2019';
const usertopics = `/topics/topics`;
const createNew = `/topics/new`;
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
    baseURL: liveUrl,
  });
};

// request for a list of topics for the current user
const getUserTopics = dispatchFunc => {
  return axiosWithAuth()
    .get(usertopics)
    .then(response => {
      dispatchFunc(response.data);
    })
    .catch(err => {
      console.log(err);
    });
};

const createNewTopic = (newTopicData, fn) => {
  return axiosWithAuth()
    .post(createNew, newTopicData)
    .then(response => {
      getUserTopics(fn);
      return response.data.joincode;
    })
    .catch(err => {
      console.log(err);
    });
};

const userJoinTopic = (joinCode, fn) => {
  return axiosWithAuth()
    .post(`/topics/topic/${joinCode}`)
    .then(r => {
      getUserTopics(fn);
      return 'success';
    })
    .catch(err => {
      return 'error';
    });
};

// get the list of contexts when starting the create new topic wizard
const getContexts = dispatchFunc => {
  return axiosWithAuth()
    .get('/contexts/contexts')
    .then(response => {
      return dispatchFunc(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const createAnswer = (newAnswer, id, dispatchFunc) => {
  return axiosWithAuth()
    .post(`/surveys/response`, newAnswer)
    .then(response => {
      getRequestById(id, dispatchFunc);
    })
    .catch(err => {
      console.log(err);
    });
};

// get a topic by topic id, to set the currentTopic to
const getTopicById = (dispatchFunc, topicid) => {
  return axiosWithAuth()
    .get(`/topics/topic/${topicid}`)
    .then(response => {
      return dispatchFunc(response.data);
    })
    .catch(error => console.log(error));
};

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

// get the request by Id
const getRequestById = (requestId, dispatchFunc) => {
  return axiosWithAuth()
    .get(`/surveys/survey/${requestId}`)
    .then(response => {
      dispatchFunc(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

// api function that gets the current request then does logic on the result to display answers by the member id
const getAnswersByMemberId = (requestid, memberid, dispatchFunc) => {
  return axiosWithAuth()
    .get(`/surveys/survey/${requestid}`)
    .then(response => {
      const allquestions = response.data.questions;
      const memberquestions = allquestions.filter(q => {
        return !q.leader;
      });
      memberquestions.forEach(q => {
        q.answers = q.answers.filter(a => {
          return a.user.userid === memberid;
        });
      });
      return dispatchFunc(memberquestions);
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
  getUserTopics,
  createNewTopic,
  userJoinTopic,
  getContexts,
  createAnswer,
  getTopicById,
  getRequestById,
  getAnswersByMemberId,
  postNewRequest,
  getProfileData,
  getDSData,
  apiAuthGet,
};
