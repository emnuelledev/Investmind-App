import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { getSaldoUsuarioLogado } from '../services/UserService'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen({ navigation }: Props) {
  const [usuario, setUsuario] = useState('')
  const [perfil, setPerfil] = useState<string | null>(null)
  const [saldo, setSaldo] = useState(0)

  useEffect(() => {
    const carregarDados = async () => {
      const emailSalvo = await AsyncStorage.getItem('@email')
      const perfilSalvo = await AsyncStorage.getItem('@perfil')

      if (emailSalvo) setUsuario(emailSalvo)
      if (perfilSalvo) setPerfil(perfilSalvo)

      const saldoAtual = await getSaldoUsuarioLogado()
      setSaldo(saldoAtual)
    }

    carregarDados()
  }, [])


  const handleLogout = async () => {
    await AsyncStorage.clear()
    navigation.replace('Login')
  }

  const datas = ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06']
  const valoresGrafico = [30, 70, 50, 100, 60, 90]

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/perfil.png')} style={styles.avatar} />
      <Text style={styles.boasVindas}>Olá, {usuario || 'usuário'}!</Text>


      <View style={styles.perfilBox}>
        <Text style={styles.perfilLabel}>Perfil de Investidor:</Text>
        {perfil ? (
          <Text style={styles.perfilTexto}>{perfil}</Text>
        ) : (
          <Text style={styles.perfilAviso}>
            Você ainda não realizou o quiz de perfil. Faça agora para personalizar sua carteira!
          </Text>
        )}
      </View>

      <View style={styles.boxGrafico}>
        <Text style={styles.tituloBox}>Histórico de ganhos e perdas</Text>
        <View style={styles.grafico}>
          {valoresGrafico.map((altura, index) => (
            <View key={index} style={styles.colunaGrafico}>
              <View style={[styles.barra, { height: altura, backgroundColor: `rgba(99, 102, 241, ${0.4 + index * 0.1})` }]} />
              <Text style={styles.dataBarra}>{datas[index]}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
        <Text style={styles.buttonText}>📋 Fazer Quiz de Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Carteira')}>
        <Text style={styles.buttonText}>📊 Ver Carteira Recomendada</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historico')}>
        <Text style={styles.buttonText}>🕓 Ver Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#EF4444' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/logo.png')} style={styles.logoFooter} />
      <Text style={styles.direitos}>Todos os direitos reservados • InvestMind © 2025</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#000',
  },
  boasVindas: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  perfilBox: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  perfilLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  perfilTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  perfilAviso: {
    fontSize: 14,
    textAlign: 'center',
    color: '#888',
  },
  boxGrafico: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tituloBox: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 12,
    textAlign: 'center',
  },
  grafico: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 140,
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  colunaGrafico: {
    alignItems: 'center',
  },
  barra: {
    width: 20,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  dataBarra: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
  button: {
    width: '100%',
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoFooter: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 32,
    marginBottom: 4,
  },
  direitos: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
})

