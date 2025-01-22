import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon'; // Pastikan pustaka ikon Anda benar
import { sizes, spacing } from '../constants/theme';

const MainHeader = ({ title, rightButton }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      {/* Pastikan penulisan ikon benar */}
      <Icon icon="Hamburger" onPress={() => {}} /> 
      <Text style={styles.title}>{title}</Text>
      {rightButton && (
        <TouchableOpacity onPress={rightButton.onPress}>
          {/* Menggunakan ikon dari rightButton */}
          <Icon
            icon={rightButton.icon || 'Hamburger'} // Pastikan ikon tersedia
            color="blue"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
  },
});

export default MainHeader;
