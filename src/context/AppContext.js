import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '../storage/storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [categoryBudgets, setCategoryBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [e, b, cb] = await Promise.all([
      Storage.getExpenses(),
      Storage.getBudget(),
      Storage.getCategoryBudgets()
    ]);
    setExpenses(e);
    setBudget(b);
    setCategoryBudgets(cb);
    setLoading(false);
  };

  const addExpense = async (expense) => {
    const updated = await Storage.saveExpense(expense);
    setExpenses(updated);
  };

  const deleteExpense = async (id) => {
    const updated = await Storage.deleteExpense(id);
    setExpenses(updated);
  };

  const updateBudget = async (newBudget) => {
    const updated = await Storage.saveBudget(newBudget);
    setBudget(updated);
  };

  const updateCategoryBudget = async (newCB) => {
    const updated = await Storage.saveCategoryBudget(newCB);
    setCategoryBudgets(updated);
  };

  const resetData = async () => {
    await Storage.clearAll();
    setExpenses([]);
    setBudget(null);
    setCategoryBudgets([]);
  };

  return (
    <AppContext.Provider value={{
      expenses,
      budget,
      categoryBudgets,
      loading,
      addExpense,
      deleteExpense,
      updateBudget,
      updateCategoryBudget,
      resetData,
      refreshData: loadData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
