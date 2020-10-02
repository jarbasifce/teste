import React from 'react';
import { View, Image } from 'react-native';

import Style from './styles';

const logo = require('../../assets/images/logo.png');

const Splash = () => (
  <View style={Style.container}>
    <Image source={logo} style={Style.logo} resizeMode="stretch" />
  </View>
);
export default Splash;
