import firebase from 'firebase';

export const USUARIO_LOGIN_BEM_SUCEDIDO = 'USER_LOGIN';
const loginBemSucedido = (usuario) => ({
  type: USUARIO_LOGIN_BEM_SUCEDIDO,
  usuario,
});

export const USUARIO_LOGOUT = 'USUARIO_LOGOUT';
const usuarioLogout = () => ({
  type: USUARIO_LOGOUT,
});

export const fazerLogin = (email, senha) => (dispatch) => {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() =>
      firebase
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
              return usuario.tipo;
            })
            .catch(() => {});
        }),
    );
};

export const fazerLogout = () => (dispatch) =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(usuarioLogout);
    });

export const usuarioAutenticado = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .database()
          .ref()
          .child('usuarios')
          .orderByChild('uid')
          .equalTo(firebase.auth().currentUser.uid)
          .once('value')
          .then((snapshot) => {
            const usuario = Object.values(snapshot.val())[0];
            const action = loginBemSucedido(usuario);
            dispatch(action);
            resolve(usuario.tipo);
          })
          .catch((err) => reject(err));
      } else {
        reject();
      }
    });
  });
};
