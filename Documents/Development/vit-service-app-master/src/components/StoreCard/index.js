import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Style from './style';
import style from '../../screens/subcategories/style';

function sanitizeCity(city) {
  return city.toLowerCase().split(' ').map(part => part.length > 2 ? part.charAt(0).toUpperCase() + part.slice(1) : part).join(' ');
}

const StoreCard = ({ data, click }) => {
  return (
    <TouchableOpacity style={Style.container} onPress={() => click()}>
      <View style={Style.leftSide}>
        <Text style={Style.storeTitle}>{data.nome}</Text>
        <View style={Style.storeInfo}>
          <FontAwesome name="star" color="white" size={16} style={Style.storeInfoIcon} />
          <Text style={Style.storeInfoLabel}>Avaliação de {data.avaliacao} estrela{data.avaliacao !== 1 ? 's' : ''}</Text>
        </View>
        <View style={Style.storeInfo}>
          <FontAwesome name="map-marker" color="white" size={16} style={Style.storeInfoIcon} />
          <Text style={Style.storeInfoLabel}>{sanitizeCity(data.cidade)}, {data.rua} {data.numero}</Text>
        </View>
      </View>
      <View>
        <Image source={{ uri: data.url_image }} style={Style.storeLogo} />
      </View>
    </TouchableOpacity>
  );
}

export default StoreCard;