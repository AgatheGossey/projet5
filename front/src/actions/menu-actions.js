import { MENU_ACTIONS } from 'constants.js';

export const toggleSideBar = () => {
  return {
    type: MENU_ACTIONS.toggleSideBar,
  }
};

export const toggleLogOut = () => {
  return {
    type: MENU_ACTIONS.toggleLogOut,
  }
};
