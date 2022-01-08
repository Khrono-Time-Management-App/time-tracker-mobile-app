import * as Device from 'expo-device';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const LOCAL_API_URL = 'http://localhost:8080';
const NGROK_API_URL = 'http://918e-77-81-26-84.ngrok.io';

export const createRequestTypes = base => {
  const types = [REQUEST, SUCCESS, FAILURE];
  return types.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

export const getBackendUrl = () => Device.isDevice ? NGROK_API_URL : LOCAL_API_URL;
