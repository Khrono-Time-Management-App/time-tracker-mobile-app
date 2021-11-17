import { createRequestTypes } from '../../utils';
import { loginApiCall, createAccountApiCall } from './api';
import jwtDecode from 'jwt-decode';

export const LOGIN = createRequestTypes('LOGIN');
export const CREATE_ACCOUNT = createRequestTypes('CREATE_ACCOUNT');

export const login = (email, password) => async dispatch => {
    dispatch({ type: LOGIN.REQUEST });

    try {
      const { data: userToken } = await loginApiCall({ email, password });
      const userData = jwtDecode(userToken);

      dispatch({ type: LOGIN.SUCCESS, payload: { ...userData, token: userToken } })
    } catch (error) {
      dispatch({ type: LOGIN.FAILURE, payload: error });
    }
}

export const createAccount = (credentials) => async dispatch => {
  dispatch({ type: CREATE_ACCOUNT.REQUEST });

  try {
    const { data: userData } = await createAccountApiCall(credentials);

    dispatch({ type: CREATE_ACCOUNT.SUCCESS, payload: userData })
  } catch (error) {
    dispatch({ type: CREATE_ACCOUNT.FAILURE, payload: error });
  }
}
