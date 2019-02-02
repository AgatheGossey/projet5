import axios from 'axios';
import { API_HOST } from 'constants.js';

export function getOperations() {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/budget`);
    dispatch({
      type: 'BUDGET_GET_OPERATIONS',
      payload: response.data.result || [],
    })
  }
}

export function deleteOperation(operationId) {
  return async dispatch => {
    await axios.delete(`${API_HOST}/budget/${operationId}`);
    dispatch(getOperations());
  }
}

export function getCategories() {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/category`);

    dispatch({
      type: 'BUDGET_GET_CATEGORIES',
      payload: response.data.result,
    })
  }
}