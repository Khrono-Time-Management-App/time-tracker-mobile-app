import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import { screens } from '../constants/screens';
import ActivityListScreen from '../scenes/dashboard/screens/ActivityList';
import navigationConstraints from '../theme/navigationConstraints';
import { Colors } from '../theme/colors';
import HeaderTitleText from '../scenes/authentication/components/HeaderTitleText';
import ActivityDetail from '../scenes/dashboard/screens/ActivityDetail';

const ActivityStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={screens.Activities}
    >
      <Stack.Screen
        name={screens.Activities}
        component={ActivityListScreen}
        options={({ navigation }) => ({
          headerTitle: <HeaderTitleText title='Activities' />,
          headerRight:(props) =>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.ActivitiesDetail)}
            >
              <Icon
                name='plus'
                style={navigationConstraints.headerRight}
                size={21}
                color={Colors.LightBlack}
                {...props}
              />
            </TouchableOpacity>
        })}
      />
      <Stack.Screen
        name={screens.ActivitiesDetail}
        component={ActivityDetail}
        options={{
          headerTitle: <HeaderTitleText title='Activity Detail' />,
          headerLeft: props => <Icon name='arrow-left' style={navigationConstraints.headerLeft} size={18} {...props}/>
        }}
      />

    </Stack.Navigator>
  );
};

export default ActivityStackNavigator;
