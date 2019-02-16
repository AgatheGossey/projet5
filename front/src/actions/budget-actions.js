import request from 'utils/request';
import moment from 'moment';

// CONSTANTS
import { API_ROUTES, BUDGET_ACTIONS } from 'constants.js';

// OPERATIONS
export const getOperations = () => {
  return async dispatch => {
    const response = await request.get(API_ROUTES.budget);
    return dispatch({
      type: BUDGET_ACTIONS.getOperations,
      payload: response.data.result || [],
    })
  }
}

export const addOperation = (data) => {
  return async dispatch => {
    await request.post(API_ROUTES.budget, data);
    return dispatch(getOperations());
  }
}

export const deleteOperation = (operationId) => {
  return async dispatch => {
    await request.delete(`${API_ROUTES.budget}/${operationId}`);
    dispatch(getOperations());
  }
}

export const deleteOperations = (operations) => {
  return async dispatch => {
    const promises = [];
    operations.map((operation) => {
      return promises.push(request.delete(`${API_ROUTES.budget}/${operation.id}`));
    }); 
    await Promise.all(promises); // wait until all the promises inside the array are closed 
    dispatch(getOperations());
  }
}

// CATEGORIES
export const getCategories = () => {
  return async dispatch => {
    const response = await request.get(API_ROUTES.category);
    return dispatch({
      type: BUDGET_ACTIONS.getCategories,
      payload: response.data.result || [],
    })
  }
}

export const editCategory = (id, data) => {
  return async dispatch => {
    await request.put(`${API_ROUTES.category}/${id}`, data);
    return dispatch(getCategories());
  }
}

export const addCategory = (data) => {
  return async dispatch => {
    await request.post(API_ROUTES.category, data);
    return dispatch(getCategories());
  }
}

export const deleteCategory = (id) => {
  return async dispatch => {
    await request.delete(`${API_ROUTES.category}/${id}`);
    await dispatch(getCategories());
  }
}

// filter by category
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

// DATE
export const toggleFilterByDate = () => {
  return {
    type: BUDGET_ACTIONS.toggleFilterByDate,
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

// SNACKBAR
export const openSnackbar = () => {
  return {
    type: BUDGET_ACTIONS.openSnackbar,
  }
}

export const closeSnackbar = (reason) => {
  if (reason === 'clickaway') {
    return;
  }
  return {
    type: BUDGET_ACTIONS.closeSnackbar,
  }
}