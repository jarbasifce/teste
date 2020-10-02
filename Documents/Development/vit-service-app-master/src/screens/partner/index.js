import React from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './styles';

const logo = require('../../assets/images/logo.png');

const Partner = () => {
  const openWhatsApp = () => {
    Linking.canOpenURL('whatsapp://send?text=oi').then((supported) => {
      if (supported) {
        Linking.openURL(
          'whatsapp://send?phone=558899640756&text=Olá Gostaria de me tornar um parceiro do vit service',
        );
      } else {
        Linking.openURL(
          'https://api.whatsapp.com/send?phone=558899640756&text=Olá Gostaria de me tornar um parceiro do vit service',
        );
      }
    });
  };

  const openEmail = () => {
    Linking.openURL(
      'mailto:suporte@vitservice.com.br?subject=Parceria Vit Service&body=Olá Gostaria de me tornar um parceiro do vitservice',
    );
  };

  return (
    <View style={style.container}>
      <Image source={logo} style={style.logo} resizeMode="stretch" />
      <Text style={style.title}>
        {`Deseja se tornar um parceiro\ndo Vit Service?`}
      </Text>
      <Text style={style.subtitle}>Entre em contato para mais informações</Text>
      <Text style={style.suport}>Suporte</Text>
      <TouchableOpacity style={style.option} onPress={() => openWhatsApp()}>
        <FontAwesome name="whatsapp" size={20} color="#d6001b" />
        <Text style={style.fone}>(88) 9 9964-0756</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.option} onPress={() => openEmail()}>
        <FontAwesome name="envelope-o" size={20} color="#d6001b" />
        <Text style={style.email}>suporte@vitservice.com.br</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Partner;
