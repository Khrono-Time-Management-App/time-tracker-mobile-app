import {createRequestTypes} from '../../utils';
import {getActivities as getActivitiesApiCall} from '../dashboard/api';
import jwtDecode from 'jwt-decode';

export const GET_ACTIVITIES = createRequestTypes('GET_ACTIVITIES');

export const getActivities = () => async dispatch => {
  dispatch({ type: GET_ACTIVITIES.REQUEST });

  try {
    const { data: response } = await getActivitiesApiCall();


    dispatch({ type: GET_ACTIVITIES.SUCCESS, payload: { ...response } })
  } catch (error) {
    dispatch({ type: GET_ACTIVITIES.FAILURE, payload: error });
  }
}