import request from 'utils/request';
import { history } from 'App.js';

// CONSTANTS
import { API_ROUTES, LOGIN_ACTIONS } from 'constants.js';

export const login = (data) => {
  return async dispatch => {
    const response = await request.post(API_ROUTES.login, data);
    
    if (response.data.user && response.data.token && parseInt(response.data.user.approved, 10) === 1) { // parses a string argument and returns an integer of the specified radix 
      localStorage.setItem('token', response.data.token); // add that key to the given Storage object
      localStorage.setItem('user', JSON.stringify(response.data.user));
      await dispatch({
        type: LOGIN_ACTIONS.loginSuccess,
        payload: {
          user: response.data.user,
        },
      })
      history.push('/');  // push a new entry onto the history stack
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
    localStorage.removeItem('token'); // remove that key to the given Storage object
    localStorage.removeItem('user');
    dispatch({
      type: LOGIN_ACTIONS.logout,
    })
    history.push('/login'); 
  }
}