import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, Dimensions, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useFavorites } from '../components/FavoriteContext';
import NotesTravel from '../components/NotesTravel';

const { width, height } = Dimensions.get('window');

const DetailScreen = ({ route, navigation }) => {
  const { id, item, source } = route.params; // Tambahkan `source` untuk menentukan asal data
  const [trip, setTrip] = useState(item);
  const [isRefreshing, setIsRefreshing] = useState(false); // State untuk refresh
  const { removeFavorite } = useFavorites();

  const fetchTripData = async () => {
    try {
      const endpoint =
        source === 'top_places'
          ? `https://3k1m2fm4-3000.asse.devtunnels.ms/top_places/${id}`
          : `https://3k1m2fm4-3000.asse.devtunnels.ms/places/${id}`;

      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setTrip(data);
      } else if (response.status === 404) {
        Alert.alert('Error', 'This trip no longer exists');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to fetch trip data');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true); // Mulai refresh
    await fetchTripData(); // Ambil data terbaru
    setIsRefreshing(false); // Selesai refresh
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!item) {
        fetchTripData();
      }
    }, [id, source, navigation])
  );

  useEffect(() => {
    if (route.params?.item) {
      setTrip(route.params.item);
    }
  }, [route.params?.item]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <Text
            style={[styles.headerButton, styles.editButton]}
            onPress={() => navigation.navigate('EditTripScreen', { trip })}
          >
            Edit
          </Text>
          {source !== 'top_places' && (
            <Text
              style={[styles.headerButton, styles.deleteButton]}
              onPress={() => {
                Alert.alert(
                  'Confirm Delete',
                  'Are you sure you want to delete this trip?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', style: 'destructive', onPress: handleDelete },
                  ]
                );
              }}
            >
              Delete
            </Text>
          )}
        </View>
      ),
    });
  }, [navigation, trip]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://3k1m2fm4-3000.asse.devtunnels.ms/places/${id}`,
        { method: 'DELETE' }
      );
      if (response.ok) {
        removeFavorite(id);
        Alert.alert('Success', 'Trip deleted successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to delete trip');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <Image source={{ uri: trip.image }} style={styles.image} />
      <Text style={styles.title}>{trip.title}</Text>
      <Text style={styles.location}>{trip.location}</Text>
      <Text style={styles.description}>{trip.description}</Text>
      <NotesTravel itemId={id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    color: '#888',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'black',
  },
  deleteButton: {
    backgroundColor: 'black',
  },
});

export default DetailScreen;
