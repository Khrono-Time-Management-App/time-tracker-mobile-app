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

export const addActivityApi = async (activity) => {
  const headers = await getHeaders();

  return axios({
    method: 'post',
    url: `${backendUrl}/createActivity`,
    headers,
    data: activity,
  }).then(response => {
    console.log(" addActivity addActivity addActivity --- >>", response)
    return response;
  });
};