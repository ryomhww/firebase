import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, shadow } from '../constants/theme'; // Sesuaikan dengan tema yang Anda pakai

const SettingButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, shadow.light, style]} 
      onPress={onPress}>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
  },
});

export default SettingButton;
