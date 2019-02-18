// CONSTANTS
import { THEME_ACTIONS } from 'constants.js';

const initialState = {
  isDarkThemeEnable: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case THEME_ACTIONS.toggleDarkTheme:
      state = {
        ...state,
        isDarkThemeEnable: !state.isDarkThemeEnable,
      };
    break;
    default:
      return state;
  }
  return state;
}