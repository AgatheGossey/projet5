export const API_HOST = 'http://localhost/my_manager/api';

export const BUDGET_TABLE_COLUMNS = [
  { title: 'id', field: 'id', hidden: true},
  { title: 'Date', field: 'date_budget', type: 'numeric'},
  { title: 'Nom', field: 'nom'},
  { title: 'Mode', field: 'mode'},
  { title: 'Catégorie', field: 'category'},
  { title: 'Motif', field: 'motif'},
  { title: 'Recette', field: 'recette', type: 'numeric'},
  { title: 'Dépense', field: 'depense', type: 'numeric'},
];