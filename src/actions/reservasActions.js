import firebase from 'firebase';

export const CRIAR_RESERVA = 'CRIAR_RESERVA';
const criarReservaAction = (reserva) => ({
  type: CRIAR_RESERVA,
  reserva,
});

export const LISTAR_RESERVAS = 'LISTAR_RESERVAS';
const listarReservasAction = (reservas) => ({
  type: LISTAR_RESERVAS,
  reservas,
});

export const LISTAR_TODAS_RESERVAS = 'LISTAR_TODAS_RESERVAS';
const listarTodasReservasAction = (reservas) => ({
  type: LISTAR_TODAS_RESERVAS,
  reservas,
});

export const ATUALIZAR_RESERVA = 'ATUALIZAR_RESERVA';
const atualizarReservaAction = (reserva) => ({
  type: ATUALIZAR_RESERVA,
  reserva,
});

export const DELETAR_RESERVA = 'DELETAR_RESERVA';
const deletarReservaAction = (reservaId) => ({
  type: DELETAR_RESERVA,
  reservaId,
});

export const criarReserva = (reserva) => (dispatch) => {
  const db = firebase.database().ref('reservas');

  return db.push(reserva).then(() => dispatch(criarReservaAction(reserva)));
};

export const listarTodasReservas = () => (dispatch) => {
  return firebase
    .database()
    .ref('reservas')
    .get()
    .then((snapshot) =>
      dispatch(
        snapshot.val()
          ? listarTodasReservasAction(
              Object.values(snapshot.val()).map((reserva, idx) => ({
                ...reserva,
                id: Object.keys(snapshot.val())[idx],
              })),
            )
          : listarTodasReservasAction([]),
      ),
    );
};

export const listarReservas = (idMorador) => (dispatch) => {
  return firebase
    .database()
    .ref('reservas')
    .orderByChild('idMorador')
    .equalTo(idMorador)
    .get()
    .then((snapshot) =>
      dispatch(
        snapshot.val()
          ? listarReservasAction(
              Object.values(snapshot.val()).map((reserva, idx) => ({
                ...reserva,
                id: Object.keys(snapshot.val())[idx],
              })),
            )
          : listarReservasAction([]),
      ),
    );
};

export const atualizarReserva = (novosDadosDoReserva) => (dispatch) => {
  const reservaAtual = firebase
    .database()
    .ref(`reservas/${novosDadosDoReserva.id}`);

  return reservaAtual
    .update(novosDadosDoReserva)
    .then(() => dispatch(atualizarReservaAction(novosDadosDoReserva)));
};

export const deletarReserva = (idReserva) => (dispatch) => {
  const reservas = firebase.database().ref(`reservas/${idReserva}`);

  return reservas.remove().then(dispatch(deletarReservaAction(idReserva)));
};
