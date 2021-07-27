import firebase from 'firebase';

export const SET_NOVO_USUARIO = 'SET_NOVO_USUARIO';
export const setNovoUsuario = (campo, valor) => ({
  type: SET_NOVO_USUARIO,
  campo,
  valor,
});

export const LIMPAR_NOVO_USUARIO = 'LIMPAR_NOVO_USUARIO';
export const limparNovoUsuario = () => ({
  type: LIMPAR_NOVO_USUARIO,
});

export const fazerCadastro = (usuario) => () => {
  const { email, senha, nomeCompleto, predio, apartamento, avatar } = usuario;

  const db = firebase.database().ref('usuarios');

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((usuarioRegistrado) =>
      db.push({
        uid: usuarioRegistrado.user.uid,
        nomeCompleto,
        predio,
        apartamento,
        email,
        avatar,
        tipo: 'usuario',
      }),
    );
};
