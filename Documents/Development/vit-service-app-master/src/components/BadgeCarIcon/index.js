import React from 'react';
import { View, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { CarShopContext } from '../../context/CarShopContext';
import style from './styles';

const BadgeCarIcon = ({ color, size }) => {
  const { currentServices } = React.useContext(CarShopContext);
  return (
    <View style={style.container}>
      <Feather name="shopping-cart" color={color} size={size} />
      {currentServices > 0 && (
        <View style={style.badge}>
          <Text style={style.badgeTXT}>{currentServices}</Text>
        </View>
      )}
    </View>
  );
};

export default BadgeCarIcon;
