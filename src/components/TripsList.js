import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors, shadow, sizes, spacing } from '../constants/theme';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../components/FavoriteContext'; // Mengimpor useFavorites

const CARD_WIDTH = sizes.width / 2 - (spacing.l + spacing.l / 2);
const CARD_HEIGHT = 220;

const TripsList = ({ list, navigation }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Mengakses data favorit dari context

  const toggleFavorite = (id, item) => {
    if (favorites[id]) {
      removeFavorite(id); // Jika item sudah favorit, hapus dari favorit
    } else {
      addFavorite(item); // Jika item belum favorit, tambahkan ke favorit
    }
  };

  return (
    <View style={styles.container}>
      {list.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.cardContainer}
          onPress={() => navigation.navigate('DetailScreen', { id: item.id, item })} // Mengirim id & item
        >
          <View style={[styles.card, shadow.light]}>
            <View style={styles.imageBox}>
              <Image style={styles.image} source={{ uri: item.image }} />
            </View>
            <View style={styles.footer}>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
              <FavoriteButton
                active={favorites[item.id] || false} // Cek apakah item.id ada dalam state favorit global
                onPress={() => toggleFavorite(item.id, item)} // Toggle status favorit
              />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginLeft: spacing.l,
    marginBottom: spacing.l,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    borderTopLeftRadius: sizes.radius,
    borderTopRightRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default TripsList;
