import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Text } from 'react-native';

import Inicio from '../Inicio';
import Reservas from '../Reservas';
import Conta from '../Conta';

const Tab = createMaterialBottomTabNavigator();

const BottomNavigation = () => {
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
        name="Inicio"
        component={Inicio}
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
        name="Reservas"
        component={Reservas}
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
        name="Conta"
        component={Conta}
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

export default BottomNavigation;
