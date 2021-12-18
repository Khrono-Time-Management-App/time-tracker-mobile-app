import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActivityItem from '../../../components/activityItem/ActivityItem';
import {FlatList, ScrollView, View} from 'native-base';
import {activities} from '../selectors';
import {getActivities} from '../actions';

const mockData = [{
  name: 'Biceps Triceps',
  activityDescription: 'Lorem ipsum dolor sit amet',
  category: 'fitness',
  startDateTime: 'TODAY @6AM'
},
  {
    name: 'Learn LFTC',
    activityDescription: 'Lorem ipsum dolor sit amet',
    category: 'education',
    startDateTime: 'TODAY @9AM'
  },
  {
    name: 'Go to the office',
    activityDescription: 'Lorem ipsum dolor sit amet',
    category: 'work',
    startDateTime: 'TODAY @10AM'
  },
  {
    name: 'Good-night Sleep',
    activityDescription: 'Lorem ipsum dolor sit amet',
    category: 'sleep',
    startDateTime: 'FRI @9PM'
  },
  {
    name: 'Good-night Sleep',
    activityDescription: 'Lorem ipsum dolor sit amet',
    category: 'sleep',
    startDateTime: 'SAT @9PM'
  },
  {
    name: 'Good-night Sleep',
    activityDescription: 'Lorem ipsum dolor sit amet',
    category: 'sleep',
    startDateTime: 'SUN @9PM'
  },
]

const ActivityListScreen = ({fetchActivities, activities}) => {
  useEffect(() => {
    fetchActivities()
  }, []);

  console.log(activities);

  return (
    <ScrollView
      _contentContainerStyle={{
        px: "20px",
        mb: "4",
        minW: "72",
      }}
    >
      <FlatList data={activities} renderItem={ActivityItem} />
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  activities: activities(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchActivities: getActivities
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityListScreen);
