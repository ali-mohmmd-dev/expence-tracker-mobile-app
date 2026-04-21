import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses';
const BUDGET_KEY = 'budget';
const CATEGORY_BUDGETS_KEY = 'categoryBudgets';

export const Storage = {
  // Expenses
  async getExpenses() {
    try {
      const data = await AsyncStorage.getItem(EXPENSES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to fetch expenses', e);
      return [];
    }
  },

  async saveExpense(expense) {
    try {
      const expenses = await this.getExpenses();
      const updated = [expense, ...expenses];
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save expense', e);
    }
  },

  async deleteExpense(id) {
    try {
      const expenses = await this.getExpenses();
      const updated = expenses.filter(e => e.id !== id);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to delete expense', e);
    }
  },

  // Overall Budget
  async getBudget() {
    try {
      const data = await AsyncStorage.getItem(BUDGET_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to fetch budget', e);
      return null;
    }
  },

  async saveBudget(budget) {
    try {
      await AsyncStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
      return budget;
    } catch (e) {
      console.error('Failed to save budget', e);
    }
  },

  // Category Budgets
  async getCategoryBudgets() {
    try {
      const data = await AsyncStorage.getItem(CATEGORY_BUDGETS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to fetch category budgets', e);
      return [];
    }
  },

  async saveCategoryBudget(categoryBudget) {
    try {
      const budgets = await this.getCategoryBudgets();
      const index = budgets.findIndex(b => b.category === categoryBudget.category);
      let updated;
      if (index > -1) {
        updated = [...budgets];
        updated[index] = categoryBudget;
      } else {
        updated = [...budgets, categoryBudget];
      }
      await AsyncStorage.setItem(CATEGORY_BUDGETS_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save category budget', e);
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  }
};
