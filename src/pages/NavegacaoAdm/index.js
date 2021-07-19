import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Text } from 'react-native';

import InicioAdm from '../InicioAdm';
import ReservasAdm from '../ReservasAdm';
import ContaAdm from '../ContaAdm';

const Tab = createMaterialBottomTabNavigator();

const NavegacaoAdm = () => {
  return (
    <Tab.Navigator
      barStyle={{
        fontFamily: 'Ubuntu_700Bold',
        backgroundColor: 'transparent',
        paddingBottom: 24,
      }}
      initialRouteName="Inicio"
      shifting={true}
      activeColor="#7A6428"
      inactiveColor="#958353"
      backBehavior="firstRoute"
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="InicioAdm"
        component={InicioAdm}
        options={{
          tabBarIcon: 'home',
          tabBarLabel: (
            <Text style={{ fontFamily: 'Ubuntu_700Bold', textAlign: 'center' }}>
              Inicio
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ReservasAdm"
        component={ReservasAdm}
        options={{
          tabBarIcon: 'calendar-check-outline',
          tabBarLabel: (
            <Text style={{ fontFamily: 'Ubuntu_700Bold', textAlign: 'center' }}>
              Reservas
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="ContaAdm"
        component={ContaAdm}
        options={{
          tabBarIcon: 'account-circle-outline',
          tabBarLabel: (
            <Text style={{ fontFamily: 'Ubuntu_700Bold', textAlign: 'center' }}>
              Conta
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavegacaoAdm;
