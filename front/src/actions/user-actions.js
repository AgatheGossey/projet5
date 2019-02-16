import request from 'utils/request';
import isEmpty from 'lodash/isEmpty';
import { API_ROUTES, USER_ACTIONS, BUDGET_ACTIONS, MODAL_ACTIONS } from 'constants.js';

export const getUsers = () => {
  return async dispatch => {
    const response = await request.get(API_ROUTES.user);
    dispatch({
      type: USER_ACTIONS.getUsers,
      payload: response.data.result || [],
    })
  }
}

export const getUsersWaiting = () => {
  return async dispatch => {
    const response = await request.get(`${API_ROUTES.user}/approve`);
    const users = response.data.result || [];
    dispatch({
      type: USER_ACTIONS.getUsersWaiting,
      payload: users,
    })
    // display a notification only if the users array are not empty
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
    // check that the username is available before validating it
    if (isUsernameFree) {
      await request.post(API_ROUTES.register, data);
      return dispatch({
        type: MODAL_ACTIONS.showModal,
        modalType: 'MESSAGE_AFTER_REGISTER',
        modalProps: {
          hideModal: () => dispatch({ type: MODAL_ACTIONS.hideModal, modalType: 'MESSAGE_AFTER_REGISTER' }) 
        },
      });
    } else {
      return dispatch({
        type: USER_ACTIONS.registerUsernameError,
        payload: 'Ce pseudo est déjà utilisé.',
      });
    }
  }
}

export const checkUsername = async (username) => {
  const response = await request.post('/checkUsername', { username });
  return response.data.isFree;
}

export const deleteUser = (userId) => {
  return async dispatch => {
    await request.delete(`${API_ROUTES.user}/${userId}`)
    dispatch(getUsers());
    dispatch(getUsersWaiting());
  }
}

export const checkUser = (userId) => {
  return async dispatch => {
    await request.put(`${API_ROUTES.user}/check/${userId}`);
    dispatch(getUsers());
    dispatch(getUsersWaiting());
  }
}

