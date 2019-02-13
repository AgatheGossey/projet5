import request from 'utils/request';
import { history } from 'App.js';

// CONSTANTS
import { API_ROUTES, LOGIN_ACTIONS } from 'constants.js';

export const login = (data) => {
  return async dispatch => {
    
    const response = await request.post(API_ROUTES.login, data);
    
    if (response.data.user && response.data.token && parseInt(response.data.user.approved, 10) === 1) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      await dispatch({
        type: LOGIN_ACTIONS.loginSuccess,
        payload: {
          user: response.data.user,
        },
      })
      history.push('/');
    } else {
      return dispatch({
        type: LOGIN_ACTIONS.connectionError,
        payload: 'Mauvais pseudo/mot de passe',
      });
    }
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({
      type: LOGIN_ACTIONS.logout,
    })

    history.push('/login');
  }
}