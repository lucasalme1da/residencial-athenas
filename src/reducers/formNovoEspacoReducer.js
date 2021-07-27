import {
  SET_NOVO_ESPACO,
  LIMPAR_NOVO_ESPACO,
} from '../actions/formNovoEspacoActions';

const PLACEHOLDER = {
  fotos: [],
  tipo: 'Área de Churrasco',
  nome: 'Área de Churrasco Principal',
  descricao:
    'Uma área de churrasco completa, com churrasqueira no estilo americana e diversas mesas para se acomodar. Também há uma cozinha completa ao lado para melhor organização.',
  capacidade: '30',
  palavrasChave: ['Churrasqueira americana', '2 WCs', 'Cozinha completa'],
  recursos:
    'Churrasqueira americana, dois banheiros, cozinha completa, espaço bem arejado.',
  funcionamento: 'Das 9h às 22h, todos os dias.',
};

const INITIAL_STATE = {
  fotos: [],
  tipo: '',
  nome: '',
  descricao: '',
  capacidade: '',
  palavrasChave: [],
  recursos: '',
  funcionamento: '',
};

const formNovoEspacoReducer = (state = PLACEHOLDER, action) => {
  switch (action.type) {
    case SET_NOVO_ESPACO:
      return { ...state, [action.campo]: action.valor };
    case LIMPAR_NOVO_ESPACO:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default formNovoEspacoReducer;
