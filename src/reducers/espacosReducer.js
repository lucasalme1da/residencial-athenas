import { CRIAR_ESPACO, LISTAR_ESPACOS } from '../actions/espacosActions';

const espacosReducer = (state = [], action) => {
  switch (action.type) {
    case LISTAR_ESPACOS:
      return action.espacos;
    case CRIAR_ESPACO:
      return [...state, action.espaco];
    default:
      return state;
  }
};

export default espacosReducer;
