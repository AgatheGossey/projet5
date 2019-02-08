import moment from 'moment';

import { BUDGET_ACTIONS } from 'constants.js';

const initialState = {
  operations: [],
  categories: [],
  isFilterByDate: false,
  isFilterByCategory: false,
  selectedCategory: {},
  operationsFilteredByCategory: [],
  selectedDateStart: moment(),
  selectedDateEnd: moment(),
  operationsFilteredByDate: [],
  isAddRow: false, 
  isAddCategoryOpen: false,
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
    case BUDGET_ACTIONS.handleSelectedCategoryChange:
      state = {
        ...state,
        selectedCategory: action.payload.category,
        operationsFilteredByCategory: action.payload.operations,
      }
    break;
    case BUDGET_ACTIONS.handleChangeDate:
      state = {
        ...state,
        selectedDateStart: action.payload.date_budget_start,
        selectedDateEnd: action.payload.date_budget_end,
        operationsFilteredByDate: action.payload.operations,
      }
    break;
    case BUDGET_ACTIONS.toggleAddCategory:
    state = {
      ...state,
      isAddCategoryOpen: !state.isAddCategoryOpen,
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