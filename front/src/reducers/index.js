import { combineReducers } from 'redux';

// REDUCERS
import menuReducer from './menu-reducer'; 
import budgetReducer from './budget-reducer';
import userReducer from './user-reducer';
import loginReducer from './login-reducer';

export default combineReducers({
  menu: menuReducer,
  budget: budgetReducer,
  user: userReducer,
  login: loginReducer,
})

