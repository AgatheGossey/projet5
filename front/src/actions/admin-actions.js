import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { API_HOST, ADMIN_ACTIONS, BUDGET_ACTIONS } from 'constants.js';

export const getUsers = () => {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/users`);
    dispatch({
      type: ADMIN_ACTIONS.getUsers,
      payload: response.data.result || [],
    })
  }
}

export const getUsersWaiting = () => {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/users/approve`);
    const users = response.data.result || [];

    dispatch({
      type: ADMIN_ACTIONS.getUsersWaiting,
      payload: users,
    })

    if (!isEmpty(users)) {
      dispatch({
        type: BUDGET_ACTIONS.openSnackbar,
      })
    } else {
      dispatch({
        type: BUDGET_ACTIONS.closeSnackbar,
      })
    }
  }
}

export const createUser = (data) => {
  return async dispatch => {
    await axios.post('http://localhost/my_manager/api/users', data)
  }
}

export const deleteUser = (userId) => {
  return async dispatch => {
    await axios.delete(`${API_HOST}/users/${userId}`)
    dispatch(getUsers());
    dispatch(getUsersWaiting());
  }
}

export const checkUser = (userId) => {
  return async dispatch => {
    await axios.put(`${API_HOST}/users/check/${userId}`);
    dispatch(getUsers());
    dispatch(getUsersWaiting());
  }
}

export const toggleMessage = () => {
  return {
    type: ADMIN_ACTIONS.toggleMessage,
  }
}