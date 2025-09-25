import { AntDesign } from '@expo/vector-icons';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NavBar({ testID }: {testID?: string}) {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      {/* Home */}
      <Pressable onPress={() => navigation.navigate('Home')}>
        <AntDesign
          name="home"
          size={24}
          color={route.name === 'Home' ? '#007AFF' : 'black'}
        />
      </Pressable>
      {/* Search */}
      <Pressable onPress={() => navigation.navigate('Search')}>
        <AntDesign
          name="search1"
          size={24}
          color={route.name === 'Search' ? '#007AFF' : 'black'}
        />
      </Pressable>
      {/* Favorite */}
      <Pressable onPress={() => navigation.navigate('Favorite')}>
        <AntDesign
          name="hearto"
          size={24}
          color={route.name === 'Favorite' ? '#007AFF' : 'black'}
        />
      </Pressable>
      {/* Profile */}
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <AntDesign
          name="user"
          size={24}
          color={route.name === 'Profile' ? '#007AFF' : 'black'}
        />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
