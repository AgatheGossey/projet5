import { combineReducers } from 'redux';

// REDUCERS
import sidebarReducer from './menu-reducer'; 
import budgetReducer from './budget-reducer';
import adminReducer from './admin-reducer';

export default combineReducers({
  sidebar: sidebarReducer,
  budget: budgetReducer,
  admin: adminReducer,
})

