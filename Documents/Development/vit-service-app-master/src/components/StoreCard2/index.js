import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Style from './style';

function sanitizeCity(city) {
  if (!city) return '';
  return city
    .toLowerCase()
    .split(' ')
    .map((part) =>
      part.length > 2 ? part.charAt(0).toUpperCase() + part.slice(1) : part,
    )
    .join(' ');
}

const StoreCard = ({ data, click }) => {
  return (
    <TouchableOpacity style={Style.container} onPress={() => click()}>
      <View style={Style.storeLogoContainer}>
        <Image
          source={{ uri: data.url_image || data.url_logo }}
          style={Style.storeLogo}
        />
      </View>
      <View style={Style.leftSide}>
        <Text style={Style.storeTitle} numberOfLines={1}>{data.nome}</Text>
        <View style={Style.storeInfo}>
          <FontAwesome
            name="star"
            color="#3f3f3f"
            size={14}
            style={Style.storeInfoIcon}
          />
          <Text style={Style.storeInfoLabel}>
            Avaliação de {data.avaliacao} estrela
            {data.avaliacao !== 1 ? 's' : ''}
          </Text>
        </View>
        <View style={Style.storeInfo}>
          <FontAwesome
            name="map-marker"
            color="#3f3f3f"
            size={14}
            style={Style.storeInfoIcon}
          />
          <Text style={Style.storeInfoLabel}>
            {sanitizeCity(data.cidade)}, {data.rua} {data.numero}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default StoreCard;
