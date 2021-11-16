import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Colors } from '../theme/colors';
import { screens } from '../constants/screens';
import SignUpScreen from "../scenes/authentication/screens/SignUpScren";
import LoginScreen from "../scenes/authentication/screens/LoginScreen";
import { isAuthenticated } from '../scenes/authentication/selectors';

const authenticationNavigatorScreenOptions = {
  headerShown: false
};

const MainNavigator = ({ isAuthenticated }) => {
  const BottomTabNavigator = createBottomTabNavigator();
  const AuthenticationStackNavigator = createStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.White
    },
  };

  console.log('LOGGER', isAuthenticated);

  return (
    <NavigationContainer
      theme={MyTheme}
    >
      {isAuthenticated ? (
        <BottomTabNavigator.Navigator>

        </BottomTabNavigator.Navigator>
      ) : (
        <AuthenticationStackNavigator.Navigator
          screenOptions={authenticationNavigatorScreenOptions}
        >
          <AuthenticationStackNavigator.Screen
            name={screens.Login}
            component={LoginScreen}
          />
          <AuthenticationStackNavigator.Screen
            name={screens.SignUp}
            component={SignUpScreen}
          />
        </AuthenticationStackNavigator.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state)
});

export default connect(mapStateToProps)(MainNavigator);
