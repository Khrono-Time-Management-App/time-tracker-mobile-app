import axios from 'axios';
import { getTokenFromLocalStorage } from '../../utils/asyncStorageMethods';
import { getBackendUrl } from '../../utils';

const getHeaders = async () => {
  const token = await getTokenFromLocalStorage();

  return {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`,
  }
}

export const getActivities = async () => {
  const headers = await getHeaders();
  const backendUrl = `${getBackendUrl()}/activity`;

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
  const backendUrl = `${getBackendUrl()}/activity`;

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
