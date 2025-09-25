import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Bar } from '../types/bar';
import axiosService from '../service/axiosService';
import { useState, useEffect } from 'react';
import CardBar from '../components/CardBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Favorite'>;


export default function FavoriteScreen({ navigation }: Props) {
  const [favoritesBars, setFavoritesBars] = useState<Bar[]>([]);

  const fetchFavoritesBars = async () => {
    try {
      const res = await axiosService.get<{ favorites: Bar[] }>('/users/favorites');
      setFavoritesBars(res.data.favorites);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
      setFavoritesBars([]);
    }
  }

  useEffect(() => {
    fetchFavoritesBars();
  }, [favoritesBars]);

  return (
    <LinearGradient
      colors={['#1A1A2E', '#545494']}
      locations={[0.6, 1]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Mes Favoris</Text>
        <View style={styles.highlightedBars}>
          {favoritesBars.length === 0 ? (
            <Text style={{ color: '#FFFFFF' }}>Aucun favori pour le moment</Text>
          ) : (
            favoritesBars.map((bar, index) => (
              <CardBar
                key={bar._id}
                bar={bar}
                onPress={() => navigation.navigate('BarDetail', { barId: bar._id })}
                testID={`favorite-cardbar-${index}`}
              />
            ))
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: 600,
    marginBottom: 18
  },
  highlightedBars: {
    width: "100%",
    alignItems: 'center',
    marginBottom: 30
  }
});