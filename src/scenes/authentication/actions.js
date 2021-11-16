import { createRequestTypes } from '../../utils';
import { loginApiCall } from './api';


export const LOGIN = createRequestTypes('LOGIN');

export const login = (email, password) => async dispatch => {
    dispatch({ type: LOGIN.REQUEST });

    try {
      const userToken = await loginApiCall({ email, password });

      dispatch({ type: LOGIN.SUCCESS, payload: userToken })
    } catch (error) {
      dispatch({ type: LOGIN.FAILURE, payload: error });
    }
}
