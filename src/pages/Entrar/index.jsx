import React, { useState } from 'react';
import { Image } from 'react-native';
import CampoTexto from '../../components/CampoTexto';

const Logo = require('../../../assets/logotipo.png');

import * as S from './styles';

const Entrar = () => {
  return (
    <S.Fundo>
      <S.LogotipoContainer>
        <S.Logotipo
          source={Logo}
          style={{
            resizeMode: 'center',
          }}
        />
        <S.Titulo>
          Entre com sua conta de morador e começe as reservas!
        </S.Titulo>
      </S.LogotipoContainer>
      <S.Conteudo>
        <CampoTexto placeholder={'Email'} value={null} />
        <CampoTexto placeholder={'••••••••'} value={null} />
      </S.Conteudo>
    </S.Fundo>
  );
};

export default Entrar;
