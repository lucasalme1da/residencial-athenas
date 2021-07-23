import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Landing } from './components/index';
import {
  Entrar,
  Cadastro,
  NavegacaoMorador,
  NavegacaoAdm,
  Procurar,
  ListarEspacoAdm,
  AdicionarEspacoAdm,
  DetalharEspaco,
  DetalharEspacoAdm,
  EditarEspacoAdm,
} from './pages/index';

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export default function Router({ navigation }) {
  const espacoAtual = useSelector((state) => state.espacoAtual);

  let [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_400Regular,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const headerOptions = {
    headerTintColor: '#7a6428',
    headerTitleStyle: {
      width: '100%',
      fontSize: 18,
      fontFamily: 'Ubuntu_500Medium',
      textAlign: 'center',
      maxWidth: 270,
      color: '#7a6428',
    },
    headerTitleAlign: 'center',
    headerTransparent: true,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Entrar'}>
        <Stack.Screen
          name="LandingScreen"
          component={Landing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Entrar"
          component={Entrar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NavegacaoMorador"
          component={NavegacaoMorador}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NavegacaoAdm"
          component={NavegacaoAdm}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Procurar"
          component={Procurar}
          options={{ ...headerOptions, title: 'Procurar' }}
        />
        <Stack.Screen
          name="ListarEspacoAdm"
          component={ListarEspacoAdm}
          options={{ ...headerOptions, title: 'Espaços' }}
        />
        <Stack.Screen
          name="AdicionarEspacoAdm"
          component={AdicionarEspacoAdm}
          options={{ ...headerOptions, title: 'Adicionar espaço' }}
        />
        <Stack.Screen
          name="EditarEspacoAdm"
          component={EditarEspacoAdm}
          options={{ ...headerOptions, title: 'Editar espaço' }}
        />
        <Stack.Screen
          name="DetalharEspaco"
          component={DetalharEspaco}
          options={{ ...headerOptions, title: espacoAtual?.nome || '' }}
        />
        <Stack.Screen
          name="DetalharEspacoAdm"
          component={DetalharEspacoAdm}
          options={{ ...headerOptions, title: espacoAtual?.nome || '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
