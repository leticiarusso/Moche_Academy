// screens/SettingsScreen.js
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import styles1 from './styleSheet';

type RootStackParamList = {
    Home: undefined;
    settings: undefined;
    ChangePassword: undefined; // Added ChangePassword route
    ChangeEmail: undefined; // Added ChangeEmail route
  };
  
  type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'settings'>;

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home'); // Fallback para Home se não houver histórico
    }
  };
    // Estados para os switches
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometric, setBiometric] = useState(false);

  // Dados da conta (mock)
  const userInfo = {
    email: 'mochero@example.com',
    phone: '+351 123 456 789'
  };

  // Seções configuraveis
  const settingsSections = [
    {
      title: 'Conta',
      items: [
        { 
          icon: '📧', 
          title: 'Alterar Email', 
          action: () => navigation.navigate('ChangeEmail'),
        },
        { 
          icon: '🔒', 
          title: 'Alterar Palavra-Passe', 
          action: () => navigation.navigate('ChangePassword'),
        },
      ]
    },
    {
      title: 'Preferências',
      items: [
        { 
          icon: '🔔', 
          title: 'Notificações', 
          component: (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              thumbColor="#FFFFFF"
              trackColor={{ false: '#767577', true: '#CCB3FF' }}
            />
          )
        },
        { 
          icon: '🌙', 
          title: 'Modo Escuro', 
          component: (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              thumbColor="#FFFFFF"
              trackColor={{ false: '#767577', true: '#CCB3FF' }}
            />
          )
        },
      ]
    },
    {
      title: 'Privacidade',
      items: [
        { 
          icon: '🛡️', 
          title: 'Autenticação Biométrica', 
          component: (
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              thumbColor="#FFFFFF"
              trackColor={{ false: '#767577', true: '#CCB3FF' }}
            />
          )
        },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles1.container}>
      <ScrollView>
        {/* Cabeçalho */}
        <View style={styles1.headerWithGoBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Definições</Text>
        </View>

        {/* Informações da Conta */}
        <View style={styles.accountCard}>
          <Text style={styles.sectionTitle}>Conta Moche</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userInfo.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Telemóvel:</Text>
            <Text style={styles.infoValue}>{userInfo.phone}</Text>
          </View>
        </View>

        {/* Seções de Configuração */}
        {settingsSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex} 
                style={styles.settingItem}
                // onPress={item.action ? item.action : undefined}
                activeOpacity={0.7}
              >
                <Text style={styles.itemIcon}>{item.icon}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemRight}>
                  {item.component || <Text style={styles.chevron}>›</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity 
          style={[styles.button, styles.logoutButton]}
          onPress={() => alert('Terminar Sessão')}
        >
          <Text style={styles.logoutText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: '#CCB3FF',
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
  accountCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoLabel: {
    color: '#666',
    fontSize: 16,
  },
  infoValue: {
    color: '#333',
    fontWeight: '500',
  },
  section: {
    margin: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#CCB3FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  itemIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  itemRight: {
    marginLeft: 10,
  },
  chevron: {
    fontSize: 24,
    color: '#666',
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: '#FF5959',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;