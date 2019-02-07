import axios from 'axios';
import { API_HOST, ADMIN_ACTIONS } from 'constants.js';

export const getUsersWaiting = () => {
  return async dispatch  => {
    const response = await axios.get(`${API_HOST}/users/approve`);
    dispatch({
      type: ADMIN_ACTIONS.getUsersWaiting,
      payload: response.data.result || [],
    })
  }
}

export const getUsers = () => {
  return async dispatch => {
    const response = await axios.get(`${API_HOST}/users`);
    dispatch({
      type: ADMIN_ACTIONS.getUsers,
      payload: response.data.result || [],
    })
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