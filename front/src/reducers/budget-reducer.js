import moment from 'moment';

import { BUDGET_ACTIONS } from 'constants.js';

const initialState = {
  // OPERATIONS
  operations: [],
  // CATEGORIES
  categories: [],
  isFilterByCategory: false,
  selectedCategory: {},
  operationsFilteredByCategory: [],
  // DATE
  isFilterByDate: false,
  selectedDateStart: moment(),
  selectedDateEnd: moment(),
  operationsFilteredByDate: [],
  // SNACKBAR
  isSnackbarOpen: false,
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

    // DATE
    case BUDGET_ACTIONS.toggleFilterByDate:
      state = {
        ...state,
        isFilterByDate: !state.isFilterByDate,
      }
    break;

    // SNACKBAR
    case BUDGET_ACTIONS.openSnackbar:
      state = {
        ...state,
        isSnackbarOpen: true,
      }
    break;
    case BUDGET_ACTIONS.closeSnackbar:

      state = {
        ...state,
        isSnackbarOpen: false,
      }
    break;
    default:
      return state;
  }
  return state;
}