import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../theme/colors';
import { formatCurrency } from '../utils/calculations';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const CategoryCard = ({ item }) => {
  const color = CATEGORY_COLORS[item.category] || COLORS.accent;

  return (
    <View style={styles.card}>
      <View style={[styles.indicator, { backgroundColor: color }]} />
      <Text style={styles.categoryName} numberOfLines={1}>{item.category}</Text>
      <Text style={styles.amount}>{formatCurrency(item.spent)}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min(100, item.percentage)}%`, backgroundColor: color }
            ]} 
          />
        </View>
        <Text style={styles.percentageText}>{Math.round(item.percentage)}%</Text>
      </View>
      
      <Text style={styles.budgetLimit}>of {formatCurrency(item.budget)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  indicator: {
    width: 32,
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  categoryName: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  amount: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  percentageText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: '700',
  },
  budgetLimit: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
    fontWeight: '500',
  }
});

export default CategoryCard;
