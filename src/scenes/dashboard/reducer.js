import { ADD_ACTIVITY, GET_ACTIVITIES, GET_ACTIVITIES_REPORT } from './actions';
import { COLORS, icons } from '../../../constants';
import {Categories} from "../../constants/categories";

const INITIAL_STATE = {
  activities: [],
  activitiesReport: [],
  loading: false,
};

const colorsArray = Object.values(COLORS);

const handleCategoryIcon = (category) => {
  switch (category) {
    case Categories.fitness:
      return icons.sports_icon
    case Categories.leisure:
      return icons.healthcare
    case Categories.work:
      return icons.calendar
    case Categories.sleep:
      return icons.baby_car
    case Categories.education:
      return icons.education
    default:
      return icons.food
  }
}

const activitiesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ACTIVITIES.REQUEST:
      return {...state, loading: true}
    case ADD_ACTIVITY.REQUEST:
      return {...state, loading: true}
    case GET_ACTIVITIES_REPORT.REQUEST:
      return {...state, loading: true}

    case GET_ACTIVITIES.SUCCESS:
      const { activityDtoList: newActivities } = action.payload;

      return { ...state, activities: newActivities, loading: false }
    case ADD_ACTIVITY.SUCCESS:

      return { ...state, activities: [...state.activities, action.payload], loading: false }
    case GET_ACTIVITIES_REPORT.SUCCESS:
      const { currentMonth, previousMonth } = action.payload;
      let numberOfCategories = 0;

      const reportsAcc = [ ...currentMonth].reduce((acc, activity) => {
        const accCategoryIndex = acc.findIndex(item => item.name === activity.category);
        if (accCategoryIndex === -1) {
          numberOfCategories++;
          acc.push({
            id: numberOfCategories,
            name: activity.category,
            icon: handleCategoryIcon(activity.category),
            color: colorsArray[numberOfCategories - 1],
            expenses: [
              {
                id: 0,
                title: activity.name,
                description: '',
                startDateTime: new Date(activity.startDateTime).getTime(),
                endDateTime: new Date(activity.endDateTime).getTime(),
                status: 'C'
              }
            ]
          })
        } else {
          acc[accCategoryIndex].expenses.push({
            id: acc[accCategoryIndex].expenses.length,
            title: activity.name,
            description: '',
            startDateTime: activity.startDateTime,
            endDateTime: activity.endDateTime,
            status: 'P'
          })
        }

        return acc;
      }, []);

      return { ...state, activitiesReport: reportsAcc, loading: false }

    case GET_ACTIVITIES.FAILURE:
      return {...state, loading: false}
    case ADD_ACTIVITY.FAILURE:
      return {...state, loading: false}
    case GET_ACTIVITIES_REPORT.FAILURE:
      return {...state, loading: false}

    default:
      return state
  }
};

export default activitiesReducer;
