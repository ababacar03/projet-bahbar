import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import InputField from '../components/InputField';
import axiosService from '../service/axiosService';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FormData = {
  name: string;
  firstname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterResponse = {
  token: string;
};

export default function FormRegister() {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const submitRegister = async (data: {
  name: string;
  firstname: string;
  username: string;
  email: string;
  password: string;
}) => {
  const { username, firstname, name, email, password } = data;

  try {
    const response = await axiosService.post<RegisterResponse>('/login/register', {
      username,
      firstname,
      name,
      email,
      password,
    });

    const token = response.data.token;

    if (token) {
      await login(token);
    } else {
      console.error("Aucun token reçu.");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.message);
      console.error('Response:', error.response?.data);
    } else {
      console.error('Autre erreur:', error);
    }
  }
};

  const password = watch('password');

  return (
    <View style={styles.form}>
      <Text style={styles.formtitle}>Inscription</Text>

      <InputField
        name="name"
        label="Nom"
        placeholder="Dupont"
        control={control}
        rules={{ required: 'Nom requis' }}
        error={errors.name}
      />

      <InputField
        name="firstname"
        label="Prénom"
        placeholder="Jean"
        control={control}
        rules={{ required: 'Prénom requis' }}
        error={errors.firstname}
      />

      <InputField
        name="username"
        label="Nom d'utilisateur"
        placeholder="Nom d'utilisateur"
        control={control}
        rules={{ required: "Nom d'utilisateur requis" }}
        error={errors.username}
      />

      <InputField
        name="email"
        label="Email"
        placeholder="email@example.com"
        control={control}
        keyboardType="email-address"
        rules={{
          required: 'Email requis',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email invalide',
          },
        }}
        error={errors.email}
      />

      <InputField
        name="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        control={control}
        secure
        rules={{
          required: 'Mot de passe requis',
          minLength: {
            value: 12,
            message: '12 caractères minimum',
          },
        }}
        error={errors.password}
      />

      <InputField
        name="confirmPassword"
        label="Confirmer le mot de passe"
        placeholder="Confirmer le mot de passe"
        control={control}
        secure
        rules={{
          required: 'Confirmation requise',
          validate: (value: string) => value === password || 'Les mots de passe ne correspondent pas',
        }}
        error={errors.confirmPassword}
      />

      <Button label="Inscription" onPress={handleSubmit(submitRegister)} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Déjà inscrit ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    height: 'auto',
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  formtitle: {
    fontSize: 22,
    color: '#54346B',
    marginBottom: 25,
    alignSelf: 'center',
  },
  link: {
    alignSelf: 'flex-start',
    marginTop: 15,
    color: '#54346B',
  },
});
