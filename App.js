import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';

import configureStore from './src/configureStore';
import MainNavigator from './src/navigation/MainNavigator';

const App = () => {
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
