import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import axiosService from '../service/axiosService';
import { User } from '../types/user';
import { Bar } from '../types/bar';
import CardBar from '../components/CardBar';
import Button from '../components/Button';
import { ScrollView } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { userId, logout } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [managedBars, setManagedBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [name, setName] = useState<string>('');
  
  const [originalUsername, setOriginalUsername] = useState<string>('');
  const [originalEmail, setOriginalEmail] = useState<string>('');
  const [originalFirstName, setOriginalFirstName] = useState<string>('');
  const [originalName, setOriginalName] = useState<string>('');

  const handleLogout = async () => {
    await logout();
  };
  const hasChanges = () => {
    return (
      username !== originalUsername ||
      email !== originalEmail ||
      firstName !== originalFirstName ||
      name !== originalName
    );
  };

  const handleModify = async () => {
    if (!userId || !userData) {
      Alert.alert('Erreur', 'Utilisateur introuvable.');
      return;
    }
        if (!hasChanges()) {
      Alert.alert('Information', 'Aucune modification détectée.');
      return;
    }
    try {
      setLoading(true);
      const payload: any = {
        username,
        email,
        name,
      };
      payload.firstname = firstName;
      const res = await axiosService.put<User>('/users/' + userId, payload);
      setUserData(res.data as any);
      const updated: any = res.data as any;
      setUsername(updated.username || '');
      setEmail(updated.email || '');
      setFirstName((updated as any).firstname || (updated as any).firstName || '');
      setName(updated.name || '');
      
      setOriginalUsername(updated.username || '');
      setOriginalEmail(updated.email || '');
      setOriginalFirstName((updated as any).firstname || (updated as any).firstName || '');
      setOriginalName(updated.name || '');
      
      Alert.alert('Succès', 'Profil mis à jour.');
    } catch (error: any) {
      console.error('Erreur mise à jour utilisateur:', error);
      const msg = error?.response?.data?.message || 'Une erreur est survenue.';
      Alert.alert('Erreur', msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axiosService.get<any>('/users/' + userId);
      setUserData(response.data.user);
      const u = response.data.user || {};
      setUsername(u.username || '');
      setEmail(u.email || '');
      setFirstName(u.firstname || u.firstName || '');
      setName(u.name || '');
      
      setOriginalUsername(u.username || '');
      setOriginalEmail(u.email || '');
      setOriginalFirstName(u.firstname || u.firstName || '');
      setOriginalName(u.name || '');
      
      setManagedBars(response.data.managedBars || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <LinearGradient
      colors={['#1A1A2E', '#545494']}
      locations={[0.6, 1]}
      style={styles.container}
    >
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Mon Profil</Text>
        {loading ? (
          <Text style={styles.text}>Chargement...</Text>
        ) : (
          <>
            <View style={styles.profileCard}>
              <Text style={styles.label}>Nom d'utilisateur</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                placeholderTextColor="#A5A5A5"
                value={username}
                onChangeText={setUsername}
                editable={!loading}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A5A5A5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                placeholderTextColor="#A5A5A5"
                value={firstName}
                onChangeText={setFirstName}
                editable={!loading}
              />
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                placeholderTextColor="#A5A5A5"
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>

            {managedBars.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mes bars gérés</Text>
                <View style={styles.listContent}>
                  {managedBars.map((item, index) => (
                    <View key={item._id}>
                      <CardBar
                        bar={item}
                        onPress={() => navigation.navigate('BarDetail', { barId: item._id })}
                        testID={`managed-bar-${item._id}`}
                      />
                      {index < managedBars.length - 1 && <View style={{ height: 8 }} />}
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button 
                  label={loading ? '...' : 'Modifier'} 
                  onPress={handleModify}
                  disabled={!hasChanges() || loading}
                />
              </View>
              <View style={styles.button}>
                <Button label={loading ? '...' : 'Déconnexion'} onPress={handleLogout} />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 80
  },
  content: {
    width: '100%',
    flex: 1
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 20
  },
  pageTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: 600,
    marginBottom: 18
  },
  profileCard: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10
  },
  label: {
    color: '#A5A5A5',
    fontSize: 14
  },
  value: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 12
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    width: '85%',
    paddingVertical: 4,
    textAlign: 'center',
    fontWeight: 500,
    borderRadius: 8,
    marginBottom: 8
  },
  listContent: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  buttons: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop: 8
  },
  button: {
    width: '48%'
  },
  text: {
    color: '#FFFFFF'
  }
});
