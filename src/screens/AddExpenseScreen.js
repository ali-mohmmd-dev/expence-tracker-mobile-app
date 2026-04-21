import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, CATEGORY_COLORS } from '../theme/colors';
import { GLOBAL_STYLES } from '../theme/styles';
import { ChevronLeft, Calendar as CalendarIcon, Tag, FileText } from 'lucide-react-native';

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Others'];

const AddExpenseScreen = ({ navigation }) => {
  const { addExpense } = useApp();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSave = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      note,
      date
    };

    addExpense(newExpense);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color={COLORS.text} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Expense</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor="rgba(255, 255, 255, 0.2)"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Tag color={COLORS.textSecondary} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Category</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryPicker}
              >
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setCategory(cat)}
                    style={[
                      styles.categoryTab,
                      category === cat && { backgroundColor: `${CATEGORY_COLORS[cat]}20`, borderColor: CATEGORY_COLORS[cat] }
                    ]}
                  >
                    <Text 
                      style={[
                        styles.categoryTabText,
                        category === cat && { color: CATEGORY_COLORS[cat] }
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <FileText color={COLORS.textSecondary} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Note</Text>
              <TextInput
                style={styles.textInput}
                placeholder="What was this for?"
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
                value={note}
                onChangeText={setNote}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <CalendarIcon color={COLORS.textSecondary} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Date</Text>
              <TextInput
                style={styles.textInput}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  currencySymbol: {
    color: COLORS.text,
    fontSize: 40,
    fontWeight: '800',
    marginRight: 10,
  },
  amountInput: {
    color: COLORS.text,
    fontSize: 64,
    fontWeight: '800',
    minWidth: 100,
  },
  inputGroup: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 4,
  },
  inputLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  textInput: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    padding: 0,
  },
  categoryPicker: {
    flexDirection: 'row',
    marginTop: 4,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: 10,
  },
  categoryTabText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 24,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  }
});

export default AddExpenseScreen;
