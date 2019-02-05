import { connect } from 'react-redux';

import Budget from 'components/budget/Budget';

// ACTIONS
import { 
  getOperations,
  deleteOperation,
  deleteOperations,
  getCategories,
  toggleFilterByDate,
  toggleFilterByCategory,
  toggleAddRow,
  openManageCategories,
  closeManageCategories,
} from 'actions/budget-actions';

const mapStateToProps = (state) => {
  return {
    operations: state.budget.operations,
    categories: state.budget.categories,
    isFilterByDate: state.budget.isFilterByDate,
    isFilterByCategory: state.budget.isFilterByCategory,
    isAddRow: state.budget.isAddRow,
    isManageCategoryOpen: state.budget.isManageCategoryOpen,
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
    toggleFilterByCategory: () => {
      dispatch(toggleFilterByCategory());
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
    }
  }
}

const BudgetContainer = connect(mapStateToProps, mapDispatchToProps)(Budget);

export default BudgetContainer;