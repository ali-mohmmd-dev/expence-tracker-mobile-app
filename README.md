# Expense Tracker Mobile App

A simple Expo-based expense tracker for React Native that helps users manage spending, set budgets, and track category targets.

## Features

- Home dashboard with:
  - total budget overview
  - remaining balance
  - daily spending limit
  - category budget tracking
  - recent transactions list
- Add expense screen with:
  - amount input
  - category selector
  - note field
  - date input
- Budget settings screen with:
  - total budget amount
  - start and end date
  - reset all stored app data
- Category settings screen with:
  - monthly budget targets by category
  - active target summary
- Persistent storage using `@react-native-async-storage/async-storage`

## Tech stack

- Expo
- React Native
- React Navigation
- AsyncStorage
- date-fns
- lucide-react-native icons

## Project structure

- `App.js` - app entrypoint and stack navigator
- `app.json` - Expo app configuration
- `package.json` - dependencies and scripts
- `src/context/AppContext.js` - global app state and storage helpers
- `src/storage/storage.js` - AsyncStorage persistence layer
- `src/screens/` - app screens
  - `HomeScreen.js`
  - `AddExpenseScreen.js`
  - `BudgetSettingsScreen.js`
  - `CategorySettingsScreen.js`
- `src/components/` - reusable UI cards and action button
- `src/theme/` - app colors and global styles
- `src/utils/calculations.js` - budget and category statistics

## Installation

1. Clone the repo

```bash
git clone https://github.com/ali-mohmmd-dev/expence-tracker-mobile-app.git
cd "expence tracker"
```

2. Install dependencies

```bash
npm install
```

3. Start the Expo development server

```bash
npm run start
```

4. Run on a device or simulator

```bash
npm run android
npm run ios
npm run web
```

## Usage

- Open the app and set your overall budget in the Budget Settings screen.
- Add category targets in the Category Settings screen.
- Use the Home screen to monitor your spending progress and recent transactions.
- Tap the `+` button to add a new expense.
- Delete expenses from the transaction list if needed.

## Notes

- All app data is stored locally on the device using AsyncStorage.
- The category budget summary calculates spending for the current month only.
- Expense amounts are entered using numeric input and saved with a unique timestamp-based ID.

## Scripts

- `npm start` - start Expo CLI
- `npm run android` - open on Android device/emulator
- `npm run ios` - open on iOS device/simulator
- `npm run web` - open in web browser

## License

This repository does not include a license file.
  
