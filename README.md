# 📱 InvestMind — Virtual Investment Advisor  
**Developed for the course: Mobile Development and IoT — FIAP | Challenge XP Inc. 2025**  
**Academic Project — Software Engineering (3ESPV), February 2025**

## 🎯 App Objective

**InvestMind** is a mobile application that works as a **virtual investment advisor**, helping users discover their investor profile and manage their own portfolio based on personalized recommendations.

Additionally, the app simulates financial operations (investments, withdrawals, and transfers) with an educational and practical focus — 100% local and offline.

## 📱 Figma Prototype  
Access the Figma prototype: [click here!](https://www.figma.com/design/Y874nA6l47N07xvXPCuCAt/Prot%C3%B3tipo-Mobile-GS?node-id=0-1&t=JT0R9rtNw8RpN92s-1)

## 🧩 Key Features

- 🔐 Login screen with simple validation  
- 🆕 Sign-up modal with CPF, email, and password  
- 🏦 Simulated balance with the ability to invest or transfer  
- 📋 Quiz with 10 questions to determine the investor profile  
- 📊 Automatic asset recommendation based on profile  
- 💼 Portfolio view with investment and withdrawal history  
- 🔍 Search bar for assets  
- ✅ Option to invest and withdraw from each asset  
- 📈 Simulated gain/loss chart  
- 🕓 Detailed history of:
  - Assigned profiles (quiz results)  
  - Balance transactions (deposits and withdrawals)  
  - Past investments  
- 🚪 Logout button  
- 📱 Responsive, modern, and accessible layout  

## ⚙️ Technologies and Tools

| Stack               | Description                                             |
|--------------------|---------------------------------------------------------|
| React Native + Expo| Cross-platform mobile app development                   |
| TypeScript         | Static typing and code structure                        |
| React Navigation   | Screen navigation                                       |
| AsyncStorage       | Local data persistence (users, balance, etc.)           |
| Android Studio     | Emulator for development and testing                    |
| Figma              | Visual prototype of the solution                        |

## 📐 Screen Structure

| Screen                  | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| **Login / Sign-up**     | User authentication and registration screen                                 |
| **Home**                | Welcome message, current balance, profile, chart, and shortcuts             |
| **Profile Quiz**        | Collects answers to define the user's investor profile                      |
| **Investment Portfolio**| Displays available actions, current portfolio, and investment simulation    |
| **History**             | Full record of quizzes, transactions, and investments                       |

## 🧠 Recommendation Logic

The recommended portfolio is based on answers from the quiz, including:

- Knowledge level  
- Investment horizon  
- Risk tolerance  
- Monthly income  
- Experience with financial products  

Each profile receives 7 tailored recommendations:

- **Conservative**: CDB, Treasury Bonds (Tesouro Selic), Fixed Income, etc.  
- **Moderate**: Multimarket Funds, LCI/LCA, Debentures, etc.  
- **Aggressive**: Stocks, ETFs, Cryptocurrencies, BDRs, etc.

## 📂 Folder Structure

```
/src
 ├── components       # Reusable components
 ├── navigation       # Navigation routes and types
 ├── screens          # Main app screens (Login, Home, etc.)
 ├── types            # Global types and interfaces
 ├── utils            # Helper functions and business logic
 └── assets           # Images like logo, avatar, etc.
```

## 🚀 How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/emnuelledev/investmind-app.git
cd investmind-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Run the app:**

- Using Android Emulator:
```bash
npx expo start --android
```

- Using Expo Go (on mobile):
```bash
npx expo start
```

## 🧪 Manual Tests Performed

- ✅ Login and registration flow  
- ✅ Complete quiz and personalized recommendation  
- ✅ Investments and withdrawals with balance validation  
- ✅ All user actions saved in `AsyncStorage`  
- ✅ Tested with Android Studio emulator  
- ✅ Fully responsive interface across multiple screen sizes

## 📘 Final Notes

- This is an **academic project** developed during the **Challenge XP Inc. 2025 – Virtual Advisor Edition**.
- All data is stored locally (offline mode).
- The project focuses on **financial education, simulation, and accessible UX**.
- The app is under continuous improvement and ready for future integration with real APIs or secure authentication systems.

## 🪪 License

Academic use only — non-commercial, educational purposes permitted.
