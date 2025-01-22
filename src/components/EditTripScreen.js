import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Image, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, sizes } from '../constants/theme';
import { launchImageLibrary } from 'react-native-image-picker';

const EditTripScreen = ({ route, navigation }) => {
  const { trip } = route.params;
  const [title, setTitle] = useState(trip.title);
  const [location, setLocation] = useState(trip.location);
  const [description, setDescription] = useState(trip.description);
  const [image, setImage] = useState(trip.image);

  // Fungsi untuk membuka galeri
  const handleSelectImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setImage(selectedImage.uri); // Simpan URI gambar yang dipilih
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://3k1m2fm4-3000.asse.devtunnels.ms/places/${trip.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, location, description, image }),
        }
      );

      if (response.ok) {
        const updatedTrip = { ...trip, title, location, description, image }; // Update the trip object
        Alert.alert('Success', 'Trip updated successfully');
        navigation.goBack('', { trip: updatedTrip });
      } else {
        Alert.alert('Error', 'Failed to update trip');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.imageContainer}>
        <Text style={styles.label}>Current Image:</Text>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          <Text style={styles.buttonText}>Change Image</Text>
        </TouchableOpacity>
      </View>
      {/* Ganti tombol Save menggunakan TouchableOpacity */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageContainer: {
    marginBottom: spacing.l,
    alignItems: 'center',
  },
  label: {
    fontSize: sizes.h3,
    color: colors.darkGray,
    marginBottom: spacing.s,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: sizes.radius,
    marginBottom: spacing.s,
  },
  button: {
    backgroundColor: colors.black,
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
    borderRadius: sizes.radius,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  // Gaya untuk tombol Save
  saveButton: {
    backgroundColor: colors.primary, // Warna latar tombol
    paddingVertical: spacing.s,     // Padding vertikal tombol
    paddingHorizontal: spacing.l,   // Padding horizontal tombol
    borderRadius: sizes.radius,     // Sudut tombol melengkung
    alignItems: 'center',           // Pusatkan teks
    marginTop: spacing.m,           // Margin atas tombol
  },
  saveButtonText: {
    color: colors.white,            // Warna teks tombol
    fontWeight: 'bold',             // Teks tebal
    fontSize: sizes.h3,             // Ukuran teks
  },
});

export default EditTripScreen;
