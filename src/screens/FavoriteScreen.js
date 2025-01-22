import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../components/FavoriteContext';
import { sizes, spacing } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const { favorites } = useFavorites();

  const handleNavigateToDetail = (item) => {
    navigation.navigate('DetailScreen', { id: item.id, item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleNavigateToDetail(item)}
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
      <FlatList
        data={Object.values(favorites)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.l,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: width * 0.07, // Header menyesuaikan lebar layar
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
    width: width * 0.2, // Gambar responsif berdasarkan lebar layar
    height: width * 0.2, // Gambar berbentuk persegi
    borderRadius: 8,
    marginRight: spacing.m,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: width * 0.05, // Font responsif untuk judul
    fontWeight: 'bold',
  },
  itemLocation: {
    fontSize: width * 0.04, // Font responsif untuk lokasi
    color: '#555',
  },
  listContainer: {
    paddingBottom: height * 0.1, // Padding bawah untuk responsif
  },
});

export default FavoriteScreen;
