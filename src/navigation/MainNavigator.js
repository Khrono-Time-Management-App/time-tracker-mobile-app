import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../theme/colors';
import { screens } from '../constants/screens';
import SignUpScreen from '../scenes/authentication/screens/SignUpScren';
import LoginScreen from '../scenes/authentication/screens/LoginScreen';
import DashboardScreen from '../scenes/dashboard/screens/Dashboard';
import { isAuthenticated } from '../scenes/authentication/selectors';
import BottomTabBarIconOptions from './BottomTabBarIconOptions';

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

  return (
    <NavigationContainer
      theme={MyTheme}
    >
      {isAuthenticated ? (
        <BottomTabNavigator.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <BottomTabBarIconOptions
                iconSize={size}
                isFocused={focused}
                navigationRoute={route}
                iconColor={color}
              />
            )
          })}
        >
          <BottomTabNavigator.Screen name={screens.Dashboard} component={DashboardScreen}/>
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
