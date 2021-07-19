import React from 'react';
import { Text, View, Button } from 'react-native';
import CampoTexto from '../CampoTexto';
export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', marginBottom: 12 }}>
        | FAST TRAVEL 😛 |
      </Text>
      <Button title="Login" onPress={() => navigation.navigate('Entrar')} />
      <Button
        title="Cadastro"
        onPress={() => navigation.navigate('Cadastro')}
      />
      <Button
        title="BottomNavigation"
        onPress={() => navigation.navigate('BottomNavigation')}
      />
      <Button
        title="Reservas"
        onPress={() => navigation.navigate('Reservas')}
      />
    </View>
  );
}
