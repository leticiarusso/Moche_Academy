// screens/HistoryScreen.js
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import styles1 from './styleSheet';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const icons = {
  desafios: '🏆',
  loja: '🛍️',
  bonus: '🎮'
};

// Dados mockados
const mockHistory = [
  { 
    id: '1',
    type: 'ganhos',
    description: 'Desafio Diário Completo',
    date: '2024-12-15',
    points: '+200',
    category: 'desafios'
  },
  { 
    id: '2',
    type: 'gastos', 
    description: 'Sweat da Moche comprada',
    date: '2025-03-14',
    points: '-2999',
    category: 'loja'
  },
  //...
  { 
    id: '10',
    type: 'ganhos',
    description: 'Jogo realizado',
    date: '2025-03-05',
    points: '+1500',
    category: 'bonus'
  }
];



type RootStackParamList = {
  Home: undefined;
  History: undefined;
};

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'History'>;

const HistoryScreen = () => {
const navigation = useNavigation<HistoryScreenNavigationProp>();
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home'); // Fallback para Home se não houver histórico
    }
  };
  // Calcular totais
  const totalGanhos = mockHistory
    .filter(item => item.type === 'ganhos')
    .reduce((sum, item) => sum + parseInt(item.points), 0);

  const totalGastos = mockHistory
    .filter(item => item.type === 'gastos')
    .reduce((sum, item) => sum + Math.abs(parseInt(item.points)), 0);

  const renderItem = ({ item }: { item: typeof mockHistory[number] }) => (
    <View style={styles.transactionCard}>
      <View style={styles.leftSection}>
        <Text style={styles.categoryIcon}>
          {icons[item.category as keyof typeof icons] || '✨'}
        </Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <Text style={[
        styles.points,
        item.type === 'ganhos' ? styles.positive : styles.negative
      ]}>
        {item.points}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles1.container}>
      {/* Cabeçalho */}
      <View style={styles1.headerWithGoBack}>
        <TouchableOpacity onPress={handleGoBack}> {/* ← Usar        const handleHistoryPress = () => {
          navigation.navigate('History');
        }; a função segura */}
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Pontos</Text>
      </View>

      {/* Resumo */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Pontos Ganhos</Text>
          <Text style={styles.summaryValuePositive}>+{totalGanhos}</Text>
        </View>
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Pontos Gastos</Text>
          <Text style={styles.summaryValueNegative}>-{totalGastos}</Text>
        </View>
      </View>

      {/* Lista de Transações */}
      <FlatList
        data={mockHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma transação encontrada</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#800077',
    padding: 40,
  },
  
  backButton: {
    color: 'white',
    fontSize: 24,
    marginRight: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#666',
    fontSize: 14,
  },
  summaryValuePositive: {
    color: '#2ecc71',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  summaryValueNegative: {
    color: '#e74c3c',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  leftSection: {
    marginRight: 15,
  },
  categoryIcon: {
    fontSize: 28,
  },
  middleSection: {
    flex: 1,
  },
  description: {
    fontWeight: '600',
    color: '#333',
    fontSize: 16,
  },
  date: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positive: {
    color: '#2ecc71',
  },
  negative: {
    color: '#e74c3c',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 30,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default HistoryScreen;