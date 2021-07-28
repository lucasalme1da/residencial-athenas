import firebase from 'firebase';

export const datasJaReservadas = (idEspaco) => {
  return firebase
    .database()
    .ref('reservas')
    .orderByChild('idEspaco')
    .equalTo(idEspaco)
    .get()
    .then((snapshot) => Object.values(snapshot.val()).map((r) => r.data))
    .catch(() => {});
};
