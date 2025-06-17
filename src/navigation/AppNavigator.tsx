import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import PerfilInvestidorScreen from '../screens/PerfilInvestidorScreen'
import CarteiraScreen from '../screens/CarteiraScreen'
import HistoricoScreen from '../screens/HistoricoScreen'

export type RootStackParamList = {
  Login: undefined
  Home: undefined
  Perfil: undefined
  Carteira: undefined
  Historico: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Perfil" component={PerfilInvestidorScreen} />
      <Stack.Screen name="Carteira" component={CarteiraScreen} />
      <Stack.Screen name="Historico" component={HistoricoScreen} />
    </Stack.Navigator>
  )
}
