export const SET_NOVO_ESPACO = 'SET_NOVO_ESPACO';
export const setNovoEspaco = (campo, valor) => ({
  type: SET_NOVO_ESPACO,
  campo,
  valor,
});

export const LIMPAR_NOVO_ESPACO = 'LIMPAR_NOVO_ESPACO';
export const limparNovoEspaco = () => ({
  type: LIMPAR_NOVO_ESPACO,
});
