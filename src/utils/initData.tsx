import AsyncStorage from '@react-native-async-storage/async-storage'
import dataJson from '../../assets/data/data.json'

export const inicializarBancoLocal = async () => {
  const usuariosSalvos = await AsyncStorage.getItem('@usuarios')
  if (!usuariosSalvos) {
    await AsyncStorage.setItem('@usuarios', JSON.stringify(dataJson.usuarios))
  }

  const investimentosSalvos = await AsyncStorage.getItem('@investimentos_regras')
  if (!investimentosSalvos) {
    await AsyncStorage.setItem('@investimentos_regras', JSON.stringify(dataJson.investimentos))
  }

  const quizSalvo = await AsyncStorage.getItem('@quiz')
  if (!quizSalvo) {
    await AsyncStorage.setItem('@quiz', JSON.stringify(dataJson.quiz))
  }

  const perfisSalvos = await AsyncStorage.getItem('@perfis')
  if (!perfisSalvos) {
    await AsyncStorage.setItem('@perfis', JSON.stringify(dataJson.perfis))
  }
}
