import { SELECIONAR_ESPACO } from '../actions/espacoAtualActions';

const espacoAtualActions = (state = null, action) => {
  switch (action.type) {
    case SELECIONAR_ESPACO:
      return action.espaco;
    default:
      return state;
  }
};

export default espacoAtualActions;
