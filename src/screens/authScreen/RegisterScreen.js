import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!');
      return;
    }

    try {
      // Daftarkan pengguna baru
      await createUserWithEmailAndPassword(auth, email, password);

      // Lakukan sign out segera setelah registrasi berhasil
      await signOut(auth);

      Alert.alert('Success', 'Registrasi berhasil! Silakan login.');

      // Navigasi ke halaman login
    } catch (error) {
      Alert.alert('Error', error.message || 'Gagal registrasi!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Gambar */}
      <Image
        source={require('../../../assets/images/test.png')} // Ganti dengan gambar lokal Anda
        style={styles.image}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('LoginScreen')}>
        Sudah punya akun? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f8f9fa' },
  image: { width: 120, height: 120, marginBottom: 20, borderRadius: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ced4da', 
    padding: 12, 
    marginBottom: 12, 
    width: '100%', 
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  registerButton: { 
    backgroundColor: 'black', 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 8, 
    width: '100%' 
  },
  registerButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  loginText: { 
    color: 'blue', 
    marginTop: 12, 
    textAlign: 'center' 
  },
});

export default RegisterScreen;
