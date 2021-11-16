import { LOGIN } from './actions';

const INITIAL_STATE = {
  user: {},
  loading: false,
  isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  let user = {};

  switch (action.type) {
    case LOGIN.REQUEST:
      return { ...state, loading: true };
    case LOGIN.SUCCESS:
      return { ...state, isAuthenticated: true }
    default:
      return state;
  }
}

export default userReducer;
