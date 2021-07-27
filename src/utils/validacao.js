export const tipos = {
  NOVO_USUARIO_PASSO_1: 'NOVO_USUARIO_PASSO_1',
  NOVO_USUARIO_PASSO_2: 'NOVO_USUARIO_PASSO_2',
  ESPACO: 'ESPACO',
};

const emailInvalido = (valor) => !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(valor);

const apenasLetras = (valor) => /^[A-ZÀ-ÚÄ-Ü ]+$/i.test(valor.toUpperCase());

const senhaForte = (valor) =>
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(valor);

const vazio = (valor) => valor.trim('') === '';

export const validar = (valor, tipo) => {
  switch (tipo) {
    case tipos.NOVO_USUARIO_PASSO_1:
      // Checar se o nome é válido
      if (vazio(valor.nomeCompleto))
        return {
          valido: false,
          mensagem: 'O nome não pode pode ser vazio!',
        };
      if (!apenasLetras(valor.nomeCompleto))
        return {
          valido: false,
          mensagem: 'O nome deve conter apenas letras!',
        };

      // Checar se o numero do predio é valido
      if (vazio(valor.apartamento))
        return {
          valido: false,
          mensagem: 'O numero do predio não pode ser vazio!',
        };

      // Checar se o numero do apto é valido
      if (vazio(valor.predio))
        return {
          valido: false,
          mensagem: 'O numero do apartamento não pode ser vazio!',
        };

      // Checar email
      if (emailInvalido(valor.email))
        return {
          valido: false,
          mensagem: 'O endereço de email digitado é invalido!',
        };

      return { valido: true };
    case tipos.NOVO_USUARIO_PASSO_2:
      // Checar senha
      if (vazio(valor.senha))
        return {
          valido: false,
          mensagem: 'Digite uma senha para sua conta!',
        };
      if (senhaForte(valor.senha))
        return {
          valido: false,
          mensagem:
            'A senha digitada é fraca! Sua senha deve conter, pelo menos: \n \t • Oito caracteres; \n \t • Pelo menos um número. \n \t • Uma letra minúscula e uma maiúscula;',
        };

      // Checar confirmação de senha
      if (vazio(valor.confirmarSenha))
        return {
          valido: false,
          mensagem: 'A confirmação de senha não pode ser vazia!',
        };
      if (valor.confirmarSenha !== valor.senha)
        return {
          valido: false,
          mensagem: 'As senhas não conferem!',
        };

      // Checar confirmação de senha
      if (valor.checkbox === false)
        return {
          valido: false,
          mensagem:
            'Você deve concordar com os termos e condições antes de se cadastrar!',
        };

      return { valido: true };
    case tipos.ESPACO:
      if (valor.fotos.length < 1)
        return {
          valido: false,
          mensagem: 'Você deve acrescentar ao menos uma foto do espaço!',
        };

      if (vazio(valor.tipo))
        return {
          valido: false,
          mensagem: 'Você deve informar qual o tipo do espaço!',
        };

      if (vazio(valor.nome))
        return {
          valido: false,
          mensagem: 'Você deve informar o nome do espaço!',
        };

      if (vazio(valor.descricao))
        return {
          valido: false,
          mensagem: 'Você deve informar uma descrição do espaço!',
        };

      if (vazio(valor.recursos))
        return {
          valido: false,
          mensagem:
            'Você deve informar quais são os recursos principais do espaço!',
        };

      if (valor.palavrasChave.length < 1)
        return {
          valido: false,
          mensagem:
            'Você deve informar pelo menos uma palavra chave do espaço!',
        };

      if (vazio(valor.funcionamento))
        return {
          valido: false,
          mensagem: 'Você deve informar o funcionamento do espaço!',
        };

      if (vazio(valor.capacidade))
        return {
          valido: false,
          mensagem: 'Você deve informar a capacidade do espaço!',
        };

      return { valido: true };
  }
};
