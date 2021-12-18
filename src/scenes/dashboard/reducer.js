import {GET_ACTIVITIES} from './actions';

const INITIAL_STATE = {
  activities: {},
  loading: false,
};

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES.REQUEST:
      return {...state, loading: true}
    case GET_ACTIVITIES.SUCCESS:
      return {activities: action.payload.activities, loading: false}
    case GET_ACTIVITIES.FAILURE:
      return {...state, loading: false}
    default:
      return state
  }
}

export default activitiesReducer;