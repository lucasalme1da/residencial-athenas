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

export const datasJaReservadas = (idEspaco) => {
  return firebase
    .database()
    .ref('reservas')
    .orderByChild('idEspaco')
    .equalTo(idEspaco)
    .get()
    .then((snapshot) => Object.values(snapshot.val()).map((r) => r.data))
    .catch((err) => console.log(err));
};
