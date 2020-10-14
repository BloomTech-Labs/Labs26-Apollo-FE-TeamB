// import all of your reducers into this file, and export them back out.
// This allows for the simplification of flow when importing reducers into your actions throughout your app.

import {
  GET_USER_INFO,
  GET_BEARER_TOKEN,
  GET_TOPICS,
  GET_ALL_CONTEXTS,
  SET_CURRENT_TOPIC,
  ADD_NEW_SURVEY,
} from '../actions/apolloActions';

const initialState = {
  bearerToken: '',
  userInfo: {},
  topics: [],
  contexts: [],
  currentTopic: {},
  currentRequest: {},
};

export const apolloReducer = (state = initialState, action) => {
  switch (action.type) {
    // sets the username
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    // sets the bearer token
    case GET_BEARER_TOKEN:
      return {
        ...state,
        bearerToken: action.payload,
      };
    case GET_TOPICS:
      if (action.payload.length > 0) {
        let mostrecentdate = action.payload[0].lastModifiedDate;
        let mostrecenttopic = action.payload[0];
        action.payload.map(topic => {
          if (topic.lastModifiedDate > mostrecentdate) {
            mostrecentdate = topic.lastModifiedDate;
            mostrecenttopic = topic;
          }
        });
        console.log(mostrecenttopic);
        if (mostrecenttopic.surveysrequests.length > 0) {
          let mostrecentrequestdate =
            mostrecenttopic.surveysrequests[0].createdDate;
          let mostrecentrequest = mostrecenttopic.surveysrequests[0];
          mostrecenttopic.surveysrequests.map(request => {
            console.log(request.createdDate);
            if (request.createdDate > mostrecentrequestdate) {
              console.log('this is happening');
              mostrecentrequestdate = request.createdDate;
              console.log(mostrecentrequestdate);
              mostrecentrequest = request;
            }
          });
          return {
            ...state,
            topics: action.payload,
            currentTopic: mostrecenttopic,
            currentRequest: mostrecentrequest,
          };
        } else {
          return {
            ...state,
            topics: action.payload,
            currentTopic: mostrecenttopic,
          };
        }
      } else {
        return {
          ...state,
          topics: action.payload,
        };
      }

    case GET_ALL_CONTEXTS:
      return {
        ...state,
        contexts: action.payload,
      };

    case SET_CURRENT_TOPIC:
      if (action.payload.surveysrequests.length > 0) {
        let recentrequestdate = action.payload.surveysrequests[0].createdDate;
        let recentrequest = action.payload.surveysrequests[0];
        action.payload.surveysrequests.map(request => {
          console.log(request.createdDate);
          if (request.createdDate > recentrequestdate) {
            recentrequestdate = request.createdDate;
            recentrequest = request;
          }
        });
        return {
          ...state,
          currentTopic: action.payload,
          currentRequest: recentrequest,
        };
      } else {
        return {
          ...state,
          currentTopic: action.payload,
        };
      }

    case ADD_NEW_SURVEY:
      return {
        ...state,
        currentTopic: {
          ...state.currentTopic,
          surveysrequests: [
            ...state.currentTopic.surveysrequests,
            action.payload,
          ],
        },
      };
    default:
      return state;
  }
};
