import styled from 'styled-components';
import { Dimensions, Image, StatusBar } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export const Fundo = styled.View`
  width: ${screenWidth};
  height: ${screenHeight};
  background-color: #f2eee2;
  position: relative;
`;

export const Conteudo = styled.View`
  width: ${screenWidth};
  height: ${screenHeight - 400};
  background-color: white;
  position: absolute;
  bottom: 0;

  border-top-right-radius: 32;
  border-top-left-radius: 32;

  padding-top: 42;
  padding-right: 35;
  padding-bottom: 42;
  padding-left: 35;
`;

export const LogotipoContainer = styled.View`
  width: ${screenWidth};
  margin-top: ${StatusBar.currentHeight + 24};
  height: 200;
  flex: 1;
  align-items: center;
`;

export const Logotipo = styled.Image`
  width: 200;
  height: 200;
  margin-top: 32;
  margin-bottom: 32;
`;

export const Titulo = styled.Text`
  font-size: 18;
  font-family: 'Ubuntu_300Light';
  text-align: center;
  max-width: 270;
  color: #7a6428;
`;
