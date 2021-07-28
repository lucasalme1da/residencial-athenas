import firebase from 'firebase';

export const SELECIONAR_ESPACO = 'SELECIONAR_ESPACO';
const selecionarEspacoAction = (espaco) => ({
  type: SELECIONAR_ESPACO,
  espaco,
});

export const SET_ESPACO_ATUAL = 'SET_ESPACO_ATUAL';
export const setEspacoAtual = (campo, valor) => ({
  type: SET_ESPACO_ATUAL,
  campo,
  valor,
});

export const selecionarEspaco = (espaco) => (dispatch) => {
  dispatch(selecionarEspacoAction(espaco));
};
