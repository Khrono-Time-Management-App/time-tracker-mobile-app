import axios from 'axios';
import {getTokenFromLocalStorage} from '../../utils/asyncStorageMethods';

const backendUrl = 'http://localhost:8080/activity'

const getHeaders = async () => {
  const token = await getTokenFromLocalStorage();

  return {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`,
  }
}

export const getActivities = async () => {
  const headers = await getHeaders();

  return axios({
    method: 'get',
    url: `${backendUrl}/getActivities`,
    headers,
  }).then(response => {
    return response;
  });
};