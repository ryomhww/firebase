import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Impor useNavigation
import { useFavorites } from '../components/FavoriteContext'; // Impor useFavorites
import { sizes, spacing } from '../constants/theme';

const FavoriteScreen = () => {
  const navigation = useNavigation(); // Inisialisasi navigation
  const { favorites } = useFavorites(); // Ambil data favorit dari context

  const handleNavigateToDetail = (item) => {
    // Navigasi ke DetailScreen dengan membawa data item favorit
    navigation.navigate('DetailScreen', { id: item.id, item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleNavigateToDetail(item)} // Arahkan ke halaman detail saat item diklik
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Places</Text>
      {/* Menampilkan daftar favorit */}
      <FlatList
        data={Object.values(favorites)} // Mengambil semua item favorit dari context
        renderItem={renderItem} // Render item favorit
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.l,
  },
  header: {
    fontSize: sizes.h1,
    fontWeight: 'bold',
    marginBottom: spacing.m,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: spacing.s,
    marginVertical: spacing.s,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.m,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
  },
  itemLocation: {
    fontSize: sizes.h3,
    color: '#555',
  },
});

export default FavoriteScreen;
