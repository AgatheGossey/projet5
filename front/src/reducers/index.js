import { createStore } from "redux";

const reducer = (state = { open: false }, action) => {
  switch (action.type) {
    case 'OPEN_SIDE_BAR':
      state = state + action.value;
      break;
    default:
    return state; 
  }
}

const store = createStore(reducer);

store.subscribe(() => {
  console.log("Store updated", store.getState());
})
store.dispatch({ 
  type: "OPEN_SIDE_BAR"
});

