import firebase from 'firebase';

export const CRIAR_ESPACO = 'CRIAR_ESPACO';
const criarEspacoAction = (espaco) => ({
  type: CRIAR_ESPACO,
  espaco,
});

export const LISTAR_ESPACOS = 'LISTAR_ESPACOS';
const listarEspacosAction = (espacos) => ({
  type: LISTAR_ESPACOS,
  espacos,
});

export const ATUALIZAR_ESPACO = 'ATUALIZAR_ESPACO';
const atualizarEspacoAction = (espaco) => ({
  type: ATUALIZAR_ESPACO,
  espaco,
});

export const DELETAR_ESPACO = 'DELETAR_ESPACO';
const deletarEspacoAction = (espacoId) => ({
  type: DELETAR_ESPACO,
  espacoId,
});

export const criarEspaco = (espaco) => (dispatch) => {
  const db = firebase.database().ref('espacos');

  return db
    .push(espaco)
    .then(() => dispatch(criarEspacoAction(espaco)))
    .catch(() => {});
};

export const listarEspacos = () => (dispatch) => {
  const db = firebase.database().ref('espacos');

  return db
    .get()
    .then((snapshot) =>
      dispatch(
        listarEspacosAction(
          Object.values(snapshot.val()).map((espaco, idx) => ({
            ...espaco,
            fotos: Object.values(espaco.fotos),
            palavrasChave: Object.values(espaco.palavrasChave),
            id: Object.keys(snapshot.val())[idx],
          })),
        ),
      ),
    )
    .catch(() => {});
};

export const atualizarEspaco = (novosDadosDoEspaco) => (dispatch) => {
  const espacoAtual = firebase
    .database()
    .ref(`espacos/${novosDadosDoEspaco.id}`);

  return espacoAtual
    .update(novosDadosDoEspaco)
    .then(() => dispatch(atualizarEspacoAction(novosDadosDoEspaco)));
};

export const deletarEspaco = (idEspaco) => (dispatch) => {
  const espacos = firebase.database().ref(`espacos/${idEspaco}`);

  return espacos.remove().then(dispatch(deletarEspacoAction(idEspaco)));
};
