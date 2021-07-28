export const mostrarErroPeloCodigo = (codigo) => {
  switch (codigo) {
    case 'auth/user-not-found':
      return 'Email não encontrado!';
    case 'auth/wrong-password':
      return 'Senha incorreta!';
    case 'auth/invalid-email':
      return 'Preencha os campos corretamente!';
    default:
      return 'Erro desconhecido!';
  }
};
