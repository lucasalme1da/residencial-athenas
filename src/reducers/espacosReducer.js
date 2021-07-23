import {
  CRIAR_ESPACO,
  LISTAR_ESPACOS,
  ATUALIZAR_ESPACO,
  DELETAR_ESPACO,
} from '../actions/espacosActions';

const espacosReducer = (state = [], action) => {
  switch (action.type) {
    case LISTAR_ESPACOS:
      return action.espacos;
    case ATUALIZAR_ESPACO:
      return state.map((espaco) =>
        espaco.id === action.espaco.id ? action.espaco : espaco,
      );
    case DELETAR_ESPACO:
      return state.filter((espaco) => espaco.id !== action.espacoId);
    case CRIAR_ESPACO:
      return [...state, action.espaco];
    default:
      return state;
  }
};

export default espacosReducer;
