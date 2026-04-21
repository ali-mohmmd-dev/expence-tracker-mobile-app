import { differenceInDays, parseISO, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

export const calculateBudgetStats = (expenses, budget) => {
  if (!budget) return null;

  const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const remaining = budget.total - totalSpent;
  
  const today = new Date();
  const end = parseISO(budget.endDate);
  const daysLeft = Math.max(0, differenceInDays(end, today) + 1);
  
  const dailyLimit = daysLeft > 0 ? remaining / daysLeft : 0;

  return {
    totalSpent,
    remaining,
    daysLeft,
    dailyLimit,
    percentage: (totalSpent / budget.total) * 100
  };
};

export const calculateCategoryStats = (expenses, categoryBudgets) => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const stats = categoryBudgets.map(cb => {
    const categoryExpenses = expenses.filter(exp => 
      exp.category === cb.category && 
      isWithinInterval(parseISO(exp.date), { start: monthStart, end: monthEnd })
    );

    const spent = categoryExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const remaining = cb.amount - spent;
    const percentage = (spent / cb.amount) * 100;

    return {
      category: cb.category,
      budget: cb.amount,
      spent,
      remaining,
      percentage
    };
  });

  return stats;
};

export const formatCurrency = (amount) => {
  return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
};
