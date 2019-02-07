import { MENU_ACTIONS } from 'constants.js';

const initialState = {
  open: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case MENU_ACTIONS.toggleSideBar:
      state = {
        ...state,
        open: !state.open,
      };
    break;
    default:
      return state;
  }
  return state;
}