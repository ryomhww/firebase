import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { colors, shadow, sizes, spacing } from '../constants/theme';
import FavoriteButton from './FavoriteButton';
import { useFavorites } from '../components/FavoriteContext'; // Impor useFavorites dari context

const CARD_WIDTH = sizes.width - 80;
const CARD_HEIGHT = 200;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopPlacesCarousel = ({ list }) => {
  const navigation = useNavigation(); // Inisialisasi useNavigation
  const { favorites, addFavorite, removeFavorite } = useFavorites(); // Ambil data favorit dan fungsi dari context

  const toggleFavorite = (id, item) => {
    if (favorites[id]) {
      removeFavorite(id); // Jika sudah ada, hapus dari favorit
    } else {
      addFavorite(item); // Jika belum ada, tambahkan ke favorit
    }
  };

  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH_SPACING}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={(i) => i.id.toString()}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailScreen', { id: item.id, item })} // Mengirim id & item
            style={{
              marginLeft: spacing.l,
              marginRight: index === list.length - 1 ? spacing.l : 0,
            }}
          >
            <View style={[styles.card, shadow.dark]}>
              <FavoriteButton
                style={styles.favorite}
                active={favorites[item.id] || false} // Mengatur status favorit
                onPress={() => toggleFavorite(item.id, item)} // Toggle status favorit
              />
              <View style={styles.imageBox}>
                <Image source={{ uri: item.image }} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopPlacesCarousel;
