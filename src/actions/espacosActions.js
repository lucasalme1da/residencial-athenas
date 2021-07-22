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
const atualizarEspacoAction = (espacos) => ({
  type: ATUALIZAR_ESPACO,
  espacos,
});

export const DELETAR_ESPACO = 'DELETAR_ESPACO';
const deletarEspacoAction = (espacos) => ({
  type: DELETAR_ESPACO,
  espacos,
});

export const criarEspaco = (espaco) => (dispatch) => {
  const db = firebase.database().ref('espacos');

  return db
    .push(espaco)
    .then(() => dispatch(criarEspacoAction(espaco)))
    .catch((err) => console.log(err));
};

export const listarEspacos = () => (dispatch) => {
  const db = firebase.database().ref('espacos');

  return db
    .get()
    .then((snapshot) => {
      console.log(
        Object.values(snapshot.val()).map((espaco, idx) => ({
          ...espaco,
          fotos: [],
          id: Object.keys(snapshot.val())[idx],
        })),
      );
      dispatch(
        listarEspacosAction(
          Object.values(snapshot.val()).map((espaco, idx) => ({
            ...espaco,
            fotos: Object.values(espaco.fotos),
            palavrasChave: Object.values(espaco.palavrasChave),
            id: Object.keys(snapshot.val())[idx],
          })),
        ),
      );
    })
    .catch((err) => console.log(err));
};
