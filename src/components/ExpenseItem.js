import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../theme/colors';
import { formatCurrency } from '../utils/calculations';
import { Trash2 } from 'lucide-react-native';
import { format, parseISO } from 'date-fns';

const ExpenseItem = ({ item, onDelete }) => {
  const categoryColor = CATEGORY_COLORS[item.category] || COLORS.accent;

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${categoryColor}20` }]}>
        <View style={[styles.dot, { backgroundColor: categoryColor }]} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.mainInfo}>
          <Text style={styles.note} numberOfLines={1}>{item.note || item.category}</Text>
          <Text style={styles.amount}>-{formatCurrency(item.amount)}</Text>
        </View>
        <View style={styles.subInfo}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{format(parseISO(item.date), 'MMM dd, yyyy')}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
        <Trash2 size={18} color={COLORS.accent} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  note: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
  },
  amount: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: '800',
  },
  subInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 11,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: 'rgba(229, 57, 53, 0.1)',
    borderRadius: 12,
  }
});

export default ExpenseItem;
