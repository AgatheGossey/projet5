const initialState = {
  operations: [],
  categories: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'BUDGET_GET_OPERATIONS':
      state = {
        ...state,
        operations: action.payload,
      }
      break;
      case 'BUDGET_GET_CATEGORIES' :
      state = {
        ...state,
        categories: action.payload,
      }
      break;
    default:
      return state;
  }
  return state;
}