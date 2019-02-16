// CONSTANTS
import { MODAL_ACTIONS } from 'constants.js';

export const showModal = (modalType, modalProps = {}) => {
  return dispatch => {
    dispatch({
      type: MODAL_ACTIONS.showModal,
      modalType,
      modalProps,
    })
  }
}

export const hideModal = (modalType) => {
  return dispatch => {
    dispatch({
      type: MODAL_ACTIONS.hideModal,
      modalType,
    })
  }
}

