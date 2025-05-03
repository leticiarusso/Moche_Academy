// screens/ProfileScreen.js
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles1 from '../styleSheet';

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  // Dados do usuário (exemplo)
  const userData = {
    name: 'Mochero123',
    email: 'mochero@example.com',
    avatar: require('../../assets/images/avatar.png'), 
    level: 18,
    currentPoints: 180,
    totalPoints: 4200,
    rank: '#15'
  };

  // Funções de clique
  const handleHistoryPress = () => {
    // Navegue para a tela de histórico (se configurada)
    navigation.navigate('historico');
    //Alert.alert('Em breve!', 'Histórico de pontos estará disponível na próxima atualização.');
  };

  const handleSettingsPress = () => {
    navigation.navigate('definicoes');
    //Alert.alert('Em breve!', 'Definições estarão disponíveis em breve.');
  };

  const handleLogout = () => {
    Alert.alert('Terminar Sessão', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => console.log('Usuário deslogado') }
    ]);
  };

  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor='#800077' />
    <SafeAreaView style={styles1.container}>
      <ScrollView>
        {/* Cabeçalho */}
        <View style={styles1.header}>
          <Text style={styles1.headerTitle}>Meu Perfil</Text>
        </View>

        {/* Avatar e Informações */}
        <View style={styles.avatarSection}>
          <TouchableOpacity activeOpacity={0.7}>
            <Image 
              source={userData.avatar} 
              style={styles.avatar} 
            />
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.currentPoints}</Text>
            <Text style={styles.statLabel}>Pontos Atuais</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.level}</Text>
            <Text style={styles.statLabel}>Nível</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userData.rank}</Text>
            <Text style={styles.statLabel}>Ranking</Text>
          </View>
        </View>

        {/* Conquistas */}
        <Text style={styles.sectionTitle}>🏆 Minhas Conquistas</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsContainer}
        >
          {['🎯 Desafios', '🚀 Nível 10', '💎 Colecionador'].map((title, index) => (
            <View key={index} style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{title.split(' ')[0]}</Text>
              <Text style={styles.achievementTitle}>{title.split(' ')[1]}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Ações */}
        <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton}
          // onPress={handleHistoryPress} 
          onPress={() => {
            navigation.navigate('historico'); // Navega para a tela de histórico
            console.log('Histórico de Pontos')
           }} // Temporário para teste
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>📜 Histórico de Pontos</Text>
        </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSettingsPress}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>⚙️ Definições</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionText, styles.logoutText]}>🚪 Terminar Sessão</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 10,
  },
  header: {
    backgroundColor: '#800077',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFDF80',
  },
  editText: {
    color: '#FFDF80',
    fontWeight: '600',
    textAlign: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  userEmail: {
    color: '#666',
    fontSize: 16,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800077',
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    marginVertical: 10,
  },
  achievementsContainer: {
    paddingHorizontal: 16,
    paddingBottom:10,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  achievementTitle: {
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  actions: {
    margin: 16,
  },
  actionButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionText: {
    color: '#800077',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#B32942',
  },
  logoutText: {
    color: 'white',
  },
});

export default ProfileScreen;