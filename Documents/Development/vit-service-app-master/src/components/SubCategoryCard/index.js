import React from 'react';
import { TouchableOpacity, Image, Text, Platform } from 'react-native';

import Style from './style';

const SubCategoryCard = ({ data, selected, click }) => {
  const style = Style({ selected });
  return (
    <TouchableOpacity onPress={() => click()} style={style.container}>
      <Image source={{ uri: data.url_image }} style={style.image} />
      <Text style={style.label}>
        {data.nome}
      </Text>
    </TouchableOpacity>
  );
}

export default SubCategoryCard;