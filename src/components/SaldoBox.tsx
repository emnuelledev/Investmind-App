import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native'

interface SaldoBoxProps {
  saldo: number
  onUpdateSaldo: (valor: number, acao: 'deposito' | 'saque') => Promise<void>
}

export default function SaldoBox({ saldo, onUpdateSaldo }: SaldoBoxProps) {
  const [modalVisivel, setModalVisivel] = useState(false)
  const [acao, setAcao] = useState<'deposito' | 'saque' | null>(null)
  const [valor, setValor] = useState('')

  const confirmarAcao = async () => {
    try {
      const valorNumerico = parseFloat(valor.replace(',', '.'))

      if (isNaN(valorNumerico) || valorNumerico <= 0 || !acao) {
        Alert.alert('Erro', 'Digite um valor válido.')
        return
      }

      await onUpdateSaldo?.(valorNumerico, acao)

      setModalVisivel(false)
      setValor('')
      setAcao(null)
    } catch (error: any) {
      console.error('Erro ao atualizar saldo:', error)
      Alert.alert('Erro', error.message || 'Não foi possível atualizar o saldo.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Saldo Disponível</Text>
      <Text style={styles.valor}>R$ {saldo.toFixed(2)}</Text>

      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            setAcao('deposito')
            setModalVisivel(true)
          }}
        >
          <Text style={styles.textoBotao}>+ Aplicar Saldo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#dc2626' }]}
          onPress={() => {
            setAcao('saque')
            setModalVisivel(true)
          }}
        >
          <Text style={styles.textoBotao}>− Transferir</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent visible={modalVisivel} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>
              {acao === 'deposito' ? 'Aplicar Saldo' : 'Transferir para Banco'}
            </Text>
            <TextInput
              placeholder="Digite o valor"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
              style={styles.input}
            />
            <TouchableOpacity style={styles.modalBotao} onPress={confirmarAcao}>
              <Text style={styles.modalBotaoTexto}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisivel(false)}>
              <Text style={{ color: '#aaa', marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 55,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10
  },
  label: {
    color: '#ccc',
    fontSize: 16
  },
  valor: {
    color: '#10b981',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8
  },
  botoes: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16
  },
  botao: {
    backgroundColor: '#4f46e5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '100%'
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  modalBotao: {
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalBotaoTexto: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
