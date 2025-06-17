import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import SaldoBox from '../components/SaldoBox'
import { registrarInvestimento, registrarMovimentoSaldo, getSaldoUsuarioLogado } from '../services/UserService'

export default function CarteiraScreen() {
  const [perfil, setPerfil] = useState<string | null>(null)
  const [carteira, setCarteira] = useState<string[]>([])
  const [investimentos, setInvestimentos] = useState<any[]>([])
  const [busca, setBusca] = useState('')
  const [modalVisivel, setModalVisivel] = useState(false)
  const [ativoSelecionado, setAtivoSelecionado] = useState<string | null>(null)
  const [valor, setValor] = useState('')
  const [acao, setAcao] = useState<'aplicar' | 'retirar' | 'deposito' | 'saque' | null>(null)
  const [saldo, setSaldo] = useState<number>(0)
  const [modalSaldo, setModalSaldo] = useState(false)

  const recomendacoes = {
    conservador: ['Tesouro Selic', 'CDB Liquidez Diária', 'Fundos de Renda Fixa', 'LCI Curto Prazo', 'LCI Habitação', 'Poupança Digital', 'CRI'],
    moderado: ['Tesouro IPCA', 'Fundos Multimercado', 'LCI/LCA', 'Debêntures', 'CDB com vencimento', 'ETF Setorial', 'Fundo Imobiliário'],
    agressivo: ['Ações', 'ETFs', 'Criptomoedas', 'Startups', 'Derivativos', 'Fundo Tech', 'BDRs']
  }

  useFocusEffect(
    React.useCallback(() => {
      const carregarDados = async () => {
        try {
          const [perfilSalvo, historicoInvest] = await Promise.all([
            AsyncStorage.getItem('@perfil'),
            AsyncStorage.getItem('@investimentos'),
          ])

          if (perfilSalvo) {
            setPerfil(perfilSalvo)
            if (recomendacoes[perfilSalvo as keyof typeof recomendacoes]) {
              setCarteira(recomendacoes[perfilSalvo as keyof typeof recomendacoes])
            }
          }

          if (historicoInvest) {
            setInvestimentos(JSON.parse(historicoInvest))
          }

          const saldoAtual = await getSaldoUsuarioLogado()
          setSaldo(saldoAtual)
        } catch (error) {
          console.error('Erro ao carregar dados:', error)
        }
      }

      carregarDados()
    }, [])
  )

  const handleUpdateSaldoFromBox = async (valor: number, tipo: 'deposito' | 'saque') => {
    const novoSaldo = await registrarMovimentoSaldo(valor, tipo)
    setSaldo(novoSaldo)
  }


  const handleRegistrarInvestimento = async () => {
    try {
      const v = parseFloat(valor.replace(',', '.'))
      if (!ativoSelecionado || !acao || isNaN(v) || v <= 0) {
        return Alert.alert('Erro', 'Valor inválido')
      }

      const tipoOperacao = acao === 'aplicar' ? 'aplicacao' : 'resgate'
      const novoSaldo = await registrarInvestimento(ativoSelecionado, v, tipoOperacao)
      setSaldo(novoSaldo)

      const salvos = await AsyncStorage.getItem('@investimentos')
      setInvestimentos(salvos ? JSON.parse(salvos) : [])

      setModalVisivel(false)
      setValor('')
      setAtivoSelecionado(null)
      setAcao(null)
    } catch (error: any) {
      console.error('Erro ao registrar investimento:', error)
      Alert.alert('Erro', error.message || 'Não foi possível registrar o investimento.')
    }
  }

  const abrirModal = (ativo: string, tipo: 'aplicar' | 'retirar') => {
    setAtivoSelecionado(ativo)
    setAcao(tipo)
    setValor('')
    setModalVisivel(true)
  }

  const ativosComSaldo = investimentos.reduce((acc: { [key: string]: number }, inv) => {
    if (!acc[inv.ativo]) acc[inv.ativo] = 0
    acc[inv.ativo] += inv.tipo === 'aplicacao' ? inv.valor : -inv.valor
    return acc
  }, {})

  const todosOsAtivos = Object.values(recomendacoes).flat()
  const ativosRecomendados = carteira
  const outrosAtivos = todosOsAtivos.filter(ativo => !ativosRecomendados.includes(ativo))

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SaldoBox saldo={saldo} onUpdateSaldo={handleUpdateSaldoFromBox} />

      <View style={styles.recomendadosContainer}>
        <Text style={styles.recomendadosTitle}>Recomendado para seu perfil ({perfil})</Text>
        {ativosRecomendados.map((item, index) => (
          <View key={index} style={styles.recomendadoItem}>
            <Text style={styles.item}>{item}</Text>
            <TouchableOpacity onPress={() => abrirModal(item, 'aplicar')} style={styles.botaoAplicar}>
              <Text style={styles.botaoTexto}>Investir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.title}>Sua Carteira de Investimentos</Text>

      {Object.keys(ativosComSaldo).length > 0 && (
        <>
          <Text style={styles.subtitle}>Investimentos Atuais</Text>
          {Object.entries(ativosComSaldo).map(([nome, valor], index) => (
            <View key={index} style={styles.box}>
              <Text style={styles.item}>{nome} — R$ {valor.toFixed(2)}</Text>
              <View style={styles.botoesBox}>
                <TouchableOpacity onPress={() => abrirModal(nome, 'aplicar')} style={styles.botaoAplicar}>
                  <Text style={styles.botaoTexto}>+ Aplicar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => abrirModal(nome, 'retirar')} style={styles.botaoResgatar}>
                  <Text style={styles.botaoTexto}>- Retirar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      )}

      <TextInput
        placeholder="Buscar ativos..."
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />

      <Text style={styles.subtitle}>Outros Ativos</Text>

      {outrosAtivos
        .filter(item => item.toLowerCase().includes(busca.toLowerCase()))
        .map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.item}>{item}</Text>
            <TouchableOpacity onPress={() => abrirModal(item, 'aplicar')} style={styles.botaoAplicar}>
              <Text style={styles.botaoTexto}>Investir</Text>
            </TouchableOpacity>
          </View>
        ))}

      <Modal transparent visible={modalVisivel || modalSaldo} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalSaldo
                ? acao === 'deposito' ? 'Aplicar Saldo' : 'Transferir para banco'
                : acao === 'aplicar' ? `Aplicar em ${ativoSelecionado}` : `Retirar de ${ativoSelecionado}`}
            </Text>
            <TextInput
              placeholder="Valor"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
              style={styles.input}
            />
            <TouchableOpacity onPress={modalSaldo ? () => handleUpdateSaldoFromBox(parseFloat(valor.replace(',', '.')), acao as 'deposito' | 'saque') : handleRegistrarInvestimento} style={styles.modalBotao}>
              <Text style={styles.modalBotaoTexto}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setModalVisivel(false); setModalSaldo(false); }}>
              <Text style={{ color: '#888', marginTop: 12 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Image source={require('../../assets/logo.png')} style={styles.logoFooter} />
      <Text style={styles.direitos}>Todos os direitos reservados • InvestMind © 2025</Text>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  recomendadosContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  recomendadosTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  recomendadoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  box: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  item: {
    fontSize: 16,
    fontWeight: '600',
  },
  botoesBox: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  botaoAplicar: {
    backgroundColor: '#10B981',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  botaoResgatar: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalBotao: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  modalBotaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoFooter: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: 32,
    marginBottom: 4,
    alignSelf: 'center'
  },
  direitos: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
})
