import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ActivityListScreen = ({}) => {


  return (
    <View>
      <Text>
        ActivityList Screen
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActivityListScreen);
