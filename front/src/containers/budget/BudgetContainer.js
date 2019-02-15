import { connect } from 'react-redux'; // connecter the props of the react component to a redux store
import Budget from 'components/budget/Budget';

// ACTIONS
import { 
  // operations
  getOperations,
  addOperation,
  deleteOperation,
  deleteOperations,
  // categories
  getCategories,
  deleteCategory,
  addCategory,
  editCategory,
  toggleFilterByCategory,
  handleSelectedCategoryChange,
  openManageCategories,
  closeManageCategories,
  toggleAddCategory,
  // date
  toggleFilterByDate,
  handleChangeDate,
  // row
  toggleAddRow,
  // snackbar
  openSnackbar,
  closeSnackbar,
} from 'actions/budget-actions';

import { getUsersWaiting } from 'actions/user-actions';

const mapStateToProps = (state) => { // this function tells your component what props will be added
  return {
    // operations
    operations: state.budget.operations,
    // categories
    categories: state.budget.categories,
    selectedCategory: state.budget.selectedCategory,
    isFilterByCategory: state.budget.isFilterByCategory,
    operationsFilteredByCategory: state.budget.operationsFilteredByCategory,
    isManageCategoryOpen: state.budget.isManageCategoryOpen,
    isAddCategoryOpen: state.budget.isAddCategoryOpen,
    // date
    isFilterByDate: state.budget.isFilterByDate,
    operationsFilteredByDate: state.budget.operationsFilteredByDate,
    selectedDateStart: state.budget.selectedDateStart,
    selectedDateEnd: state.budget.selectedDateEnd,
    // row
    isAddRow: state.budget.isAddRow,
    // snackbar
    isSnackbarOpen: state.budget.isSnackbarOpen,
    usersWaiting: state.user.usersWaiting,
    userIsAdmin: parseInt(state.login.user.status, 10) === 1, 
  }
}

const mapDispatchToProps = (dispatch) => { // a props object that contains action dispatchers
  return {
    // operations
    getOperations: () => {
      dispatch(getOperations())
    },    
    addOperation: async (data) => {
      await dispatch(addOperation(data));
    },
    deleteOperation: (operationId) => {
      dispatch(deleteOperation(operationId));
    },
    deleteOperations: (operations) => {
      dispatch(deleteOperations(operations));
    },
    // categories
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
    toggleFilterByCategory: () => {
      dispatch(toggleFilterByCategory());
    },
    handleSelectedCategoryChange: (operations, category) => {
      dispatch(handleSelectedCategoryChange(operations, category));
    },    
    openManageCategories: () => {
      dispatch(openManageCategories());
    },
    closeManageCategories: () => {
      dispatch(closeManageCategories());
    },
    toggleAddCategory: () => {
      dispatch(toggleAddCategory());
    },
    // date
    toggleFilterByDate: () => {
      dispatch(toggleFilterByDate());
    },
    handleChangeDate: (operations, date_budget_start, date_budget_end) => {
      dispatch(handleChangeDate(operations, date_budget_start, date_budget_end));
    },
    // row
    toggleAddRow: () => {
      dispatch(toggleAddRow());
    },
    // snackbar
    openSnackbar: () => {
      dispatch(openSnackbar());
    },
    closeSnackbar: () => {
      dispatch(closeSnackbar());
    },
    getUsersWaiting: () => {
      dispatch(getUsersWaiting());
    },
  }
}

const BudgetContainer = connect(mapStateToProps, mapDispatchToProps)(Budget);

export default BudgetContainer; 