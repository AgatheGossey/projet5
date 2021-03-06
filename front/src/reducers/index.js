import { combineReducers } from 'redux'; // for split the reducing function into separate functions, each managing independent parts of the state

// REDUCERS
import menuReducer from './menu-reducer'; 
import budgetReducer from './budget-reducer';
import userReducer from './user-reducer';
import loginReducer from './login-reducer';
import modalReducer from './modal-reducer';
import themeReducer from './theme-reducer';

export default combineReducers({
  menu: menuReducer,
  budget: budgetReducer,
  user: userReducer,
  login: loginReducer,
  modal: modalReducer,
  theme: themeReducer,
})

