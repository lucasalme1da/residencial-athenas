import React from 'react';
import * as S from './styles';

const CampoTexto = ({ onChangeText, value, placeholder }) => {
  return (
    <S.Campo
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default CampoTexto;
