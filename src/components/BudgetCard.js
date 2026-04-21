import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { GLOBAL_STYLES } from '../theme/styles';
import { formatCurrency } from '../utils/calculations';
import { TrendingDown, Calendar, Wallet } from 'lucide-react-native';

const BudgetCard = ({ stats }) => {
  if (!stats) return (
    <View style={[GLOBAL_STYLES.card, styles.empty]}>
      <Text style={styles.emptyText}>No budget set for this period</Text>
    </View>
  );

  return (
    <View style={styles.glassContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Remaining Balance</Text>
          <Text style={styles.amount}>{formatCurrency(stats.remaining)}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Wallet color={COLORS.text} size={24} />
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min(100, stats.percentage)}%`, 
                backgroundColor: stats.percentage > 90 ? COLORS.accent : COLORS.success }
            ]} 
          />
        </View>
        <Text style={styles.percentageText}>{Math.round(stats.percentage)}% spent</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <TrendingDown color={COLORS.textSecondary} size={16} />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerLabel}>Daily Limit</Text>
            <Text style={styles.footerValue}>{formatCurrency(stats.dailyLimit)}</Text>
          </View>
        </View>
        <View style={styles.footerItem}>
          <Calendar color={COLORS.textSecondary} size={16} />
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerLabel}>Days Left</Text>
            <Text style={styles.footerValue}>{stats.daysLeft} Days</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  amount: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 20,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerTextContainer: {
    marginLeft: 10,
  },
  footerLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footerValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  empty: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'transparent',
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  }
});

export default BudgetCard;
