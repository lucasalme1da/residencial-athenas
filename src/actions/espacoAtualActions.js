export const SELECIONAR_ESPACO = 'SELECIONAR_ESPACO';
const selecionarEspacoAction = (espaco) => ({
  type: SELECIONAR_ESPACO,
  espaco,
});

export const selecionarEspaco = (espaco) => (dispatch) => {
  dispatch(selecionarEspacoAction(espaco));
};
