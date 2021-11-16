import axios from 'axios';

const backendUrl = 'http://localhost:8080/users'

export const loginApiCall = async (credentials) => {
  return axios({
    method: 'post',
    url: `${backendUrl}/login`,
    data: credentials
  }).then(response => {
    return response;
  })
}
