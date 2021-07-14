import {
  USUARIO_LOGIN_BEM_SUCEDIDO,
  USUARIO_LOGOUT,
} from '../actions/usuarioActions';

const usuarioReducer = (state = null, action) => {
  switch (action.type) {
    case USUARIO_LOGIN_BEM_SUCEDIDO:
      return action.usuario;
    case USUARIO_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default usuarioReducer;
