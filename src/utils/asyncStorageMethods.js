import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocalStorage } from '../constants/localStorage';
import { handleErrors } from './handleErrors';

export const storeToken = async (tokenObject) => {
  try {
    const tokenJson = JSON.stringify(tokenObject);
    await AsyncStorage.setItem(LocalStorage.Token, tokenJson);
  } catch (error) {
    handleErrors(error);
  }
};

export const getTokenFromLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem(LocalStorage.Token);

    return token
  } catch (error) {
    handleErrors(error);
  }
};

export const getStateFromLocalStorage = async () => {
  try {
    const savedState = await AsyncStorage.getItem(LocalStorage.Authentication);
    return savedState !== null ? JSON.parse(savedState) : null;
  } catch (error) {
    handleErrors(error);
  }
};

export const setStateToLocalStorage = async (currentState) => {
  try {
    const stateToSave = JSON.stringify(currentState);
    await AsyncStorage.setItem(LocalStorage.Authentication, stateToSave);
  } catch (error) {
    handleErrors(error);
  }
};

export const removeStateFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem(LocalStorage.Authentication);
  } catch (error) {
    handleErrors(error);
  }
};

export default {
  storeToken,
  getStateFromLocalStorage,
};
