import { combineReducers } from 'redux';

import usuarioReducer from './usuarioReducer';
import novoUsuarioFormReducer from './novoUsuarioFormReducer';

export default combineReducers({
  usuario: usuarioReducer,
  novoUsuario: novoUsuarioFormReducer,
});
