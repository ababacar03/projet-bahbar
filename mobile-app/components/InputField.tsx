import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  control: any;
  rules?: any;
  secure?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: { message?: string } | undefined;
};

export default function InputField({
  name,
  label,
  placeholder,
  control,
  rules,
  secure = false,
  keyboardType = 'default',
  error,
}: InputFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            secureTextEntry={secure}
            keyboardType={keyboardType}
            autoCapitalize="none"
          />
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 8,
    borderRadius: 5,
    width: '100%',
    alignSelf: 'stretch',
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#444',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});