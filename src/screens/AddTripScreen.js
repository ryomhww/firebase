import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors, spacing, sizes } from '../constants/theme';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const AddTripScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [description, setDescription] = useState('');
  const [nextId, setNextId] = useState(null);

  // Fetch ID Terakhir
  useEffect(() => {
    const fetchLastId = async () => {
      try {
        const response = await fetch(
          'https://3k1m2fm4-3000.asse.devtunnels.ms/places'
        );
        if (!response.ok) throw new Error('Failed to fetch places');
        const data = await response.json();
        const lastId =
          data.length > 0 ? Math.max(...data.map((item) => parseInt(item.id))) : 0;
        setNextId(lastId + 1);
      } catch (error) {
        showToast('error', 'Error', 'Failed to fetch last ID');
      }
    };

    fetchLastId();
  }, []);

  // Pilih Gambar
  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        showToast('error', 'Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Fungsi untuk Menampilkan Toast
  const showToast = (type, title, message) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
    });
  };

  // Submit Data
  const handleSubmit = async () => {
    if (!title || !location || !imageUri || !description) {
      showToast('error', 'Error', 'All fields are required');
      return;
    }
  
    const newTrip = {
      id: nextId?.toString() || Date.now().toString(),
      title,
      location,
      image: imageUri,
      description,
    };
  
    try {
      const response = await fetch(
        'https://3k1m2fm4-3000.asse.devtunnels.ms/places',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTrip),
        }
      );
  
      if (response.ok) {
        showToast('success', 'Success', 'Trip added successfully');
        setTimeout(() => {
          navigation.navigate('HomeScreen', { screen: 'TabNavigator' });
        }, 1000); // Memberi waktu sedikit agar toast sempat muncul
      } else {
        showToast('error', 'Error', 'Failed to add trip');
      }
    } catch (error) {
      showToast('error', 'Error', error.message);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={colors.gray}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        placeholderTextColor={colors.gray}
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
        <Text style={styles.imageButtonText}>Select Image</Text>
      </TouchableOpacity>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor={colors.gray}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>Add Trip</Text>
      </TouchableOpacity>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.l,
    backgroundColor: colors.light,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: spacing.m,
    marginBottom: spacing.m,
    borderRadius: sizes.radius,
    backgroundColor: colors.white,
  },
  imageButton: {
    backgroundColor: colors.black,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    borderRadius: sizes.radius,
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  imageButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: sizes.radius,
    marginBottom: spacing.m,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.m,
    borderRadius: sizes.radius,
    alignItems: 'center',
    marginTop: spacing.m,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: sizes.h3,
  },
});

export default AddTripScreen;
