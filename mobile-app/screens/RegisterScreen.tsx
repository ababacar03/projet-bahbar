import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FormRegister from '../components/FormRegister';


type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  return (
    <LinearGradient
      colors={['#1A1A2E', '#545494']}
      locations={[0.75, 1]}
      style={styles.container}
    >
      <GestureHandlerRootView style={styles.content}>
        <Text style={styles.title}>BahBar</Text>
        <Text style={styles.subtitle}>On fait quoi ce soir ? BahBar !</Text>
        <FormRegister />
      </GestureHandlerRootView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
});
