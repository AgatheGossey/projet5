import axios from 'axios';
import moment from 'moment';

// CONSTANTS
import { API_HOST, BUDGET_ACTIONS } from 'constants.js';

// OPERATIONS
export const getOperations = () => {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/budget`);
    dispatch({
      type: BUDGET_ACTIONS.getOperations,
      payload: response.data.result || [],
    })
  }
}

export const deleteOperation = (operationId) => {
  return async dispatch => {
    await axios.delete(`${API_HOST}/budget/${operationId}`);
    dispatch(getOperations());
  }
}

export const deleteOperations = (operations) => {
  return async dispatch => {
    const promises = [];
    operations.map((operation) => {
      return promises.push(axios.delete(`${API_HOST}/budget/${operation.id}`));
    }); 
    await Promise.all(promises);
    dispatch(getOperations());
  }
}

// CATEGORIES
export const getCategories = () => {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/category`);
    dispatch({
      type: BUDGET_ACTIONS.getCategories,
      payload: response.data.result,
    })
  }
}

export const toggleFilterByCategory = () => {
  return {
    type: BUDGET_ACTIONS.toggleFilterByCategory,
  }
}

export const handleSelectedCategoryChange = (operations, category) => {
  const list = [];
  operations.forEach(operation => {
    if (operation.category === category.id) {
      list.push(operation);
    }
  })
  return dispatch => {
    dispatch({
      type: BUDGET_ACTIONS.handleSelectedCategoryChange,
      payload: {
        category,
        operations: list,
      }
    })
  }
}

export const handleChangeDate = (operations, date_budget_start, date_budget_end) => {
  const list = [];
  operations.forEach(operation => {
    if (moment(operation.date_budget).isBetween(date_budget_start, date_budget_end)) {
      list.push(operation);
    }
  })
  return dispatch => {
    dispatch({
      type: BUDGET_ACTIONS.handleChangeDate,
      payload: {
        date_budget_start,
        date_budget_end,
        operations: list, 
      }
    })
  }
} 

export const toggleAddCategory = () => {
  return {
    type: BUDGET_ACTIONS.toggleAddCategory,
  }
}

export const openManageCategories = () => {
  return async dispatch => {
    await dispatch(getCategories());
    dispatch({
      type: BUDGET_ACTIONS.openManageCategories,
    })
  }
}

export const closeManageCategories = () => {
  return async dispatch => {
    await dispatch(getOperations());
    dispatch({
      type: BUDGET_ACTIONS.closeManageCategories,
    })
  }
}

// DATE
export const toggleFilterByDate = () => {
  return {
    type: BUDGET_ACTIONS.toggleFilterByDate,
  }
}

// ROW
export const toggleAddRow = () => {
  return {
    type: BUDGET_ACTIONS.toggleAddRow,
  }
}