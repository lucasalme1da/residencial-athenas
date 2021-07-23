import {
  SELECIONAR_ESPACO,
  SET_ESPACO_ATUAL,
} from '../actions/espacoAtualActions';

const espacoAtualActions = (state = null, action) => {
  switch (action.type) {
    case SELECIONAR_ESPACO:
      return action.espaco;
    case SET_ESPACO_ATUAL:
      return { ...state, [action.campo]: action.valor };
    default:
      return state;
  }
};

export default espacoAtualActions;
