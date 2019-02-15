import { LOGIN_ACTIONS } from 'constants.js';

const user = JSON.parse(localStorage.getItem('user')); // transform user to Javascript object

const initialState = {
  user: user || {},
  connectionError: '', 
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_ACTIONS.loginSuccess:
      state = {
        ...state,
        user: action.payload.user,
      }
    break;
    case LOGIN_ACTIONS.logout:
      state = {
        ...state,
        user: {},
      }
    break;
    default:
      return state;
    case LOGIN_ACTIONS.connectionError:
      state = {
        ...state, 
        connectionError: action.payload,
      }
    break;
  }
  return state;
}
