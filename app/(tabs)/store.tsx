// screens/StoreScreen.tsx
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles1 from "../styleSheet";

const { width } = Dimensions.get("window");

// Dados de exemplo alinhados com HomeScreen
const fashionItems = [
  {
    id: "1",
    name: "Calcas Moche",
    price: 34.95,
    points: 34950,
    image: require("../../assets/Basicos/calcas.png"),
    category: "Basic",
  },
  {
    id: "2",
    name: "Hoodie Moche",
    price: 39.95,
    points: 39950,
    image: require("../../assets/Basicos/hoodie.png"),
    category: "Basic",
  },
  {
    id: "3",
    name: "Meias Moche oferta 5GB",
    price: 9.95,
    points: 9950,
    image: require("../../assets/Basicos/meias.png"),
    category: "Basic",
  },
  {
    id: "4",
    name: "Sweat Moche",
    price: 29.99,
    points: 2999,
    image: require("../../assets/Basicos/sweat.png"),
    category: "Basic",
  },
  {
    id: "5",
    name: "T-Shirt Moche oferta 10GB",
    price: 24.95,
    points: 24950,
    image: require("../../assets/Basicos/t-shirt.png"),
    category: "Basic",
  },
  {
    id: "6",
    name: "Meias Domino's",
    price: 29.99,
    points: 2999,
    image: require("../../assets/collab/meias.png"),
    category: "new",
  },
  {
    id: "7",
    name: "Panama Domino's",
    price: 19.95,
    points: 19950,
    image: require("../../assets/collab/panama.png"),
    category: "new",
  },
  {
    id: "8",
    name: "Sweat Domino's",
    price: 34.95,
    points: 34950,
    image: require("../../assets/collab/sweat.png"),
    category: "new",
  }
];

const mobilePlans = [
  {
    id: "p1",
    name: "Moche 200 GB",
    price: 11.00,
    data: "200 GB 5G",
    benefits: ["Roaming", "10000 minutos + SMS"],
  },
  {
    id: "p2",
    name: "Moche 400 GB",
    price: 13.00,
    data: "400 GB 5G",
    benefits: ["Roaming", "10000 minutos + SMS"],
  },
  {
    id: "p3",
    name: "Moche 1.000 GB",
    price: 15.00,
    data: "1000 GB 5G",
    benefits: ["Roaming", "10000 minutos + SMS"],
  }

];

const StoreScreen = () => {
  const [activeTab, setActiveTab] = useState("fashion");

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <View
          style={[
            styles.badge,
            item.category === "new" ? styles.newBadge : styles.basicBadge,
          ]}
        >
          <Text style={styles.badgeText}>
            {item.category === "new" ? "NEW" : "BASIC"}
          </Text>
        </View>
      </View>

      <Text style={styles.productName}>{item.name}</Text>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          €{item.price ? item.price.toFixed(2) : "N/A"}
        </Text>
        <Text style={styles.points}>🪙 {item.points} pontos</Text>
      </View>

      <TouchableOpacity style={styles.buyButton} activeOpacity={0.7}>
        <Text style={styles.buyButtonText}>Adquirir</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPlanItem = ({ item }) => (
    <View style={styles.planCard}>
      <Text style={styles.planTitle}>{item.name}</Text>
      <Text style={styles.planPrice}>€{item.price.toFixed(2)}/mês</Text>

      <View style={styles.benefitsContainer}>
        <Text style={styles.benefit}>📶 Dados {item.data}</Text>
        <Text style={styles.benefit}>🌍 {item.benefits.join(" • ")}</Text>
      </View>

      <TouchableOpacity style={styles.planButton} activeOpacity={0.7}>
        <Text style={styles.planButtonText}>Selecionar Plano</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#800077" />

      <SafeAreaView style={styles1.container}>
        <View style={styles1.header}>
          <Text style={styles1.headerTitle}>Loja Moche</Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "fashion" && styles.activeTab]}
            onPress={() => setActiveTab("fashion")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "fashion" && styles.activeTabText,
              ]}
            >
              🛍️ Moda
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "plans" && styles.activeTab]}
            onPress={() => setActiveTab("plans")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "plans" && styles.activeTabText,
              ]}
            >
              📱 Tarifários
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "fashion" ? (
          <FlatList
            key="fashion-list"
            data={fashionItems}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={[styles.plansList , { paddingBottom: 50 }]}
          />
        ) : (
          <FlatList
            key="plans-list"
            data={mobilePlans}
            renderItem={renderPlanItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[styles.plansList , { paddingBottom: 50 }]}
            
          />
        )}
      </SafeAreaView>
    </>
  );
};


// Estilos consistentes com outras telas
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#800077",
    padding: 20,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop:16, 
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "#EEE",
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#7CD9C8",
  },
  tabText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  activeTabText: {
    color: "white",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    resizeMode: "contain",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadge: {
    backgroundColor: "#037480",
  },
  basicBadge: {
    backgroundColor: "#B32942",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    marginBottom: 8,
  },
  price: {
    color: "#800077",
    fontSize: 18,
    fontWeight: "bold",
  },
  points: {
    color: "#12171A",
    fontSize: 14,
  },
  buyButton: {
    backgroundColor: "#800077",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  planCard: {
    backgroundColor: "#F0E6FF",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  planTitle: {
    color: "FFDF80",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  planPrice: {
    color: "#800077",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  benefitsContainer: {
    marginBottom: 16,
  },
  benefit: {
    color: "black",
    fontSize: 16,
    marginBottom: 8,
  },
  planButton: {
    backgroundColor: "#800077",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  planButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  plansList: {
    paddingBottom: 20,
  },
});

export default StoreScreen;
