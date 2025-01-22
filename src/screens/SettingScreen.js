import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config'; // Pastikan auth sudah diimpor dengan benar
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();

  // Fungsi untuk handle log out
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Success', 'You have been logged out');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Tombol Log Out */}
      <View style={styles.settingItem}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Memusatkan konten secara vertikal
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    marginVertical: 10,
  },
  logoutButton: {
    backgroundColor: 'black', // Warna latar belakang merah
    paddingVertical: 12, // Padding vertikal
    paddingHorizontal: 20, // Padding horizontal
    borderRadius: 30, // Membuat sudut melengkung
    alignItems: 'center', // Memusatkan teks
    justifyContent: 'center',
    width: '100%', // Membuat lebar tombol mengikuti ukuran layar
  },
  logoutButtonText: {
    color: 'white', // Warna teks putih
    fontSize: 18, // Ukuran font
    fontWeight: 'bold',
  },
});

export default SettingScreen;
