import firebase from 'firebase';

export const USUARIO_LOGIN_BEM_SUCEDIDO = 'USER_LOGIN';
const loginBemSucedido = (usuario) => ({
  type: USUARIO_LOGIN_BEM_SUCEDIDO,
  usuario,
});

export const USUARIO_LOGOUT = 'USUARIO_LOGOUT';
const userLogout = () => ({
  type: USUARIO_LOGOUT,
});

export const fazerLogin = (email, senha) => (dispatch) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then((usuario) => {
      const action = loginBemSucedido(usuario);
      dispatch(action);
    });
