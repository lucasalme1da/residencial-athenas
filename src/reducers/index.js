import { combineReducers } from 'redux';

import formNovoEspacoReducer from './formNovoEspacoReducer';
import formCadastroReducer from './formCadastroReducer';
import usuarioReducer from './usuarioReducer';
import espacoAtualReducer from './espacoAtualReducer';
import espacosReducer from './espacosReducer';
import reservasReducer from './reservasReducer';

export default combineReducers({
  formCadastro: formCadastroReducer,
  formNovoEspaco: formNovoEspacoReducer,
  // administrador: administradorReducer,
  reservas: reservasReducer,
  espacoAtual: espacoAtualReducer,
  espacos: espacosReducer,
  usuario: usuarioReducer,
});
