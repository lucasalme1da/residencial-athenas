import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { fazerCadastro, setNovoUsuario } from '../../actions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import * as ImagePicker from 'expo-image-picker';

import CampoSenha from '../../components/CampoSenha';
import CampoTexto from '../../components/CampoTexto';
import BotaoAcao from '../../components/BotaoAcao';
import Seletor from '../../components/Seletor';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const Fundo = require('../../../assets/logotipo.png');

const Cadastro = ({ navigation }) => {
  const [evitarTeclado, setEvitarTeclado] = useState(false);
  const [passo, setPasso] = useState(1);
  const [predios, setPredios] = useState(['1', '2', '3', '4', '5']);
  const [apartamentos, setApartamentos] = useState([
    '11',
    '12',
    '13',
    '14',
    '21',
    '22',
    '23',
    '24',
    '31',
    '32',
    '33',
    '34',
  ]);
  const dispatch = useDispatch();

  const novoUsuario = useSelector((state) => state.formCadastro);

  const mudaTeclado = () => {
    console.log('mudouy');
    setEvitarTeclado(!evitarTeclado);
  };

  const mudaValor = (campo, valor) => {
    dispatch(setNovoUsuario(campo, valor));
  };

  const escolherFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
      base64: true,
    });
    if (!result.cancelled) {
      mudaValor('avatar', 'data:image/png;base64,' + result.base64);
    }
  };

  const cadastrar = () =>
    dispatch(fazerCadastro(novoUsuario))
      .then(() =>
        Alert.alert(
          'Cadastro bem-sucedido',
          'Morador do apto ' + predio + '-' + apartamento + ' cadastrado!',
        ),
      )
      .catch((err) => Alert.alert('Erro no cadastro', err.message));

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Desculpe, mas é necessário ter permissão para acessar as fotos!',
          );
        }
      }
    })();
  }, []);

  const renderizarPasso = () => {
    switch (passo) {
      case 1:
        return (
          <>
            <View style={estilos.tituloContainer}>
              <Text style={estilos.titulo}>Olá, morador(a)!</Text>
              <Text style={estilos.descricao}>
                Preencha com seus dados abaixo para nós te conhecermos melhor.
                Se quiser, adicione uma foto!
              </Text>
            </View>
            <View style={estilos.conteudo}>
              <View style={estilos.fotoContainer}>
                <TouchableOpacity
                  style={estilos.fotoBotao}
                  onPress={escolherFoto}>
                  {novoUsuario.avatar ? (
                    <Image
                      style={estilos.foto}
                      source={{ uri: novoUsuario.avatar }}
                    />
                  ) : (
                    <Icon name="add-a-photo" size={46} color="#897645" />
                  )}
                </TouchableOpacity>
              </View>
              <ScrollView>
                <CampoTexto
                  placeholder={'Fulano Beltrano Ciclano'}
                  value={novoUsuario.nomeCompleto}
                  rotulo="Seu nome completo"
                  onChangeText={(valor) => mudaValor('nomeCompleto', valor)}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Seletor
                    rotulo="Número do prédio"
                    itens={predios}
                    value={novoUsuario.predio}
                    onValueChange={(valor) => mudaValor('predio', valor)}
                  />

                  <Seletor
                    rotulo="Número do apto."
                    itens={apartamentos}
                    value={novoUsuario.apartamento}
                    onValueChange={(valor) => mudaValor('apartamento', valor)}
                  />
                </View>

                <CampoTexto
                  placeholder={'fulano@beltrano.com'}
                  value={novoUsuario.email}
                  rotulo="Endereço de email favorito"
                  onChangeText={(valor) => mudaValor('email', valor)}
                  onFocus={mudaTeclado}
                  onBlur={mudaTeclado}
                />
                <BotaoAcao
                  primario
                  titulo="Continuar"
                  onPress={() => setPasso(2)}
                />
                <BotaoAcao
                  titulo="Cancelar"
                  onPress={() => navigation.goBack()}
                />
              </ScrollView>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={estilos.tituloContainer}>
              <Text style={estilos.titulo}>Fique atento!</Text>
              <Text style={estilos.descricao}>
                Crie uma senha bem segura para sua conta. Também é importante
                ler as políticas e os termos de uso!
              </Text>
            </View>
            <View style={estilos.conteudo}>
              <View style={{ height: '50%' }}>
                <CampoSenha
                  placeholder={'••••••••'}
                  value={novoUsuario.senha}
                  rotulo="Senha"
                  onChangeText={(valor) => mudaValor('senha', valor)}
                />

                <CampoSenha
                  placeholder={'••••••••'}
                  value={novoUsuario.confirmarSenha}
                  rotulo="Confirmar senha"
                  onChangeText={(valor) => mudaValor('confirmarSenha', valor)}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 16,
                    marginBottom: 16,
                  }}>
                  <CheckBox
                    disabled={false}
                    value={novoUsuario.checkbox}
                    tintColors={{ true: '#897645' }}
                    onValueChange={(valor) => mudaValor('checkbox', valor)}
                  />
                  <Text style={{ ...estilos.descricao, marginLeft: 8 }}>
                    Declaro que li e estou de acordo com as{' '}
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textDecorationLine: 'underline',
                      }}>
                      Políticas e Termos de Uso.
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{ height: 180 }}>
                <BotaoAcao primario titulo="Continuar" onPress={cadastrar} />
                <BotaoAcao titulo="Voltar" onPress={() => setPasso(1)} />
              </View>
            </View>
          </>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={evitarTeclado ? 0 : -screenHeight}
      style={{ flex: 1 }}
      behavior="position">
      <View style={estilos.fundoContainer}>
        <Image source={Fundo} style={estilos.fundoImagem} blurRadius={2} />
        {renderizarPasso()}
      </View>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  fundoContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#f2eee2',
    position: 'relative',
  },

  fundoImagem: {
    position: 'absolute',
    opacity: 0.15,
    alignSelf: 'center',
  },

  tituloContainer: {
    width: screenWidth,
    height: screenHeight * 0.3,
    marginTop: StatusBar.currentHeight + 24,
    flex: 1,
    padding: 35,
  },

  titulo: {
    fontSize: 24,
    fontFamily: 'Ubuntu_400Regular',
    textAlign: 'left',
    maxWidth: 270,
    color: '#7a6428',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 14,
    fontFamily: 'Ubuntu_300Light',
    textAlign: 'left',
    maxWidth: 300,
    color: '#7a6428',
  },

  conteudo: {
    width: screenWidth,
    height: screenHeight * 0.7,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,

    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,

    paddingTop: 42,
    paddingRight: 35,
    paddingBottom: 42,
    paddingLeft: 35,

    flex: 1,
    justifyContent: 'space-between',
  },

  fotoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 70,
    position: 'relative',
    maxHeight: 40,
  },

  fotoBotao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    width: 120,
    height: 120,
    borderWidth: 5,
    borderColor: '#F9F7F3',
    borderRadius: 100,
    backgroundColor: '#D8C799',
    position: 'absolute',
    top: -100,
  },

  foto: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },

  rodapeContainer: {
    flex: 1,
    width: '100%',
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rodapePrimario: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    color: '#C8BC9B',
  },

  rodapeSecundario: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 18,
    color: '#CAB272',
    textAlign: 'center',
  },
});

export default Cadastro;
