import AsyncStorage from '@react-native-async-storage/async-storage'
import data from '../../assets/data/data.json'

export async function getUsuarioLogado() {
  const email = await AsyncStorage.getItem('@email')
  if (!email) return null

  const usuariosSalvos = await AsyncStorage.getItem('@usuarios')
  const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : []
  return listaUsuarios.find((u: any) => u.email === email)
}

export async function getSaldoUsuarioLogado(): Promise<number> {
  const usuario = await getUsuarioLogado()
  return usuario?.saldo || 0
}

export async function atualizarSaldoUsuarioLogado(novoSaldo: number) {
  const email = await AsyncStorage.getItem('@email')
  if (!email) return

  const usuariosSalvos = await AsyncStorage.getItem('@usuarios')
  const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : []

  const novaLista = listaUsuarios.map((u: any) =>
    u.email === email ? { ...u, saldo: novoSaldo } : u
  )

  await AsyncStorage.setItem('@usuarios', JSON.stringify(novaLista))
}

export async function registrarMovimentoSaldo(valor: number, acao: 'deposito' | 'saque'): Promise<number> {
  const saldoAtual = await getSaldoUsuarioLogado()
  let novoSaldo = saldoAtual

  if (acao === 'deposito') {
    novoSaldo += valor
  } else if (acao === 'saque') {
    novoSaldo -= valor
  }

  if (novoSaldo < 0) {
    throw new Error('Saldo insuficiente')
  }

  await atualizarSaldoUsuarioLogado(novoSaldo)

  const transacao = {
    data: new Date().toISOString(),
    tipo: acao,
    valor: valor
  }

  const historicoSalvo = await AsyncStorage.getItem('@transacoes')
  const historicoAtual = historicoSalvo ? JSON.parse(historicoSalvo) : []
  const novoHistorico = [...historicoAtual, transacao]
  await AsyncStorage.setItem('@transacoes', JSON.stringify(novoHistorico))

  return novoSaldo
}

export async function registrarInvestimento(
  ativo: string,
  valor: number,
  tipo: 'aplicacao' | 'resgate'
): Promise<number> {
  const saldoAtual = await getSaldoUsuarioLogado()
  let novoSaldo = saldoAtual

  if (tipo === 'aplicacao') {
    if (valor > saldoAtual) throw new Error('Saldo insuficiente')
    novoSaldo -= valor
  } else if (tipo === 'resgate') {
    novoSaldo += valor
  }

  await atualizarSaldoUsuarioLogado(novoSaldo)

  const novaEntrada = {
    data: new Date().toISOString(),
    tipo,
    ativo,
    valor
  }

  const salvos = await AsyncStorage.getItem('@investimentos')
  const historicoAtual = salvos ? JSON.parse(salvos) : []
  const novoHistorico = [...historicoAtual, novaEntrada]
  await AsyncStorage.setItem('@investimentos', JSON.stringify(novoHistorico))

  return novoSaldo
}
