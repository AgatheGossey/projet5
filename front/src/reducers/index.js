import { combineReducers } from 'redux';

// REDUCERS
import sidebarReducer from './menu-reducer'; 
import budgetReducer from './budget-reducer';

export default combineReducers({
  sidebar: sidebarReducer,
  budget: budgetReducer,
})

