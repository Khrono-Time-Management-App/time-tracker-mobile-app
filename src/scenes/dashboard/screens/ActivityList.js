import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ActivityItem from '../../../components/activityItem/ActivityItem';
import {FlatList, ScrollView, View} from 'native-base';
import {activities} from '../selectors';
import {getActivities} from '../actions';

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
