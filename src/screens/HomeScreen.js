import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../constants/theme';
import MainHeader from '../components/MainHeader';
import ScreenHeader from '../components/ScreenHeader';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import SectionHeader from '../components/SectionHeader';
import TripsList from '../components/TripsList';
import FAB from '../components/FAB';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation, route }) => {
  const [topPlaces, setTopPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); // State untuk refresh
  const [isEditing, setIsEditing] = useState(false);

  // Tampilkan toast jika ada trip baru ditambahkan
  useEffect(() => {
    if (route.params?.tripAdded) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Trip added successfully',
      });
    }
  }, [route.params?.tripAdded]);

  // Fetch data untuk Top Places dan Places
  const fetchTopPlaces = async () => {
    try {
      const response = await fetch('https://3k1m2fm4-3000.asse.devtunnels.ms/top_places');
      if (!response.ok) throw new Error('Failed to fetch top places');
      const data = await response.json();
      setTopPlaces(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch top places.',
      });
    }
  };

  const fetchPlaces = async () => {
    try {
      const response = await fetch('https://3k1m2fm4-3000.asse.devtunnels.ms/places');
      if (!response.ok) throw new Error('Failed to fetch places');
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch places.',
      });
    }
  };

  // Mengambil semua data sekaligus
  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchTopPlaces(), fetchPlaces()]);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true); // Mulai refresh
    await fetchData(); // Fetch ulang data
    setIsRefreshing(false); // Selesai refresh
  };

  const moveToPlaces = async (item) => {
    try {
      await fetch(`https://3k1m2fm4-3000.asse.devtunnels.ms/top_places/${item.id}`, {
        method: 'DELETE',
      });

      await fetch('https://3k1m2fm4-3000.asse.devtunnels.ms/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      setTopPlaces((prev) => prev.filter((place) => place.id !== item.id));
      setPlaces((prev) => [...prev, item]);

      Toast.show({
        type: 'success',
        text1: 'Moved',
        text2: 'Successfully moved to Places.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to move item to Places.',
      });
    }
  };

  const moveToTopPlaces = async (item) => {
    try {
      await fetch(`https://3k1m2fm4-3000.asse.devtunnels.ms/places/${item.id}`, {
        method: 'DELETE',
      });

      await fetch('https://3k1m2fm4-3000.asse.devtunnels.ms/top_places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      setPlaces((prev) => prev.filter((place) => place.id !== item.id));
      setTopPlaces((prev) => [...prev, item]);

      Toast.show({
        type: 'success',
        text1: 'Moved',
        text2: 'Successfully moved to Top Places.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to move item to Top Places.',
      });
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader
        title="Travel"
        rightButton={{
          icon: isEditing ? 'Hamburger' : 'Hamburger',
          onPress: toggleEditMode,
        }}
      />
      <ScreenHeader mainTitle="List Your" secondTitle="Dream Trip" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Top Places Carousel */}
        <TopPlacesCarousel
          list={topPlaces}
          navigation={navigation}
          onMove={isEditing ? moveToPlaces : null}
          onPressItem={(item) =>
            navigation.navigate('DetailScreen', { id: item.id, item, source: 'top_places' })
          }
        />

        {/* Trips Section */}
        <SectionHeader title="Trips" />
        <TripsList
          list={places}
          navigation={navigation}
          onMove={isEditing ? moveToTopPlaces : null}
          onPressItem={(item) =>
            navigation.navigate('DetailScreen', { id: item.id, item, source: 'places' })
          }
        />
      </ScrollView>
      <FAB onPress={() => navigation.navigate('AddTripScreen')} />
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  scrollViewContent: {
    paddingBottom: height * 0.1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
  },
});

export default HomeScreen;
