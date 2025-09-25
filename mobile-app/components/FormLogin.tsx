import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import InputField from '../components/InputField';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import axiosService from '../service/axiosService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FormData = {
  email: string;
  password: string;
};
type LoginResponse = {
  token: string;
};

export default function FormLogin() {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submitLogin = async (data: FormData) => {
    try {
      const response = await axiosService.post<LoginResponse>('/login', {
        email: data.email,
        password: data.password,
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
    };
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formtitle}>Connexion</Text>

      <InputField
        name="email"
        label="Email"
        placeholder="Email"
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

      <Button label="Connexion" onPress={handleSubmit(submitLogin)} />

      <TouchableOpacity onPress={() => console.log('Mot de passe oublié')}>
        <Text style={styles.link}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Vous Inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    height: 380,
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
