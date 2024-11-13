import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { colors, sizes, spacing } from '../constants/theme';
import NotesTravel from '../components/NotesTravel';

const DetailScreen = ({ route }) => {
  const { id, item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.description}>{item.description}</Text>
      {/* Menambahkan NotesTravel dengan id */}
      <NotesTravel itemId={id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: sizes.radius,
    marginBottom: spacing.l,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: spacing.l,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.secondary,
    marginVertical: spacing.s,
    marginHorizontal: spacing.l,
  },
  description: {
    fontSize: sizes.body,
    color: colors.darkGray,
    marginBottom: spacing.l,
    marginHorizontal: spacing.l,
  },
});

export default DetailScreen;
