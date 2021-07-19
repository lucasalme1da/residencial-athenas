import firebase from 'firebase';
import { Alert } from 'react-native';

export const USUARIO_LOGIN_BEM_SUCEDIDO = 'USER_LOGIN';
const loginBemSucedido = (usuario) => ({
  type: USUARIO_LOGIN_BEM_SUCEDIDO,
  usuario,
});

export const USUARIO_LOGOUT = 'USUARIO_LOGOUT';
const userLogout = () => ({
  type: USUARIO_LOGOUT,
});

export const SET_NOVO_USUARIO = 'SET_NOVO_USUARIO';
export const setNovoUsuario = (campo, valor) => ({
  type: SET_NOVO_USUARIO,
  campo,
  valor,
});

export const fazerLogin = (email, senha) => (dispatch) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then((usuario) => {
      return firebase
        .database()
        .ref()
        .child('usuarios')
        .orderByChild('uid')
        .equalTo(usuario.user.uid)
        .once('value')
        .then((snapshot) => {
          const usuario = Object.values(snapshot.val())[0];
          const action = loginBemSucedido(usuario);
          dispatch(action);
        })
        .catch((err) => console.log(err));
    });
};

export const fazerCadastro = (usuario) => {
  const { email, senha, nomeCompleto, predio, apartamento, avatar } = usuario;

  const db = firebase.database().ref('usuarios');

  firebase
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
    )
    .then(() =>
      Alert.alert(
        'Cadastro bem-sucedido',
        'Morador do apto ' + predio + '-' + apartamento + ' cadastrado!',
      ),
    )
    .catch((err) => Alert.alert('Erro no cadastro', err.message));
};
