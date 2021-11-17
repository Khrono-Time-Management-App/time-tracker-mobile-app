import axios from 'axios';

const backendUrl = 'http://localhost:8080/user'

export const loginApiCall = async (credentials) => {
  return axios({
    method: 'post',
    url: `${backendUrl}/login`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    data: credentials
  }).then(response => {
    return response;
  })
}
