export const mudaValor = (campo, valor, setValor) => {
  setValor((estado) => ({ ...estado, [campo]: valor }));
};
