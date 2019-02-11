import { MENU_ACTIONS } from 'constants.js';

const initialState = {
  open: false,
  isLogOutOpen: false, 
}

export default (state = initialState, action) => {
  switch(action.type) {
    case MENU_ACTIONS.toggleSideBar:
      state = {
        ...state,
        open: !state.open,
      };
    break;
    case MENU_ACTIONS.toggleLogOut:
      state = {
        ...state,
        isLogOutOpen: !state.isLogOutOpen,
      }
    break;
    default:
      return state;
  }
  return state;
}