import React from 'react';
import { View } from 'react-native';
import { colors, shadow } from '../constants/theme';
import Icon from './Icon';

const FavoriteButton = ({ active, onPress, style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.white,
          padding: 4,
          borderRadius: 20,
        },
        shadow.light,
        style,
      ]}
    >
      <Icon icon={active ? 'FavoriteFilled' : 'Favorite'} size={24} onPress={onPress} />
    </View>
  );
};

export default FavoriteButton;
