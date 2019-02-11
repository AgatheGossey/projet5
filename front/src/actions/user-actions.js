import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { API_HOST, API_ROUTES, USER_ACTIONS, BUDGET_ACTIONS } from 'constants.js';

export const getUsers = () => {
  return async dispatch => {
    const response = await axios.get(API_ROUTES.user);
    dispatch({
      type: USER_ACTIONS.getUsers,
      payload: response.data.result || [],
    })
  }
}

export const getUsersWaiting = () => {
  return async dispatch => {
    const response = await axios.get(`${API_ROUTES.user}/approve`);
    const users = response.data.result || [];

    dispatch({
      type: USER_ACTIONS.getUsersWaiting,
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
    const isUsernameFree = await checkUsername(data.username);

    if (isUsernameFree) {
      await axios.post(API_ROUTES.register, data);
      return dispatch(toggleMessage());
    } else {
      return dispatch({
        type: USER_ACTIONS.registerUsernameError,
        payload: 'Ce pseudo est déjà utilisé.',
      });
    }
  }
}

export const toggleMessage = () => {
  return {
    type: USER_ACTIONS.toggleMessage,
  }
}

export const checkUsername = async (username) => {
  const response = await axios.post(`${API_HOST}/checkUsername`, { username });
  return response.data.isFree;
}

export const deleteUser = (userId) => {
  return async dispatch => {
    await axios.delete(`${API_ROUTES.user}/${userId}`)
    dispatch(getUsers());
    dispatch(getUsersWaiting());
  }
}

export const toggleConfirmationMessage = () => {
  return {
    type: USER_ACTIONS.toggleConfirmationMessage,
  }
}

export const checkUser = (userId) => {
  return async dispatch => {
    await axios.put(`${API_ROUTES.user}/check/${userId}`);
    dispatch(getUsers());
    dispatch(getUsersWaiting());
  }
}

