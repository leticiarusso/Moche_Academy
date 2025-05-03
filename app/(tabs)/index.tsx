// screens/HomeScreen.js
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styles1 from "../styleSheet";

// ======================================
// Dados Estáticos (Exemplo)
// ======================================
const mockChallenges = [
  { id: "1", title: "Poste um Story #Moche", points: 200 },
  { id: "2", title: "Desafio Semanal: Quiz", points: 500 },
  { id: "3", title: "Convide um Amigo", points: 300 },
];

const mockRanking = [
  {
    id: "1",
    name: "João Silva",
    points: 1500,
    avatar: require("../../assets/images/avatar2.png"),
    
  },
  {
    id: "2",
    name: "Maria Santos",
    points: 1200,
    avatar: require("../../assets/images/avatar3.png"),
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    points: 900,
    avatar: require("../../assets/images/avatar4.png"),
  },
];

const mockStoreItems = [
  {
    id: "1",
    name: "Calcas Moche",
    price: 34950,
    image: require("../../assets/Basicos/calcas.png"),
  },
  {
    id: "2",
    name: "Hoodie Moche",
    price: 39950,
    image: require("../../assets/Basicos/hoodie.png"),
  },
];

const userPoints = 1000;

// ======================================
// Componente HomeScreen
// ======================================
const HomeScreen = () => {
  const handleGamePress = () => {
    navigation.navigate('game', { points: userPoints });
    //Alert.alert('Em breve!', 'Definições estarão disponíveis em breve.');
  };
  // ------------------------------------
  // Função para Renderizar Desafios
  // ------------------------------------
  interface ChallengeItem {
    id: string;
    title: string;
    points: number;
  }

  type RootStackParamList = {
    Home: { points: number }; // Home screen expects a 'points' parameter
    game:  {points: number }; // Game screen does not expect any parameters
  };
  
  type gameScreenNavigationProp = StackNavigationProp<RootStackParamList, "game">;

  const navigation = useNavigation<gameScreenNavigationProp>();
  // Update the renderChallengeItem function
  const renderChallengeItem = (itemData: { item: ChallengeItem }) => {
    const item = itemData.item; // Extract the item from the object

    return (
      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengePoints}>🪙 {item.points} pontos</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Participar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // ------------------------------------
  // Função para Renderizar Ranking
  // ------------------------------------
  const renderRankingItem = (itemData: { item: any; index: any }) => {
    // itemData contém { item, index }
    const item = itemData.item;
    const index = itemData.index;

    return (
      <View style={styles.rankingItem}>
        <Text style={styles.rankingPosition}>{index + 1}º</Text>
        <Image source={ item.avatar } style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userPoints}>{item.points} pontos</Text>
        </View>
      </View>
    );
  };

  // ------------------------------------
  // Renderização Principal
  // ------------------------------------
  return (
    <>
      <SafeAreaView style={[styles1.container, { flex: 1 }]}>
        <StatusBar backgroundColor="#800077" />
        {/* Cabeçalho */}
        <View style={styles1.header}>
          <Text style={styles1.headerTitle}>Bem-vindo à Moche!</Text>
        </View>


        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} 
  showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }} >

        {/* Seção de Desafios */}
        <Text style={styles.sectionTitle}>Desafios Ativos 🔥</Text>
        <FlatList
          data={mockChallenges}
          renderItem={renderChallengeItem} // Passa o objeto itemData automaticamente
          keyExtractor={(item) => item.id} // Garanta que cada item tem uma "id" única
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        
        
        
        <TouchableOpacity
          style={styles.gameButton}
          onPress={handleGamePress}
        >
          <Text style={styles.gameButtonText}>🎮 Jogar (200 pontos)</Text>
        
        </TouchableOpacity>




        {/* Seção de Ranking */}
        <Text style={styles.sectionTitle}>Ranking Nacional 🏆</Text>
        <FlatList
          data={mockRanking}
          renderItem={renderRankingItem} // Passa itemData com item e index
          keyExtractor={(item) => item.id}
        />

        {/* Seção da Loja */}
        <Text style={styles.sectionTitle}>Loja Moche 🛒</Text>
        <View style={styles.storeContainer}>
          {mockStoreItems.map((item) => (
            <View key={item.id} style={styles.storeItem}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>🪙 {item.price} pontos</Text>
            </View>
          ))}
        </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

// Estilos (organizados no final para melhor visualização)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView:{
    marginHorizontal: 15,
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#800077", // Roxo da Moche
    padding: 20,
    borderRadius: 10,
    marginVertical: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 12,
  },
  challengeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginRight: 12,
    width: 250,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  challengePoints: {
    color: "#12171A",
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#F0E6FF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  rankingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  rankingPosition: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
    color: "#800077",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "600",
    fontSize: 16,
  },
  userPoints: {
    color: "#666",
  },
  storeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  storeItem: {
    backgroundColor: "white",
    width: "48%",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontWeight: "600",
    marginBottom: 4,
  },
  gameButton: {
    backgroundColor: '#FFF9E6',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  gameButtonText: {
    color: '#12171A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemPrice: {
    color: "#12171A",
    fontWeight: "bold",
  },
});

export default HomeScreen;
