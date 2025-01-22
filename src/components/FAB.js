import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, shadow } from '../constants/theme';

const FAB = ({ onPress }) => {
  const scale = useSharedValue(1);

  // Gaya animasi yang diperbarui berdasarkan shared value
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Fungsi untuk menangani efek saat tombol ditekan
  const handlePressIn = () => {
    scale.value = withSpring(2, { damping: 10 }); // Membesar saat ditekan
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 }); // Kembali ke ukuran normal
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.fab, shadow.light, animatedStyle]}>
        <Text style={styles.fabText}>+</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.black,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default FAB;
