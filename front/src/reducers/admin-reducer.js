const initialState = {
  usersWaiting: [],
  users: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ADMIN_GET_USERS_WAITING' :
    state = {
      ...state,
      usersWaiting: action.payload,
    }
    break;
    case 'ADMIN_GET_USERS' :
    state = {
      ...state, 
      users: action.payload,
    }
    break;
  default :
    return state;
  }
  return state;
}