import { combineReducers } from 'redux';

// REDUCERS
import menuReducer from './menu-reducer'; 
import budgetReducer from './budget-reducer';
import adminReducer from './admin-reducer';

export default combineReducers({
  menu: menuReducer,
  budget: budgetReducer,
  admin: adminReducer,
})

