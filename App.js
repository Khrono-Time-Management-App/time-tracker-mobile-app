import React, { useEffect, useRef, useState } from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import * as Notifications from 'expo-notifications';
import { useFonts } from 'expo-font';

import configureStore from './src/configureStore';
import MainNavigator from './src/navigation/MainNavigator';
import { registerForPushNotificationsAsync, sendPushNotification } from './src/utils';
import { setExpoPushNotificationTokenToLocalStorage } from './src/utils/asyncStorageMethods';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [loaded] = useFonts({
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      setExpoPushNotificationTokenToLocalStorage(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={configureStore()}>
      <ActionSheetProvider>
        <NativeBaseProvider>
          <MainNavigator />
        </NativeBaseProvider>
      </ActionSheetProvider>
    </Provider>
  );
}

export default App;
