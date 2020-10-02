/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context';
import { CarShopContext } from '../../context/CarShopContext';
import Style from './style';

const ProfileScreen = () => {
  const { logOut } = React.useContext(AuthContext);
  const { cleanCar } = React.useContext(CarShopContext);
  const [profile, SetProfile] = React.useState([]);
  const navigation = useNavigation();
  const items = [
    {
      name: 'Meus pedidos',
      icon: 'shopping-bag',
      size: 20,
      onPress: () => navigation.navigate('historic'),
    },
    {
      name: 'Endereços',
      icon: 'map-marker',
      size: 24,
      onPress: () => navigation.navigate('address'),
    },
    {
      name: 'Seja um parceiro',
      icon: 'handshake-o',
      size: 18,
      onPress: () => navigation.navigate('Pather'),
    },
    {
      name: 'Política de privacidade',
      icon: 'lock',
      onPress: () => navigation.navigate('terms'),
      size: 24,
    },
    {
      name: 'Ajuda',
      icon: 'question-circle-o',
      onPress: () => navigation.navigate('help'),
      size: 24,
    },
  ];

  const getUserProfile = async () => {
    const userProfile = JSON.parse(
      await AsyncStorage.getItem('@vitService:user'),
    );
    userProfile.img += `?t=${new Date().getTime()}`;
    SetProfile(userProfile);
  };

  const logOff = () => {
    cleanCar();
    logOut();
  };

  React.useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <View style={Style.container}>
      <View style={Style.heading}>
        <View style={Style.headingLeft}>
          <Image source={{ uri: profile.img }} style={Style.headingLogo} />
          <TouchableOpacity
            style={Style.headingProfileButton}
            onPress={() => navigation.navigate('editProfile')}
          >
            <Text style={Style.headingProfileButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={Style.headingRight}>
          <Text style={Style.headingGreetingsText}>Olá {profile.title},</Text>
          <Text style={Style.headingGreetingsText}>Seja bem vindo(a)</Text>
        </View>
      </View>
      <ScrollView style={Style.menu}>
        <Text style={Style.accountLabel}>Sua conta</Text>
        <View style={Style.menuBox}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={Style.menuItem}
              onPress={() => item.onPress()}
            >
              <View style={Style.menuItemIconContainer}>
                <FontAwesome name={item.icon} color="#f6581b" size={item.size} />
              </View>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={Style.bottomMenu}>
          <TouchableOpacity
            style={{ ...Style.menuItem }}
            onPress={() => logOff()}
          >
            <View style={Style.menuItemIconContainer}>
              <FontAwesome name="sign-out" color="#f6581b" size={24} />
            </View>
            <Text>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
