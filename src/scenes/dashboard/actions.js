import { createRequestTypes } from '../../utils';
import {
  addActivityApi,
  getActivities as getActivitiesApiCall,
  getActivitiesReport as getActivitiesReportApiCall
} from '../dashboard/api';

export const GET_ACTIVITIES = createRequestTypes('GET_ACTIVITIES');
export const ADD_ACTIVITY = createRequestTypes('ADD_ACTIVITY');
export const GET_ACTIVITIES_REPORT = createRequestTypes('GET_ACTIVITIES_REPORT');

export const getActivities = () => async dispatch => {
  dispatch({ type: GET_ACTIVITIES.REQUEST });

  try {
    const { data: response } = await getActivitiesApiCall();
    console.log('response ------------------->> ', response);
    dispatch({ type: GET_ACTIVITIES.SUCCESS, payload: { ...response } });
  } catch (error) {
    dispatch({ type: GET_ACTIVITIES.FAILURE, payload: error });
  }
};

export const addActivity = (activity) => async dispatch => {
  dispatch({ type: ADD_ACTIVITY.REQUEST });

  try {
    const { data: response } = await addActivityApi(activity);
    console.log('response from add activity', response);
    dispatch({ type: ADD_ACTIVITY.SUCCESS, payload: { ...response } });
  } catch (error) {
    dispatch({ type: ADD_ACTIVITY.FAILURE, payload: error });
  }
};

export const getActivitiesReport = () => async dispatch => {
  dispatch({ type: GET_ACTIVITIES_REPORT.REQUEST });

  try {
    const response = await getActivitiesReportApiCall();
    console.log('response from activity report', response);
    dispatch({ type: GET_ACTIVITIES_REPORT.SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ACTIVITIES_REPORT.FAILURE, payload: error });
  }
};

