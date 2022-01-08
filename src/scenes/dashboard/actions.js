import {createRequestTypes} from '../../utils';
import {addActivityApi, getActivities as getActivitiesApiCall} from '../dashboard/api';
import jwtDecode from 'jwt-decode';

export const GET_ACTIVITIES = createRequestTypes('GET_ACTIVITIES');
export const ADD_ACTIVITY = createRequestTypes('ADD_ACTIVITY');

export const getActivities = () => async dispatch => {
  dispatch({ type: GET_ACTIVITIES.REQUEST });

  try {
    const { data: response } = await getActivitiesApiCall();
    dispatch({ type: GET_ACTIVITIES.SUCCESS, payload: { ...response } })
  } catch (error) {
    dispatch({ type: GET_ACTIVITIES.FAILURE, payload: error });
  }
}

export const addActivity = (activity) => async dispatch => {
  dispatch({type: ADD_ACTIVITY.REQUEST});

  try {
    const {data: response} = await addActivityApi(activity);
    console.log('response from add activity', response);
    dispatch({ type: ADD_ACTIVITY.SUCCESS, payload: { ...response } })
  } catch (error) {
    dispatch({ type: ADD_ACTIVITY.FAILURE, payload: error });
  }
}

