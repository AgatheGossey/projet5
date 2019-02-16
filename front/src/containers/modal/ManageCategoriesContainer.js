import { connect } from 'react-redux'; // connecter the props of the react component to a redux store

import ManageCategories from 'components/modals/manage-categories/ManageCategories';

// ACTIONS
import { 
  getOperations,
  getCategories,
  deleteCategory,
  addCategory,
  editCategory,
} from 'actions/budget-actions';

import { showModal, hideModal } from 'actions/modal-actions';

const mapStateToProps = (state) => {
  return {
    categories: state.budget.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOperations: () => {
      dispatch(getOperations());
    },
    getCategories: () => {
      dispatch(getCategories());
    },
    addCategory: async (data) => {
      await dispatch(addCategory(data));
    },
    editCategory: async (id, data) => {
      await dispatch(editCategory(id, data));
    },
    deleteCategory: (id) => {
      dispatch(deleteCategory(id));
    },
    showModal: (modalType, modalProps) => {
      dispatch(showModal(modalType, modalProps));
    },
    hideModal: (modalType) => {
      dispatch(hideModal(modalType));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategories);