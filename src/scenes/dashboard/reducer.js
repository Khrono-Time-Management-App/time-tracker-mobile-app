import {ADD_ACTIVITY, GET_ACTIVITIES} from './actions';
import {activities} from './selectors';

const INITIAL_STATE = {
  activities: [],
  loading: false,
};

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES.REQUEST:
      return {...state, loading: true}
    case ADD_ACTIVITY.REQUEST:
      return {...state, loading: true}

    case GET_ACTIVITIES.SUCCESS:
      const { activityDtoList: newActivities } = action.payload;

      return { ...state, activities: newActivities, loading: false }
    case ADD_ACTIVITY.SUCCESS:

      return { ...state, activities: [...state.activities, action.payload], loading: false }

    case GET_ACTIVITIES.FAILURE:
      return {...state, loading: false}
    case ADD_ACTIVITY.FAILURE:
      return {...state, loading: false}

    default:
      return state
  }
};

export default activitiesReducer;
