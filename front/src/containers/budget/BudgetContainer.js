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
  handleSelectedCategoryChange,
  handleChangeDate,
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
    selectedCategory: state.budget.selectedCategory,
    operationsFilteredByCategory: state.budget.operationsFilteredByCategory,
    selectedDateStart: state.budget.selectedDateStart,
    selectedDateEnd: state.budget.selectedDateEnd,
    operationsFilteredByDate: state.budget.operationsFilteredByDate,
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
    }
  }
}

const BudgetContainer = connect(mapStateToProps, mapDispatchToProps)(Budget);

export default BudgetContainer;