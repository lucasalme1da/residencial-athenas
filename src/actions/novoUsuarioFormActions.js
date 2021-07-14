import firebase from 'firebase';
import { Alert } from 'react-native';

export const SET_NOVO_USUARIO = 'SET_NOVO_USUARIO';
export const setNovoUsuario = (campo, valor) => ({
  type: SET_NOVO_USUARIO,
  campo,
  valor,
});

export const cadastrarNovoUsuario = (usuario) => {
  // validar('usuario', usuario)
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
