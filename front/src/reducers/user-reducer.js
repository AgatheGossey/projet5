import { USER_ACTIONS } from 'constants.js';

const initialState = {
  usersWaiting: [],
  users: [],
  registerUsernameError: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case  USER_ACTIONS.getUsersWaiting:
      state = {
        ...state,
        usersWaiting: action.payload,
      }
    break;
    case USER_ACTIONS.getUsers:
      state = {
        ...state, 
        users: action.payload,
      }
    break;
    case USER_ACTIONS.registerUsernameError:
      state = {
        ...state,
        registerUsernameError: action.payload,
      }
    break;
    default :
      return state;
  }
  return state;
}