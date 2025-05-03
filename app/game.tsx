

// // screens/GameScreen.tsx
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from "@react-navigation/native";
// import { BlurView } from 'expo-blur';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import * as React from "react";
// import { useEffect, useState } from "react";
// import styles1 from "../styleSheet";

// import {
//   Alert,
//   Animated,
//   Dimensions,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";

// const { width } = Dimensions.get("window");
// const CARD_SIZE = (width - 40) / 4 - 10;

// // Cartas temporárias (substituir por imagens reais)
// const cardImages = ["🎮", "🌟", "📶", "🎁", "🏆", "🛍️", "📱", "💎"];

// type Card = {
//   id: string;
//   value: string;
//   isFlipped: boolean;
//   isMatched: boolean;
//   flipAnimation: Animated.Value;
// };

// type RootStackParamList = {
//   Home: { points: number }; // Home screen expects a 'points' parameter
//   game: undefined; // Game screen does not expect any parameters
// };

// const GameScreen = ({ route }: { route: { params: { points: number } } }) => {
//   const navigation = useNavigation();
//   const [cards, setCards] = useState<Card[]>([]);
//   const [flippedCards, setFlippedCards] = useState<number[]>([]);
//   const [moves, setMoves] = useState(0);
//   const [time, setTime] = useState(0);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [gameFinished, setGameFinished] = useState(false);
//   const router = useRouter()
//   const params = useLocalSearchParams()
//   const points = Number(params.points)
//   const timerRef = React.useRef<NodeJS.Timeout>();

//   // Inicializar jogo
//   useEffect(() => {
//     if (points < 1000) {
//       Alert.alert(
//         "Pontos Insuficientes",
//         "Necessita de 1000 pontos para jogar!",
//         [{ text: "OK", onPress: () => router.back() }]
//       );
//       return;
//     }

//     initializeGame();
//     startTimer();

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, []);

//   // Restart game when exiting tab if game is finished
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('blur', () => {
//       if (gameFinished) {
//         initializeGame();
//         setTime(0);
//         setMoves(0);
//         setGameFinished(false);
//         setGameStarted(true);
//         startTimer();
//       }
//     });

//     return unsubscribe;
//   }, [navigation, gameFinished]);

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setTime((prev) => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
//   };

//   const initializeGame = () => {
//     const duplicatedCards = [...cardImages, ...cardImages]
//       .sort(() => Math.random() - 0.5)
//       .map((value, index) => ({
//         id: `${index}-${value}`,
//         value,
//         isFlipped: false,
//         isMatched: false,
//         flipAnimation: new Animated.Value(0)
//       }));

//     setCards(duplicatedCards);
//     setGameStarted(true);
//   };

//   const flipCard = (index: number) => {
//     const newCards = [...cards];
//     newCards[index].isFlipped = true;
//     setCards(newCards);

//     Animated.spring(cards[index].flipAnimation, {
//       toValue: 1,
//       useNativeDriver: true,
//       tension: 10,
//       friction: 8,
//     }).start();
//   };

//   const handleCardPress = (index: number) => {
//     if (!gameStarted || cards[index].isMatched || flippedCards.length === 2)
//       return;

//     flipCard(index);
//     const newFlipped = [...flippedCards, index];
//     setFlippedCards(newFlipped);

//     if (newFlipped.length === 2) {
//       setMoves((prev) => prev + 1);
//       checkMatch(newFlipped);
//     }
//   };

//   const checkMatch = (flipped: number[]) => {
//     const [first, second] = flipped;

//     if (cards[first].value === cards[second].value) {
//       const newCards = [...cards];
//       newCards[first].isMatched = true;
//       newCards[second].isMatched = true;
//       setCards(newCards);

//       if (newCards.every((card) => card.isMatched)) {
//         endGame(true);
//       }
//     } else {
//       setTimeout(() => {
//         const newCards = [...cards];
//         newCards[first].isFlipped = false;
//         newCards[second].isFlipped = false;
//         setCards(newCards);

//         Animated.parallel([
//           Animated.spring(cards[first].flipAnimation, {
//             toValue: 0,
//             useNativeDriver: true,
//             tension: 10,
//             friction: 8,
//           }),
//           Animated.spring(cards[second].flipAnimation, {
//             toValue: 0,
//             useNativeDriver: true,
//             tension: 10,
//             friction: 8,
//           }),
//         ]).start();
//       }, 1000);
//     }

//     setFlippedCards([]);
//   };

//   const endGame = (success: boolean) => {
//     setGameStarted(false);
//     setGameFinished(true);
//     stopTimer();
//     const newPoints = success ? Math.floor(1000 * (1 + Math.random() * 2)) : 0;

//     Alert.alert(
//       success ? "Parabéns!" : "Fim do Jogo",
//       success ? `Ganhou ${newPoints} pontos extras!` : "Tente novamente!",
//       [
//         {
//           text: "OK",
//           onPress: () => router.push({
//             pathname: '/',
//             params: { points: newPoints}
//           }),
//         },
//       ]
//     );
//   };

//   const renderCard = ({ item, index }: { item: Card; index: number }) => {
//     const flipRotation = item.flipAnimation.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '180deg']
//     });

//     const backRotation = item.flipAnimation.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['180deg', '360deg']
//     });

//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => handleCardPress(index)}
//         disabled={item.isMatched}
//       >
//         <Animated.View
//           style={[
//             styles.card,
//             styles.cardFront,
//             {
//               transform: [{ rotateY: flipRotation }],
//               backgroundColor: item.isMatched ? '#2ecc71' : '#12171A',
//             }
//           ]}
//         >
//           <Text style={styles.cardText}>?</Text>
//         </Animated.View>
//         <Animated.View
//           style={[
//             styles.card,
//             styles.cardBack,
//             {
//               transform: [{ rotateY: backRotation }],
//               backgroundColor: item.isMatched ? '#2ecc71' : '#800077',
//             }
//           ]}
//         >
//           <Text style={styles.cardText}>{item.value}</Text>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles1.container}>
//       <View style={styles1.header}>
//         <Text style={styles1.headerTitle}>Moche Memory Game</Text>
//         <View style={styles.statsContainer}>
//           <View style={styles.statItem}>
//             <Ionicons name="time-outline" size={20} color="#FFD700" />
//             <Text style={styles.statText}>{time}s</Text>
//           </View>
//           <View style={styles.statItem}>
//             <Ionicons name="refresh-outline" size={20} color="#FFD700" />
//             <Text style={styles.statText}>{moves}</Text>
//           </View>
//         </View>
//       </View>

//       <FlatList
//         data={cards}
//         renderItem={renderCard}
//         keyExtractor={(item) => item.id}
//         numColumns={4}
//         contentContainerStyle={styles.grid}
//         style={styles.gameContainer}
//         ListFooterComponent={
//           <BlurView intensity={80} style={styles.footer}>
//             <Text style={styles.footerText}>
//               Custo: 🪙1000 pontos | Prémios: 2-3x pontos, dados móveis, ou bilhetes
//             </Text>
//           </BlurView>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//   },
//   header: {
//     backgroundColor: "#800077",
//     padding: 20,
//     alignItems: "center",
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   title: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     gap: 20,
//     marginTop: 10,
//   },
//   statItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   statText: {
//     color: '#FFD700',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   gameContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   grid: {
//     justifyContent: 'center',
//     paddingBottom: 20,
//   },
//   cardContainer: {
//     width: CARD_SIZE,
//     height: CARD_SIZE,
//     margin: 5,
//     borderRadius: 10,
//   },
//   card: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backfaceVisibility: 'hidden',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   cardFront: {
//     backgroundColor: '#12171A',
//   },
//   cardBack: {
//     backgroundColor: '#800077',
//   },
//   cardText: {
//     fontSize: 32,
//     color: 'white',
//   },
//   footer: {
//     padding: 15,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     marginTop: 20,
//   },
//   footerText: {
//     textAlign: 'center',
//     color: '#800077',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// export default GameScreen;


// screens/GameScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from "react";
import { useEffect, useState } from "react";
import styles1 from "./styleSheet";

import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_SIZE = (width - 40) / 4 - 10;

// Cartas temporárias (substituir por imagens reais)
const cardImages = ["🎮", "🌟", "📶", "🎁", "🏆", "🛍️", "📱", "💎"];

type Card = {
  id: string;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  flipAnimation: Animated.Value;
};

type RootStackParamList = {
  Home: { points: number }; // Home screen expects a 'points' parameter
  game: undefined; // Game screen does not expect any parameters
};

const GameScreen = ({ route }: { route: { params: { points: number } } }) => {
  const navigation = useNavigation();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const router = useRouter()
  const params = useLocalSearchParams()
  const points = Number(params.points)
  const timerRef = React.useRef<NodeJS.Timeout>();

  // Inicializar jogo
  useEffect(() => {
    if (points < 1000) {
      Alert.alert(
        "Pontos Insuficientes",
        "Necessita de 1000 pontos para jogar!",
        [{ text: "OK", onPress: () => router.back() }]
      );
      return;
    }

    initializeGame();
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Restart game when exiting tab if game is finished
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (gameFinished) {
        initializeGame();
        setTime(0);
        setMoves(0);
        setGameFinished(false);
        setGameStarted(true);
        startTimer();
      }
    });

    return unsubscribe;
  }, [navigation, gameFinished]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const initializeGame = () => {
    const duplicatedCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: `${index}-${value}`,
        value,
        isFlipped: false,
        isMatched: false,
        flipAnimation: new Animated.Value(0)
      }));

    setCards(duplicatedCards);
    setGameStarted(true);
  };

  const flipCard = (index: number) => {
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    Animated.spring(cards[index].flipAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 10,
      friction: 8,
    }).start();
  };

  const handleCardPress = (index: number) => {
    if (!gameStarted || cards[index].isMatched || flippedCards.length === 2)
      return;

    flipCard(index);
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const newMoves = moves + 1;
      setMoves(newMoves);
      
      // Check if moves exceed limit
      if (newMoves > 30) {
        endGame(false);
        return;
      }
      
      checkMatch(newFlipped);
    }
  };

  const checkMatch = (flipped: number[]) => {
    const [first, second] = flipped;

    if (cards[first].value === cards[second].value) {
      const newCards = [...cards];
      newCards[first].isMatched = true;
      newCards[second].isMatched = true;
      setCards(newCards);

      if (newCards.every((card) => card.isMatched)) {
        endGame(true);
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[first].isFlipped = false;
        newCards[second].isFlipped = false;
        setCards(newCards);

        Animated.parallel([
          Animated.spring(cards[first].flipAnimation, {
            toValue: 0,
            useNativeDriver: true,
            tension: 10,
            friction: 8,
          }),
          Animated.spring(cards[second].flipAnimation, {
            toValue: 0,
            useNativeDriver: true,
            tension: 10,
            friction: 8,
          }),
        ]).start();
      }, 1000);
    }

    setFlippedCards([]);
  };

  const endGame = (success: boolean) => {
    setGameStarted(false);
    setGameFinished(true);
    stopTimer();
    const newPoints = success ? Math.floor(1000 * (1 + Math.random() * 2)) : 0;

    Alert.alert(
      success ? "Parabéns!" : "Fim do Jogo",
      success ? `Ganhou ${newPoints} pontos extras!` : "Excedeu o limite de 30 movimentos!",
      [
        {
          text: "OK",
          onPress: () => router.push({
            pathname: '/',
            params: { points: newPoints}
          }),
        },
      ]
    );
  };

  const renderCard = ({ item, index }: { item: Card; index: number }) => {
    const flipRotation = item.flipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });

    const backRotation = item.flipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg']
    });

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCardPress(index)}
        disabled={item.isMatched}
      >
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            {
              transform: [{ rotateY: flipRotation }],
              backgroundColor: item.isMatched ? '#2ecc71' : '#36454D',
            }
          ]}
        >
          <Text style={styles.cardText}>?</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ rotateY: backRotation }],
              backgroundColor: item.isMatched ? '#2ecc71' : '#F0E6FF',
            }
          ]}
        >
          <Text style={styles.cardText}>{item.value}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles1.container}>
      <View style={styles1.header}>
        <Text style={styles1.headerTitle}>Moche Memory Game</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={20} color="#FFD700" />
            <Text style={styles.statText}>{time}s</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="refresh-outline" size={20} color="#FFD700" />
            <Text style={styles.statText}>{moves}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.grid}
        style={styles.gameContainer}
        ListFooterComponent={
          <BlurView intensity={80} style={styles.footer}>
            <Text style={styles.footerText}>
              Custo: 🪙200 pontos | Prémios: 2-3x pontos, dados móveis, ou bilhetes
            </Text>
          </BlurView>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#800077",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
  gameContainer: {
    flex: 1,
    padding: 20,
  },
  grid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  cardContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 5,
    borderRadius: 10,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardFront: {
    color: 'FFDF80',
    backgroundColor: 'FFDF80',
  },
  cardBack: {
    backgroundColor: '#7CD9C8',
  },
  cardText: {
    fontSize: 32,
    color: 'white',
  },
  footer: {
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#800077',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default GameScreen;
