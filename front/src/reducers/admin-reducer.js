import { ADMIN_ACTIONS } from 'constants.js';

const initialState = {
  usersWaiting: [],
  users: [],
  isMessageOpen: false,
  registerUsernameError: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case  ADMIN_ACTIONS.getUsersWaiting:
      state = {
        ...state,
        usersWaiting: action.payload,
      }
    break;
    case ADMIN_ACTIONS.getUsers:
      state = {
        ...state, 
        users: action.payload,
      }
    break;
    case ADMIN_ACTIONS.toggleMessage:
      state = {
        ...state, 
        isMessageOpen: !state.isMessageOpen,
      }
    break;
    case ADMIN_ACTIONS.registerUsernameError:
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