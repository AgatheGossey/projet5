import { MENU_ACTIONS } from 'constants.js';

const initialState = {
  open: false,
  isSignOutOpen: false, 
}

export default (state = initialState, action) => {
  switch(action.type) {
    case MENU_ACTIONS.toggleSideBar:
      state = {
        ...state,
        open: !state.open,
      };
    break;
    case MENU_ACTIONS.toggleSignOut:
      state = {
        ...state,
        isSignOutOpen: !state.isSignOutOpen,
      }
    break;
    default:
      return state;
  }
  return state;
}