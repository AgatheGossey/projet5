import { BUDGET_ACTIONS } from 'constants.js';

const initialState = {
  operations: [],
  categories: [],
  isFilterByDate: false,
  isFilterByCategory: false,
  isAddRow: false, 
  isAddCategory: false,
  isManageCategoryOpen: false,
}

export default (state = initialState, action) => {
  switch(action.type) {

    // OPERATIONS
    case BUDGET_ACTIONS.getOperations:
      state = {
        ...state,
        operations: action.payload,
      }
    break;

    // CATEGORIES
    case BUDGET_ACTIONS.getCategories:
      state = {
        ...state,
        categories: action.payload,
      }
    break;
    case BUDGET_ACTIONS.toggleFilterByCategory:
      state = {
        ...state,
        isFilterByCategory: !state.isFilterByCategory,
      }
    break;
    case BUDGET_ACTIONS.toggleAddCategory:
    state = {
      ...state,
      isAddCategory: !state.isAddCategory,
    }
    break;
    case BUDGET_ACTIONS.openManageCategories:
    state = {
      ...state,
      isManageCategoryOpen: true,
    }
    break;
    case BUDGET_ACTIONS.closeManageCategories:
      state = {
        ...state,
        isManageCategoryOpen: false,
      }
    break;

    // DATE
    case BUDGET_ACTIONS.toggleFilterByDate:
      state = {
        ...state,
        isFilterByDate: !state.isFilterByDate,
      }
    break;
    
    // ROW
    case BUDGET_ACTIONS.toggleAddRow:
      state = {
        ...state,
        isAddRow: !state.isAddRow,
      }
    break;

    
    default:
      return state;
  }
  return state;
}