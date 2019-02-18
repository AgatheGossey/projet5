import React from 'react';
import { connect } from 'react-redux';

// MODALS
import ManageCategories from 'containers/modal/ManageCategoriesContainer';
import AddOperation from 'components/modals/add-operation/AddOperation';
import AddCategory from 'components/modals/add-category/AddCategory';
import LogOut from 'components/modals/log-out/LogOut';
import MessageAfterRegister from 'components/modals/message-after-register/MessageAfterRegister';
import Confirmation from 'components/modals/confirmation/Confirmation';

// ACTIONS
import { hideModal } from 'actions/modal-actions';

// Link modal's name to modal's component
const MODAL_COMPONENTS = {
  'ADD_OPERATION': AddOperation,
  'MANAGE_CATEGORIES': ManageCategories,
  'ADD_CATEGORY': AddCategory,
  'LOG_OUT': LogOut,
  'MESSAGE_AFTER_REGISTER': MessageAfterRegister,
  'CONFIRMATION': Confirmation,
}

const ModalContainer = (props) => {
  const { openedModals } = props;

  // If no modals open
  if (!openedModals) {
    return null;
  }

  // Loop on opened modals -> Get the right component in MODAL_COMPONENTS list -> Display this component with all props
  const modals = openedModals.map((modal, index) => {
    const SpecificModal = MODAL_COMPONENTS[modal.type];
    return <SpecificModal hideModal={ props.hideModal } {...modal.props} key={index} />
  });

  return modals;
}

const mapStateToProps = (state) => {
  return {
    openedModals: state.modal.openedModals,
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    hideModal: (modalType) => {
      dispatch(hideModal(modalType))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);