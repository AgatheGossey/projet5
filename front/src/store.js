import { createStore, compose, applyMiddleware } from 'redux';
// Import thunk to enable async actions in Redux
import thunk from 'redux-thunk';
import reducer from './reducers';

// Enable browser Redux dev tools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk)),
);