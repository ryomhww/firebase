import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {colors} from '../constants/theme';
import MainHeader from '../components/MainHeader';
import ScreenHeader from '../components/ScreenHeader';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import SectionHeader from '../components/SectionHeader';
import TripsList from '../components/TripsList';

const HomeScreen = ({navigation}) => {
  const [topPlaces, setTopPlaces] = useState([]);
  const [places, setPlaces] = useState([]);

  // Fetch data dari API
  useEffect(() => {
    const fetchTopPlaces = async () => {
      try {
        const response = await fetch(
          'https://c36tgb08-3000.asse.devtunnels.ms/top_places'
        );
        const data = await response.json();
        setTopPlaces(data);
      } catch (error) {
        console.error('Error fetching top places:', error);
      }
    };

    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          'https://c36tgb08-3000.asse.devtunnels.ms/places'
        );
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchTopPlaces();
    fetchPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader title="Travel" />
      <ScreenHeader mainTitle="Find Your" secondTitle="Dream Trip" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={topPlaces} navigation={navigation} />
        <SectionHeader title="Popular Trips" buttonTitle="See All" onPress={() => {}} />
        <TripsList list={places} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
});

export default HomeScreen;
