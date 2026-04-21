import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';
import { GLOBAL_STYLES } from '../theme/styles';
import BudgetCard from '../components/BudgetCard';
import CategoryCard from '../components/CategoryCard';
import ExpenseItem from '../components/ExpenseItem';
import ActionButton from '../components/ActionButton';
import { calculateBudgetStats, calculateCategoryStats } from '../utils/calculations';
import { Settings, BarChart2 } from 'lucide-react-native';

const HomeScreen = ({ navigation }) => {
  const { expenses, budget, categoryBudgets, deleteExpense } = useApp();

  const budgetStats = useMemo(() => calculateBudgetStats(expenses, budget), [expenses, budget]);
  const categoryStats = useMemo(() => calculateCategoryStats(expenses, categoryBudgets), [expenses, categoryBudgets]);

  const recentExpenses = useMemo(() => expenses.slice(0, 10), [expenses]);

  return (
    <SafeAreaView style={GLOBAL_STYLES.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hey there! 👋</Text>
          <Text style={styles.title}>Your Finances</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('BudgetSettings')}
          >
            <Settings color={COLORS.textSecondary} size={22} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <BudgetCard stats={budgetStats} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category Budgets</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategorySettings')}>
            <Text style={styles.linkText}>Manage</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categoryStats.length > 0 ? (
            categoryStats.map((item, index) => (
              <CategoryCard key={index} item={item} />
            ))
          ) : (
            <View style={styles.emptyCategories}>
              <Text style={styles.emptyText}>No category budgets set</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

        <View style={styles.expenseList}>
          {recentExpenses.length > 0 ? (
            recentExpenses.map((item) => (
              <ExpenseItem 
                key={item.id} 
                item={item} 
                onDelete={deleteExpense} 
              />
            ))
          ) : (
            <View style={styles.emptyExpenses}>
              <Text style={styles.emptyText}>No expenses yet. Tap + to add one!</Text>
            </View>
          )}
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      <ActionButton onPress={() => navigation.navigate('AddExpense')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 16,
    marginLeft: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
  },
  linkText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryList: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  expenseList: {
    paddingHorizontal: 24,
  },
  emptyCategories: {
    width: 200,
    height: 120,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyExpenses: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default HomeScreen;
