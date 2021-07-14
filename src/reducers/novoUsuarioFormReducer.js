import { SET_NOVO_USUARIO } from '../actions/novoUsuarioFormActions';

const INITIAL_STATE = {
  nomeCompleto: '',
  predio: '',
  apartamento: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  checkbox: false,
  avatar: null,
};

const novoUsuarioFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOVO_USUARIO:
      return { ...state, [action.campo]: action.valor };
    default:
      return state;
  }
};

export default novoUsuarioFormReducer;
