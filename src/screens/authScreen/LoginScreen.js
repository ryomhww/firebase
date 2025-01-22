import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!');
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('res:', res);

      // Ambil token ID dari pengguna yang berhasil login
      const token = await res.user.getIdToken();
      console.log('Token ID:', token);

      Alert.alert('Success', 'Login berhasil!');

      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', error.message || 'Gagal login!');
    }
  };

  return (
    <View style={styles.container}>
      
      {/* Gambar */}
      <Image
        source={require('../../../assets/images/test.png')} // Sesuaikan path dengan lokasi gambar lokal Anda

        style={styles.image}
      />

      {/* Teks Login */}
      <Text style={styles.title}>Login</Text>

      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Input Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Tombol Login */}
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Link Register */}
      <Text style={styles.registerText} onPress={() => navigation.navigate('RegisterScreen')}>
        Belum punya akun? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  image: {
    width: 150, // Ukuran gambar
    height: 150,
    marginBottom: 20, // Jarak antara gambar dan teks
    borderRadius: 75, // Membuat gambar berbentuk lingkaran
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default LoginScreen;
