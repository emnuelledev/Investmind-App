# 📱 InvestMind — Assessor Virtual de Investimentos
**Desenvolvido para a disciplina: Mobile Development and IoT — FIAP | Challenge XP Inc. 2025**  
**Grupo:** Engenharia de Software — 3ESPV | FEV/2025


## 🎯 Objetivo do App

O **InvestMind** é um aplicativo mobile que funciona como um **assessor virtual de investimentos**, ajudando o usuário a descobrir seu perfil de investidor e a gerenciar sua própria carteira com base em recomendações personalizadas.

Além disso, o app simula movimentações financeiras (aplicações, resgates e transferências) com foco educacional e prático, de forma 100% local e offline.

## 📱 Protótipo no Figma
Acesso ao protótipo no Figma: [clique aqui!](https://www.figma.com/design/Y874nA6l47N07xvXPCuCAt/Prot%C3%B3tipo-Mobile-GS?node-id=0-1&t=JT0R9rtNw8RpN92s-1)


## 🧩 Funcionalidades Desenvolvidas

- 🔐 Tela de login com validação simples
- 🆕 Modal de cadastro com CPF, e-mail e senha
- 🏦 Simulação de saldo com possibilidade de aplicar ou transferir
- 📋 Quiz com 10 perguntas para definição do perfil de investidor
- 📊 Recomendação automática de ativos com base no perfil
- 💼 Visualização da carteira com histórico de aplicações e resgates
- 🔍 Barra de busca por ativos
- ✅ Possibilidade de aplicar e retirar valores de cada ativo
- 📈 Gráfico de ganhos/perdas simulado
- 🕓 Histórico detalhado de:
  - Perfis atribuídos (quiz)
  - Transações de saldo (aplicação e saque)
  - Investimentos feitos
- 🚪 Botão de logout
- 📱 Layout responsivo, moderno e acessível

## ⚙️ Tecnologias e Ferramentas

| Stack               | Descrição                                         |
|--------------------|---------------------------------------------------|
| React Native + Expo| Criação da aplicação mobile multiplataforma       |
| TypeScript         | Tipagem estática e organização de código          |
| React Navigation   | Navegação entre telas                             |
| AsyncStorage       | Persistência local de dados (usuários, saldo etc) |
| Android Studio     | Emulador para testes e desenvolvimento            |
| Figma              | Protótipo visual da solução (em desenvolvimento)  |

## 📐 Estrutura de Telas

| Tela                   | Descrição                                                                 |
|------------------------|--------------------------------------------------------------------------|
| **Login / Cadastro**   | Tela de autenticação e registro do usuário                              |
| **Home**               | Saudação, saldo, perfil atual, gráfico e atalhos                        |
| **Quiz de Perfil**     | Coleta de respostas para cálculo do perfil (conservador, moderado, etc) |
| **Carteira de Investimentos** | Ações disponíveis, carteira atual, saldo e simulações de aplicações     |
| **Histórico**          | Registro completo de quizzes, transações e investimentos feitos         |

## 🧠 Lógica de Recomendação

A carteira recomendada é baseada em critérios respondidos no quiz, como:

- Nível de conhecimento
- Horizonte de tempo
- Tolerância ao risco
- Renda mensal
- Experiência com ativos

Cada perfil recebe 7 recomendações:

- **Conservador**: CDB, Tesouro Selic, Renda Fixa etc.
- **Moderado**: Fundos Multimercado, LCI/LCA, Debêntures etc.
- **Agressivo**: Ações, ETFs, Criptomoedas, BDRs etc.

## 📂 Estrutura de Pastas

```
/src
 ├── components       # Componentes reutilizáveis
 ├── navigation       # Arquivo de rotas com tipagem
 ├── screens          # Telas principais do app (Login, Home, etc)
 ├── types            # Tipagens globais e interfaces
 ├── utils            # Funções auxiliares e regras de negócio
 └── assets           # Imagens como logo, avatar etc.
```

## 🚀 Como rodar o projeto localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/investmind.git
cd investmind
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute o projeto:**

- Em emulador Android:
```bash
npx expo start --android
```

- No Expo Go (celular):
```bash
npx expo start
```

## 🧪 Testes Manuais Realizados

- ✅ Fluxo de login e cadastro
- ✅ Fluxo completo de quiz e recomendação
- ✅ Aplicações e resgates com saldo validado
- ✅ Histórico de todas as ações salvo em `AsyncStorage`
- ✅ Testes realizados no emulador Android Studio
- ✅ Interface funcional e responsiva em múltiplos tamanhos de tela

## ✍️ Integrantes do Grupo

| Nome                  | RM        |
|-----------------------|-----------|
| Emanuelle Soares      | RM97973   |
| Julia Amorim          | RM99609   |
| Lana Leite            | RM551143  |
| Matheus Cavasini      | RM97722   |

## 📘 Observações Finais

- O app foi idealizado e desenvolvido durante o **Challenge XP Inc. 2025 - Assessor Virtual**.
- Todos os dados são salvos localmente (modo offline).
- O projeto foca em **educação financeira, simulação e UX acessível**.
- O repositório está pronto para futura integração com APIs de investimentos reais ou autenticação segura.

## 🪪 Licença

Projeto acadêmico — uso permitido apenas para fins educacionais e não comerciais.
