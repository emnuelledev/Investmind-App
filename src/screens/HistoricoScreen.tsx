import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface QuizItem {
  data: string
  resultado: string
}

interface Transacao {
  data: string
  tipo: string
  valor: number
}

interface Investimento {
  data: string
  tipo: string
  ativo: string
  valor: number
}

export default function HistoricoScreen() {
  const [quizHistorico, setQuizHistorico] = useState<QuizItem[]>([])
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [investimentos, setInvestimentos] = useState<Investimento[]>([])
  const [filtro, setFiltro] = useState<'todos' | 'quiz' | 'transacoes' | 'investimentos'>('todos')

  useEffect(() => {
    const carregarDados = async () => {
      const historicoQuiz = await AsyncStorage.getItem('@quizHistorico')
      const entradasESaidas = await AsyncStorage.getItem('@transacoes')
      const historicoInvest = await AsyncStorage.getItem('@investimentos')

      if (historicoQuiz) setQuizHistorico(JSON.parse(historicoQuiz))
      if (entradasESaidas) setTransacoes(JSON.parse(entradasESaidas))
      if (historicoInvest) setInvestimentos(JSON.parse(historicoInvest))
    }

    carregarDados()
  }, [])

  const formatarData = (data: string) => {
    const d = new Date(data)
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.filtros}>
        <TouchableOpacity onPress={() => setFiltro('todos')} style={styles.filtroBotao}>
          <Text style={styles.filtroTexto}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('quiz')} style={styles.filtroBotao}>
          <Text style={styles.filtroTexto}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('transacoes')} style={styles.filtroBotao}>
          <Text style={styles.filtroTexto}>Transações</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('investimentos')} style={styles.filtroBotao}>
          <Text style={styles.filtroTexto}>Investimentos</Text>
        </TouchableOpacity>
      </View>

      {(filtro === 'todos' || filtro === 'quiz') && (
        <View style={styles.boxHistorico}>
          <Text style={styles.title}>Histórico de Perfil</Text>
          {quizHistorico.length > 0 ? (
            quizHistorico.map((item, index) => (
              <Text key={index} style={styles.item}>
                📅 {formatarData(item.data)} - Perfil: {item.resultado}
              </Text>
            ))
          ) : (
            <Text style={styles.item}>Nenhum teste realizado.</Text>
          )}
        </View>
      )}

      {(filtro === 'todos' || filtro === 'transacoes') && (
        <View style={styles.boxHistorico}>
          <Text style={styles.title}>Entradas e Saídas</Text>
          {transacoes.length > 0 ? (
            transacoes.map((item, index) => (
              <Text key={index} style={styles.item}>
                📅 {formatarData(item.data)} - {item.tipo === 'deposito' ? 'Depósito' : 'Saque'}: R$ {item.valor.toFixed(2)}
              </Text>
            ))
          ) : (
            <Text style={styles.item}>Nenhuma transação registrada.</Text>
          )}
        </View>
      )}

      {(filtro === 'todos' || filtro === 'investimentos') && (
        <View style={styles.boxHistorico}>
          <Text style={styles.title}>Histórico de Investimentos</Text>
          {investimentos.length > 0 ? (
            investimentos.map((item, index) => (
              <Text key={index} style={styles.item}>
                📅 {formatarData(item.data)} - {item.tipo} de {item.ativo}: R$ {item.valor.toFixed(2)}
              </Text>
            ))
          ) : (
            <Text style={styles.item}>Nenhum investimento registrado.</Text>
          )}
        </View>
      )}

      <Image source={require('../../assets/logo.png')} style={styles.logoFooter} />
      <Text style={styles.direitos}>Todos os direitos reservados • InvestMind © 2025</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  filtros: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  filtroBotao: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filtroTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111',
  },
  boxHistorico: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  item: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
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
