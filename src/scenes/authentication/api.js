import axios from 'axios';
import { getBackendUrl } from '../../utils';

export const loginApiCall = async (credentials) => {
  const backendUrl = `${getBackendUrl()}/user`;

  return axios({
    method: 'post',
    url: `${backendUrl}/login`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    data: credentials
  }).then(response => {
    return response;
  });
};

export const createAccountApiCall = async (credentials) => {
  const backendUrl = `${getBackendUrl()}/user`;

  return axios({
    method: 'post',
    url: `${backendUrl}/createUser`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    data: credentials
  }).then(response => {
    return response;
  });
};
