import React from 'react';
import { screens } from '../constants/screens'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const BottomTabBarIconOptions = ({navigationRoute, isFocused, iconColor, iconSize}) => {
  let iconName;

  if (navigationRoute.name === screens.Dashboard) {
    iconName = 'dashboard';
  } else if (navigationRoute.name === screens.Activities) {
    iconName = 'bar-chart-o';
  }

  return <Icon name={iconName} size={iconSize} color={iconColor} />;
};

BottomTabBarIconOptions.propTypes = {
  navigationRoute: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
  iconColor: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,

};
export default BottomTabBarIconOptions;
