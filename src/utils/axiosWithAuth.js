import { LIVE_URL } from '../api'
import axios from 'axios'
import {store} from '../state/store'

// get the bearer token to apply to all other axios request functions
const axiosWithAuth = () => {
  const token = store.getState().bearerToken;
  return axios.create({
    headers: {
      Authorization: 'Bearer ' + token,
    },
    baseURL: LIVE_URL,
  });
};

export default axiosWithAuth
