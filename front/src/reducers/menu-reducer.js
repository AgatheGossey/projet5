const initialState = {
  open: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SIDEBAR_TOGGLE':
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