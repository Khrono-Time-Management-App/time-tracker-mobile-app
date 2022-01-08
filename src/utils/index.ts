import * as Device from 'expo-device';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { getExpoPushNotificationTokenFromLocalStorage } from './asyncStorageMethods';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const LOCAL_API_URL = 'http://localhost:8080';
const NGROK_API_URL = 'http://918e-77-81-26-84.ngrok.io';
const defaultPushNotificationMessage = {
  sound: 'default',
  title: 'Original Title',
  body: 'And here is the body!',
  data: { someData: 'goes here' },
}

export const createRequestTypes = base => {
  const types = [REQUEST, SUCCESS, FAILURE];
  return types.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
};

export const getBackendUrl = () => Device.isDevice ? NGROK_API_URL : LOCAL_API_URL;

export const sendPushNotification =
  async (notificationMessage = defaultPushNotificationMessage) => {
  const expoPushToken = await getExpoPushNotificationTokenFromLocalStorage();

  const message = {
    to: expoPushToken,
    ...notificationMessage
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
