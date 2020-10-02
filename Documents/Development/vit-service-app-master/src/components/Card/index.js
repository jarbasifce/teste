import React from 'react';
import { TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import Style from './styles';

const Card = ({ children, height, width, backgroud, margin, click, delay }) => {
  const style = Style({ height, width, backgroud, margin });
  return (
    <Animatable.View
      animation="bounceIn"
      duration={250}
      delay={delay}
      useNativeDriver
      easing="ease-in"
      style={style.container}
    >
      <TouchableOpacity style={style.insideContainer} onPress={() => click()}>
        {children}
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default Card;
