import { connect } from 'react-redux';
import Budget from 'components/budget/Budget';

// ACTIONS
import { 
  getOperations,
  deleteOperation,
  deleteOperations,
  getCategories,
  deleteCategory,
  toggleFilterByDate,
  toggleFilterByCategory,
  toggleAddCategory,
  handleSelectedCategoryChange,
  handleChangeDate,
  toggleAddRow,
  openManageCategories,
  closeManageCategories,
  openSnackbar,
  closeSnackbar,
} from 'actions/budget-actions';

import { getUsersWaiting } from 'actions/user-actions';

const mapStateToProps = (state) => {
  return {
    operations: state.budget.operations,
    categories: state.budget.categories,
    isFilterByDate: state.budget.isFilterByDate,
    isFilterByCategory: state.budget.isFilterByCategory,
    isAddCategoryOpen: state.budget.isAddCategoryOpen,
    selectedCategory: state.budget.selectedCategory,
    operationsFilteredByCategory: state.budget.operationsFilteredByCategory,
    selectedDateStart: state.budget.selectedDateStart,
    selectedDateEnd: state.budget.selectedDateEnd,
    operationsFilteredByDate: state.budget.operationsFilteredByDate,
    isAddRow: state.budget.isAddRow,
    isManageCategoryOpen: state.budget.isManageCategoryOpen,
    isSnackbarOpen: state.budget.isSnackbarOpen,
    usersWaiting: state.user.usersWaiting,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOperations: () => {
      dispatch(getOperations())
    },   
    deleteOperation: (operationId) => {
      dispatch(deleteOperation(operationId));
    },
    deleteOperations: (operations) => {
      dispatch(deleteOperations(operations));
    },
    getCategories: () => {
      dispatch(getCategories())
    },
    deleteCategory: () => {
      dispatch(deleteCategory());
    },
    toggleFilterByCategory: () => {
      dispatch(toggleFilterByCategory());
    },
    toggleAddCategory: () => {
      dispatch(toggleAddCategory());
    },
    handleSelectedCategoryChange: (operations, category) => {
      dispatch(handleSelectedCategoryChange(operations, category));
    },
    handleChangeDate: (operations, date_budget_start, date_budget_end) => {
      dispatch(handleChangeDate(operations, date_budget_start, date_budget_end));
    },
    openManageCategories: () => {
      dispatch(openManageCategories());
    },
    closeManageCategories: () => {
      dispatch(closeManageCategories());
    },
    toggleFilterByDate: () => {
      dispatch(toggleFilterByDate());
    },
    toggleAddRow: () => {
      dispatch(toggleAddRow());
    },
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