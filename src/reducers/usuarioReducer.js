import {
  USUARIO_LOGIN_BEM_SUCEDIDO,
  USUARIO_LOGOUT,
  SET_NOVO_USUARIO,
} from '../actions/usuarioActions';

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

const usuarioReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USUARIO_LOGIN_BEM_SUCEDIDO:
      return action.usuario;
    case USUARIO_LOGOUT:
      return null;
    case SET_NOVO_USUARIO:
      return { ...state, [action.campo]: action.valor };
    default:
      return state;
  }
};

export default usuarioReducer;
