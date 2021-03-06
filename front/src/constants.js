import moment from 'moment';

export const API_HOST = 'https://projet5.agathegossey.fr/api/public';

export const API_ROUTES = {
  login: '/login',
  register: '/register',
  budget: '/api/budget',
  user: '/api/users',
  category: '/api/category',
}

export const MODAL_ACTIONS = {
  showModal: 'SHOW_MODAL',
  hideModal: 'HIDE_MODAL',
}

export const THEME_ACTIONS = {
  toggleDarkTheme: 'TOGGLE_DARK_THEME',
}

export const BUDGET_ACTIONS = {
  // OPERATIONS
  getOperations: 'BUDGET_GET_OPERATIONS',
  // CATEGORIES
  getCategories: 'BUDGET_GET_CATEGORIES',
  toggleFilterByCategory: 'CATEGORY_FILTER_TOGGLE',
  handleSelectedCategoryChange: 'SELECTED_CATEGORY_CHANGE',
  // DATE
  toggleFilterByDate: 'DATE_FILTER_TOGGLE',
  handleChangeDate: 'HANDLE_CHANGE_DATE',
  // SNACKBAR
  openSnackbar: 'SNACKBAR_OPEN',
  closeSnackbar: 'SNACKBAR_CLOSE',
}

export const LOGIN_ACTIONS = {
  loginSuccess: 'LOGIN_SUCCESS',
  loginError: 'LOGIN_ERROR',
  logout: 'LOGOUT',
  connectionError: 'CONNECTION_ERROR',
}

export const USER_ACTIONS = {
  getUsersWaiting: 'USER_GET_USERS_WAITING',
  getUsers: 'USER_GET_USERS',
  checkUsername: 'CHECK_USERNAME',
  registerUsernameError: 'REGISTER_USERNAME_ERROR',
}

export const MENU_ACTIONS = {
  toggleSideBar: 'SIDEBAR_TOGGLE',
}

export const BUDGET_TABLE_COLUMNS = [
  { title: 'id', field: 'id', hidden: true},
  { 
    title: 'Date',
    field: 'date_budget',
    type: 'numeric',
    // Sort method for Date column
    customSort: (a, b) => moment(a.date_budget) - moment(b.date_budget),
    defaultSort: 'desc',
  },
  { title: 'Nom', field: 'nom'},
  { title: 'Mode', field: 'mode'},
  { title: 'Catégorie', field: 'category'},
  { title: 'Détails', field: 'details'},
  { title: 'Recette', field: 'recette', type: 'numeric'},
  { title: 'Dépense', field: 'depense', type: 'numeric'},
];

export const USERS_TABLE_COLUMNS_WAITING = [
  { title: 'id', field: 'id', hidden: true},
  { title: 'Pseudo', field: 'pseudo'},
  { title: 'Prénom', field: 'prenom'},
  { title: 'Nom', field: 'nom'},
  { title: '', field: 'approuver'},
  { title: '', field: 'supprimer'},
];

export const USERS_TABLE_COLUMNS = [
  { title: 'id', field: 'id', hidden: true},
  { title: 'Pseudo', field: 'pseudo'},
  { title: 'Prénom', field: 'prenom'},
  { title: 'Nom', field: 'nom'},
  { title: '', field: 'supprimer'},
];