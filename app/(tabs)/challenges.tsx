// screens/ChallengesScreen.tsx
import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles1 from '../styleSheet';

type Challenge = {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'quiz';
  reward: {
    type: 'points' | 'data' | 'badge' | 'wallpaper';
    value: string | number;
  };
  completed: boolean;
};

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Partilha Social Diária',
    description: 'Partilhe um story com #MocheChallenge',
    type: 'daily',
    reward: { type: 'points', value: 100 },
    completed: false
  },
  {
    id: '2',
    title: 'Check-in Mensal',
    description: 'Faça check-in num evento Moche',
    type: 'monthly',
    reward: { type: 'badge', value: 'Badge VIP' },
    completed: true
  },
  {
    id: '3',
    title: 'Parceria Semanal',
    description: 'Peça Pizza Dominos via Bolt Food',
    type: 'weekly',
    reward: { type: 'points', value: '50' },
    completed: false
  },
  {
    id: '4',
    title: 'Quiz dos Parceiros',
    description: 'Quantas lojas tem a Dominos em Portugal?',
    type: 'quiz',
    reward: { type: 'data', value: '1GB' },
    completed: false
  },
];

const ChallengesScreen = () => {
  const [challenges, setChallenges] = useState(mockChallenges);

  const getRewardIcon = (type: string) => {
    switch(type) {
      case 'points': return '🪙';
      case 'data': return '📶';
      case 'discount': return '🛍️';
      case 'badge': return '🏅';
      case 'wallpaper': return '🖼️';
      default: return '🎁';
    }
  };

  const handleChallengePress = (id: string) => {
    setChallenges(current => 
      current.map(challenge => 
        challenge.id === id ? { ...challenge, completed: true } : challenge
      )
    );
  };

  const renderItem = ({ item }: { item: Challenge }) => (
    <View style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <Text style={styles.challengeType}>
          {item.type === 'daily' && '🔄 Diário'}
          {item.type === 'weekly' && '📅 Semanal'}
          {item.type === 'monthly' && '📆 Mensal'}
          {item.type === 'quiz' && '❓ Quiz'}
        </Text>
        {item.completed && <Text style={styles.completedBadge}>✅ Concluído</Text>}
      </View>
      
      <Text style={styles.challengeTitle}>{item.title}</Text>
      <Text style={styles.challengeDescription}>{item.description}</Text>
      
      <View style={styles.rewardContainer}>
        <Text style={styles.rewardText}>
          {getRewardIcon(item.reward.type)} Recompensa: 
          <Text style={styles.rewardValue}> {item.reward.value}</Text>
        </Text>
      </View>

      {!item.completed && (
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleChallengePress(item.id)}
        >
          <Text style={styles.buttonText}>Participar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles1.container}>
      <View>
        <View style={styles1.header}>
          <Text style={styles1.headerTitle}>Desafios Moche</Text>
          <Text style={styles.headerSubtitle}>Complete desafios e ganhe recompensas!</Text>
        </View>
      
        <FlatList
          data={challenges}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingBottom: 50 }, {paddingTop: 20}]}
          ListFooterComponent={<View style={{ height: 100 }} />} 
        />
      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#800077',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,

  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#FFF9E6',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  challengeType: {
    color: '#12171A',
    fontWeight: '600',
  },
  completedBadge: {
    color: '#2ecc71',
    fontWeight: '600',
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800077',
    marginBottom: 8,
  },
  challengeDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 12,
  },
  rewardContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  rewardText: {
    color: '#F8F8F8',
    fontWeight: '500',
  },
  rewardValue: {
    color: '#12171A',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#B32942',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ChallengesScreen;