import { CREATE_ACCOUNT, LOGIN } from './actions';
import { storeToken } from '../../utils/asyncStorageMethods';

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
      const { exp: expirationTime, token } = action.payload;
      storeToken(token);
      delete action.payload.exp;

      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case CREATE_ACCOUNT.REQUEST:
      return { ...state, loading: true };
    case CREATE_ACCOUNT.SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default userReducer;
