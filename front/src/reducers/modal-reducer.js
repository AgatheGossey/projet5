import remove from 'lodash/remove';

const initialState = {
  openedModals: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      const openedModals = [...state.openedModals];

      openedModals.push({ type: action.modalType, props: action.modalProps });
      return {
        openedModals,
      }
    case 'HIDE_MODAL':
      const newOpenedModals = [...state.openedModals];
      remove(newOpenedModals, (modal) => modal.type === action.modalType);
      return {
        ...state,
        openedModals: newOpenedModals,
      };
    default:
      return state
  }
}