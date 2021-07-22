import {
  SET_NOVO_ESPACO,
  LIMPAR_NOVO_ESPACO,
} from '../actions/formNovoEspacoActions';

const PLACEHOLDER = {
  fotos: [
    'https://media-cdn.tripadvisor.com/media/photo-s/06/ff/da/e8/chales-pedra-do-bau.jpg',
    'https://media-cdn.tripadvisor.com/media/photo-s/02/24/d4/9b/grunwald-chales.jpg',
    'https://a0.muscache.com/im/pictures/6173899e-8b40-448d-8222-1925a54c9960.jpg?im_w=720',
  ],
  tipo: 'Chalé Completo',
  nome: 'Chalé Olympus',
  descricao:
    'Um chalé aconchegante, com tudo o que você precisa para ter uma experiência diferente aqui no Athenas. Ideal para festas sociais, aniversários, reuniões de empresa ou outros eventos relacionados.',
  capacidade: '30',
  palavrasChave: ['Chalé', 'Olympus', 'Ar-condicionado'],
  recursos:
    'Cozinha ampla, 2 Wcs, sala de estar com projetor, ar condicionado e aquecedor.',
  funcionamento: '24 horas por dia, 7 dias por semana',
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
