// screens/RankingScreen.js
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles1 from '../styleSheet';

// ======================================
// Dados Estáticos de Exemplo
// ======================================
const mockCurrentRanking = [
  { id: '1', name: 'João Silva', points: 1500, avatar: 'https://example.com/avatar1.jpg' },
  { id: '2', name: 'Maria Santos', points: 1200, avatar: 'https://example.com/avatar2.jpg' },
  { id: '4', name: 'Carlos Oliveira', points: 900, avatar: 'https://example.com/avatar3.jpg' },
  { id: '5', name: 'Simão Bastos', points: 800, avatar: 'https://example.com/avatar3.jpg' },
  { id: '6', name: 'Dulce Barbosa', points: 790, avatar: 'https://example.com/avatar3.jpg' },
  { id: '7', name: 'Euclides Santos', points: 750, avatar: 'https://example.com/avatar3.jpg' },
  { id: '8', name: 'Alexandre Silva', points: 600, avatar: 'https://example.com/avatar3.jpg' },
  { id: '9', name: 'Alexandra Costa', points: 430, avatar: 'https://example.com/avatar3.jpg' },
  { id: '10', name: 'Olga Santos', points: 390, avatar: 'https://example.com/avatar3.jpg' },
  { id: '11', name: 'Pedro Urbano', points: 200, avatar: 'https://example.com/avatar3.jpg' },
];

const mockTotalRanking = [
  { id: 'total-1', name: 'Ana Pereira', totalPoints: 15000, avatar: 'https://example.com/avatar4.jpg' },
  { id: 'total-2', name: 'Rui Fernandes', totalPoints: 14200, avatar: 'https://example.com/avatar5.jpg' },
  { id: 'total-3', name: 'Sofia Gomes', totalPoints: 13800, avatar: 'https://example.com/avatar6.jpg' },
  { id: 'total-4', name: 'Carlos Oliveira', totalPoints: 12900, avatar: 'https://example.com/avatar3.jpg' },
  { id: 'total-5', name: 'Simão Bastos', totalPoints: 11800, avatar: 'https://example.com/avatar3.jpg' },
  { id: 'total-6', name: 'Dulce Barbosa', totalPoints: 10790, avatar: 'https://example.com/avatar3.jpg' },
  { id: 'total-7', name: 'Euclides Santos', totalPoints: 8750, avatar: 'https://example.com/avatar3.jpg' },
  { id: 'total-8', name: 'Alexandre Silva', totalPoints: 6600, avatar: 'https://example.com/avatar3.jpg' },
  { id: 'total-9', name: 'Alexandra Costa', totalPoints: 5520, avatar: 'https://example.com/avatar3.jpg' },
  { id: 'total-10', name: 'Pedro Urbano', totalPoints: 2900, avatar: 'https://example.com/avatar3.jpg' },
];

// ======================================
// Componente Principal
// ======================================
const RankingScreen = () => {
  const [selectedTab, setSelectedTab] = useState('current');

  // Componente de Item do Ranking
  interface User {
    id: string;
    name: string;
    points?: number;
    totalPoints?: number;
    avatar: string;
  }

  const LeaderboardItem = ({ user, index }: { user: User; index: number }) => (
    <View style={styles.item}>
      <View style={styles.leftSection}>
        <Text style={[
          styles.rank, 
          index === 0 && styles.gold,
          index === 1 && styles.silver,
          index === 2 && styles.bronze
        ]}>
          #{index + 1}
        </Text>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
      
      <Text style={styles.points}>
        {selectedTab === 'current' ? user.points : user.totalPoints}
        {selectedTab === 'total' && ' ★'} {/* Ícone para pontos totais */}
      </Text>
    </View>
  );

  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor='#800077' />
        
    <SafeAreaView style={styles1.container}>
      {/* Cabeçalho */}
      <View style={styles1.header}>
        <Text style={styles1.headerTitle}>Ranking Nacional</Text>
      </View>

      {/* Abas de Navegação */}
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'current' && styles.activeTab]}
          onPress={() => setSelectedTab('current')}
        >
          <Text style={styles.tabText}>Pontos Atuais 🏅</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'total' && styles.activeTab]}
          onPress={() => setSelectedTab('total')}
        >
          <Text style={styles.tabText}>Pontos Totais 🌟</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Ranking */}
      <FlatList
        data={
          selectedTab === 'current'
            ? mockCurrentRanking
            : mockTotalRanking.map((item) => ({
                ...item,
                points: item.totalPoints, // Map totalPoints to points
              }))
        }
        renderItem={({ item, index }) => <LeaderboardItem user={item} index={index} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Seu Perfil no Ranking (Opcional) */}
      <View style={styles.yourRank}>
        <Text style={styles.yourRankText}>A Sua Posição: #12</Text>
        <Text style={styles.yourRankPoints}>Seus pontos: 180</Text>
      </View>
    </SafeAreaView>
    </>
  );
};

// ======================================
// Estilos
// ======================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#800077',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#7CD9C8',
    borderRadius: 10,
  },
  tabText: {
    fontWeight: '600',
    color: 'white',
  },
  activeTabText: {
    color: 'white',
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#7CD9C8',
    width: 40,
    textAlign: 'center',
  },
  gold: {
    color: '#FFD700',
  },
  silver: {
    color: '#C0C0C0',
  },
  bronze: {
    color: '#CD7F32',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontWeight: '600',
    color: '#333',
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#12171A',
  },
  yourRank: {
    backgroundColor: '#800077',
    padding: 16,
    margin: 16,
    borderRadius: 10,
  },
  yourRankText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yourRankPoints: {
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default RankingScreen;