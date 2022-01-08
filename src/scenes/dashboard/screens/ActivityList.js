import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from "native-base";
import { SafeAreaView } from "react-native";

import ActivityItem from "../../../components/activityItem/ActivityItem";
import { activities } from "../selectors";
import { getActivities } from "../actions";
import TabView from "../components/TabView";

const ScheduledActivities = ({ activities }) => {
  return (
    <SafeAreaView
      _contentContainerStyle={{
        px: "20px",
        mb: "4",
        minW: "72",
      }}
    >
      <FlatList
        data={activities}
        renderItem={ActivityItem}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
};

const initialRoutes = [
  { key: "first", title: "Scheduled Activities" },
  { key: "second", title: "Completed Activities" },
];

const ActivityListScreen = ({ fetchActivities, activities }) => {
  useEffect(() => {
    fetchActivities();
  }, []);

  const filterActivities = (activities, completed) =>
    activities.filter((activity) => {
      return completed
        ? new Date(activity.endDateTime).getTime() <= new Date().getTime()
        : new Date(activity.endDateTime).getTime() >= new Date().getTime();
    });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ScheduledActivities
            activities={filterActivities(activities, false)}
          />
        );
      case "second":
        return (
          <ScheduledActivities
            activities={filterActivities(activities, true)}
          />
        );
      default:
        return null;
    }
  };

  return <TabView renderScene={renderScene} initialRoutes={initialRoutes} />;
};

const mapStateToProps = (state) => ({
  activities: activities(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchActivities: getActivities,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ActivityListScreen);
