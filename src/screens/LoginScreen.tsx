import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'
import { inicializarBancoLocal } from '../utils/initData'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [nome, setNome] = useState('')
  const [emailCadastro, setEmailCadastro] = useState('')
  const [senhaCadastro, setSenhaCadastro] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [cpf, setCpf] = useState('')

  // Inicializa os dados do JSON no primeiro carregamento
  useEffect(() => {
    inicializarBancoLocal()
  }, [])

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.')
      return
    }

    const usuariosSalvos = await AsyncStorage.getItem('@usuarios')
    const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : []

    const usuarioEncontrado = listaUsuarios.find(
      (u: any) =>
        u.email === email.toLowerCase().trim() &&
        u.senha === senha
    )

    if (usuarioEncontrado) {
      await AsyncStorage.setItem('@email', usuarioEncontrado.email)
      await AsyncStorage.setItem('@usuario_nome', usuarioEncontrado.nome)
      navigation.replace('Home')
    } else {
      Alert.alert('Erro', 'Credenciais inválidas ou usuário não encontrado.')
    }
  }

  const handleCadastro = async () => {
    if (!nome || !emailCadastro || !senhaCadastro || !confirmarSenha || !cpf) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    if (cpf.length !== 11) {
      Alert.alert('Erro', 'CPF inválido. Deve conter 11 dígitos numéricos.')
      return
    }

    if (senhaCadastro !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem')
      return
    }

    const novoUsuario = {
      nome,
      email: emailCadastro.toLowerCase().trim(),
      senha: senhaCadastro,
      cpf,
      saldo: 0 // adiciona saldo padrão
    }

    const usuariosSalvos = await AsyncStorage.getItem('@usuarios')
    const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : []

    const jaExiste = listaUsuarios.some(
      (u: any) => u.email === novoUsuario.email
    )

    if (jaExiste) {
      Alert.alert('Erro', 'Esse e-mail já está cadastrado.')
      return
    }

    const novaLista = [...listaUsuarios, novoUsuario]
    await AsyncStorage.setItem('@usuarios', JSON.stringify(novaLista))
    await AsyncStorage.setItem('@usuario_nome', novoUsuario.nome)
    await AsyncStorage.setItem('@email', novoUsuario.email)

    Alert.alert('Cadastro realizado com sucesso!')
    setModalVisible(false)

    // Limpa os campos
    setNome('')
    setEmailCadastro('')
    setSenhaCadastro('')
    setConfirmarSenha('')
    setCpf('')
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Acesse com o Login:</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ marginTop: 16, color: '#555' }}>Cadastrar-se</Text>
      </TouchableOpacity>

      {/* Modal de Cadastro */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastro</Text>

            <TextInput
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
            <TextInput
              placeholder="E-mail"
              value={emailCadastro}
              onChangeText={setEmailCadastro}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Senha"
              value={senhaCadastro}
              onChangeText={setSenhaCadastro}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 16, color: '#999' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

// Adicione seus estilos abaixo (exemplo):
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
})
