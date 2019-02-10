import { LOGIN_ACTIONS } from 'constants.js';

const user = localStorage.getItem('user');

const initialState = {
  user: user || {},
  isLoggedIn: user ? true : false,  
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_ACTIONS.loginSuccess:
      state = {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
      }
    break;
    case LOGIN_ACTIONS.logout:
      state = {
        ...state,
        user: {},
        isLoggedIn: false,
      }
    break;
    default:
      return state;
  }
  return state;
}
