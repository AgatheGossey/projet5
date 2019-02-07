import { MENU_ACTIONS } from 'constants.js';

export const toggleSideBar = () => {
  return {
    type: MENU_ACTIONS.toggleSideBar,
  }
};

export const toggleSignOut = () => {
  return {
    type: MENU_ACTIONS.toggleSignOut,
  }
};
