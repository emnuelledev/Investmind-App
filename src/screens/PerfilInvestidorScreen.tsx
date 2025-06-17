import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/AppNavigator'

type Props = NativeStackScreenProps<RootStackParamList, 'Perfil'>

const perguntas = [
  {
    pergunta: 'Quanto tempo você pretende deixar o dinheiro investido?',
    opcoes: [
      { texto: 'Menos de 1 ano', valor: 1 },
      { texto: 'Entre 1 e 3 anos', valor: 2 },
      { texto: 'Mais de 3 anos', valor: 3 },
    ],
  },
  {
    pergunta: 'Qual é sua maior prioridade ao investir?',
    opcoes: [
      { texto: 'Segurança', valor: 1 },
      { texto: 'Equilíbrio entre risco e retorno', valor: 2 },
      { texto: 'Maximizar os lucros', valor: 3 },
    ],
  },
  {
    pergunta: 'Como você reagiria se seu investimento caísse 10% em um mês?',
    opcoes: [
      { texto: 'Resgataria imediatamente', valor: 1 },
      { texto: 'Esperaria recuperação', valor: 2 },
      { texto: 'Investiria mais', valor: 3 },
    ],
  },
  {
    pergunta: 'Você possui conhecimento sobre investimentos?',
    opcoes: [
      { texto: 'Nenhum', valor: 1 },
      { texto: 'Médio', valor: 2 },
      { texto: 'Avançado', valor: 3 },
    ],
  },
  {
    pergunta: 'Você prefere investimentos com retorno garantido?',
    opcoes: [
      { texto: 'Sim', valor: 1 },
      { texto: 'Depende', valor: 2 },
      { texto: 'Não', valor: 3 },
    ],
  },
  {
    pergunta: 'Você acompanha o mercado financeiro?',
    opcoes: [
      { texto: 'Nunca', valor: 1 },
      { texto: 'Às vezes', valor: 2 },
      { texto: 'Frequentemente', valor: 3 },
    ],
  },
  {
    pergunta: 'O que você espera dos seus investimentos?',
    opcoes: [
      { texto: 'Estabilidade', valor: 1 },
      { texto: 'Crescimento estável', valor: 2 },
      { texto: 'Alto retorno', valor: 3 },
    ],
  },
  {
    pergunta: 'Qual sua renda mensal média?',
    opcoes: [
      { texto: 'Até R$2.000', valor: 1 },
      { texto: 'De R$2.001 a R$6.000', valor: 2 },
      { texto: 'Acima de R$6.000', valor: 3 },
    ],
  },
  {
    pergunta: 'Você possui reserva de emergência?',
    opcoes: [
      { texto: 'Não', valor: 1 },
      { texto: 'Parcial', valor: 2 },
      { texto: 'Completa', valor: 3 },
    ],
  },
  {
    pergunta: 'Você já investiu em ações ou fundos de risco?',
    opcoes: [
      { texto: 'Nunca', valor: 1 },
      { texto: 'Sim, pouco', valor: 2 },
      { texto: 'Sim, bastante', valor: 3 },
    ],
  },
]

export default function PerfilInvestidorScreen({ navigation }: Props) {
  const [indice, setIndice] = useState(0)
  const [pontuacao, setPontuacao] = useState(0)
  const [finalizado, setFinalizado] = useState(false)
  const [perfilFinal, setPerfilFinal] = useState<string | null>(null)

  const responder = (valor: number) => {
    const novaPontuacao = pontuacao + valor

    if (indice + 1 < perguntas.length) {
      setIndice(indice + 1)
      setPontuacao(novaPontuacao)
    } else {
      let perfil = ''
      if (novaPontuacao <= 14) perfil = 'conservador 🛡️'
      else if (novaPontuacao <= 22) perfil = 'moderado ⚖️'
      else perfil = 'agressivo 🚀'

      setPerfilFinal(perfil)
      setPontuacao(novaPontuacao)
      setFinalizado(true)
    }
  }

  const salvarResultado = async (irPara: 'home' | 'carteira') => {
    if (perfilFinal) {
      await AsyncStorage.setItem('@perfil', perfilFinal)

      const historicoAnterior = await AsyncStorage.getItem('@quizHistorico')
      const historico = historicoAnterior ? JSON.parse(historicoAnterior) : []
      const novoHistorico = [
        ...historico,
        { data: new Date().toISOString(), resultado: perfilFinal },
      ]
      await AsyncStorage.setItem('@quizHistorico', JSON.stringify(novoHistorico))
    }

    navigation.navigate(irPara === 'home' ? 'Home' : 'Carteira')
  }

  const descricaoCompleta = () => {
    if (perfilFinal?.includes('conservador')) {
      return 'Perfil Conservador: prefere segurança e estabilidade. Ideal para investimentos como Tesouro Direto, CDBs e fundos de renda fixa.'
    } else if (perfilFinal?.includes('moderado')) {
      return 'Perfil Moderado: busca equilíbrio entre segurança e rentabilidade. Fundos multimercado, debêntures e ações de empresas sólidas são indicados.'
    } else {
      return 'Perfil Agressivo: aceita altos riscos visando maior retorno. Ideal para ações, criptomoedas, fundos de risco e startups.'
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!finalizado ? (
        <>
          <Text style={styles.title}>🧠 {perguntas[indice].pergunta}</Text>
          {perguntas[indice].opcoes.map((opcao, i) => (
            <TouchableOpacity
              key={i}
              style={styles.botao}
              onPress={() => responder(opcao.valor)}
            >
              <Text style={styles.botaoTexto}>{opcao.texto}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.progresso}>
            Pergunta {indice + 1} de {perguntas.length}
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Resultado do seu perfil:</Text>
          <Text style={styles.resultado}>{perfilFinal?.toUpperCase()}</Text>
          <Text style={styles.descricao}>{descricaoCompleta()}</Text>

          <TouchableOpacity
            style={[styles.botao, { backgroundColor: '#4F46E5' }]}
            onPress={() => salvarResultado('carteira')}
          >
            <Text style={styles.botaoTexto}>📊 Ver Carteira Recomendada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => salvarResultado('home')}
          >
            <Text style={styles.botaoTexto}>🏠 Voltar para a Home</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 16,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progresso: {
    marginTop: 12,
    textAlign: 'center',
    color: '#777',
  },
  resultado: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 12,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 12,
    color: '#444',
  },
})
