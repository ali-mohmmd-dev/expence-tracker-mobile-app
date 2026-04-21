import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, CATEGORY_COLORS } from '../theme/colors';
import { GLOBAL_STYLES } from '../theme/styles';
import { ChevronLeft, Target } from 'lucide-react-native';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Others'];

const CategorySettingsScreen = ({ navigation }) => {
  const { categoryBudgets, updateCategoryBudget } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState('');

  // Find existing budget for selected category
  const currentBudget = categoryBudgets.find(b => b.category === selectedCategory);

  const handleSave = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Error', 'Please enter a valid monthly amount');
      return;
    }

    const newCB = {
      category: selectedCategory,
      amount: parseFloat(amount),
      month: new Date().toISOString().slice(0, 7) // YYYY-MM
    };

    updateCategoryBudget(newCB);
    setAmount('');
    Alert.alert('Success', `Monthly budget for ${selectedCategory} updated!`);
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Category Targets</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SELECT CATEGORY</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setSelectedCategory(cat);
                  const existing = categoryBudgets.find(b => b.category === cat);
                  setAmount(existing?.amount?.toString() || '');
                }}
                style={[
                  styles.categoryItem,
                  selectedCategory === cat && { backgroundColor: CATEGORY_COLORS[cat] }
                ]}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && { color: '#FFF' }
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputSection}>
          <View style={styles.targetCard}>
            <View style={styles.iconContainer}>
              <Target size={24} color={CATEGORY_COLORS[selectedCategory] || COLORS.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>MONTHLY TARGET FOR {selectedCategory.toUpperCase()}</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.currency}>₹</Text>
                <TextInput
                  style={styles.input}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor="rgba(255, 255, 255, 0.2)"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {currentBudget && (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Current monthly target: <Text style={{ color: '#FFF', fontWeight: '800' }}>₹{currentBudget.amount}</Text>
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Set Category Target</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryList}>
          <Text style={styles.sectionLabel}>ACTIVE TARGETS</Text>
          {categoryBudgets.map((cb) => (
            <View key={cb.category} style={styles.summaryItem}>
              <View style={[styles.summaryDot, { backgroundColor: CATEGORY_COLORS[cb.category] }]} />
              <Text style={styles.summaryName}>{cb.category}</Text>
              <Text style={styles.summaryAmount}>₹{cb.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    backgroundColor: COLORS.surface,
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  categoryText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  inputSection: {
    marginBottom: 40,
  },
  targetCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '800',
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    padding: 0,
  },
  infoBox: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  infoText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: COLORS.surfaceLight,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  summaryList: {
    marginTop: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  summaryName: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  summaryAmount: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '700',
  }
});

export default CategorySettingsScreen;
