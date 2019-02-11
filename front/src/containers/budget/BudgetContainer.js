import { connect } from 'react-redux';
import Budget from 'components/budget/Budget';

// ACTIONS
import { 
  // operations
  getOperations,
  deleteOperation,
  deleteOperations,
  // categories
  getCategories,
  deleteCategory,
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

const mapStateToProps = (state) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    // operations
    getOperations: () => {
      dispatch(getOperations())
    },   
    deleteOperation: (operationId) => {
      dispatch(deleteOperation(operationId));
    },
    deleteOperations: (operations) => {
      dispatch(deleteOperations(operations));
    },
    // categories
    getCategories: () => {
      dispatch(getCategories())
    },
    deleteCategory: () => {
      dispatch(deleteCategory());
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