import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS } from '../theme/colors';
import { GLOBAL_STYLES } from '../theme/styles';
import { ChevronLeft, Wallet, Calendar, Trash2 } from 'lucide-react-native';

const BudgetSettingsScreen = ({ navigation }) => {
  const { budget, updateBudget, resetData } = useApp();
  const [amount, setAmount] = useState(budget?.total?.toString() || '');
  const [startDate, setStartDate] = useState(budget?.startDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(budget?.endDate || '');

  const handleSave = () => {
    if (!amount || !endDate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newBudget = {
      total: parseFloat(amount),
      startDate,
      endDate
    };

    updateBudget(newBudget);
    navigation.goBack();
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to delete all expenses and settings? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset Everything', style: 'destructive', onPress: async () => {
            await resetData();
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={GLOBAL_STYLES.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.text} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budget Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.inputCard}>
          <View style={styles.inputRow}>
            <View style={styles.iconBox}>
              <Wallet size={24} color={COLORS.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>TOTAL BUDGET AMOUNT</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
              />
            </View>
          </View>
        </View>

        <View style={styles.inputCard}>
          <View style={styles.inputRow}>
            <View style={styles.iconBox}>
              <Calendar size={24} color={COLORS.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>START DATE</Text>
              <TextInput
                style={styles.input}
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
              />
            </View>
          </View>
        </View>

        <View style={styles.inputCard}>
          <View style={styles.inputRow}>
            <View style={styles.iconBox}>
              <Calendar size={24} color={COLORS.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>END DATE</Text>
              <TextInput
                style={styles.input}
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="rgba(255, 255, 255, 0.2)"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Apply Budget Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Trash2 size={20} color={COLORS.textSecondary} />
          <Text style={styles.resetButtonText}>Reset All App Data</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10, // Modern SafeAreaView handles the top inset automatically
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
  inputCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  input: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    padding: 0,
  },
  saveButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 16,
  },
  resetButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
  }
});

export default BudgetSettingsScreen;
