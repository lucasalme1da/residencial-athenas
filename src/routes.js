import React from 'react';
import * as firebase from 'firebase';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Landing } from './components/index';
import {
  Entrar,
  Cadastro,
  Inicio,
  NavegacaoMorador,
  NavegacaoAdm,
  Reservas,
  Procurar,
  ListarEspacoAdm,
  AdicionarEspacoAdm,
  DetalharEspaco,
  DetalharEspacoAdm,
} from './pages/index';

import { firebaseConfig } from './config/firebase';

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_400Regular,
  Ubuntu_500Medium,
  Ubuntu_700Bold,
} from '@expo-google-fonts/ubuntu';

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
export default function Router() {
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
      <Stack.Navigator initialRouteName="Landing">
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
          name="DetalharEspaco"
          component={DetalharEspaco}
          options={({ route }) => ({
            ...headerOptions,
            title: route.params.espacoTitulo,
          })}
        />
        <Stack.Screen
          name="DetalharEspacoAdm"
          component={DetalharEspacoAdm}
          options={({ route }) => ({
            ...headerOptions,
            title: route.params.espacoTitulo,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
