import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import style from './styles';

const Header = ({ title, hideBackArrow, showBars, navigation }) => {
  const Style = style({ hideBackArrow, showBars });
  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.icon}>
        {!hideBackArrow && (
          <TouchableOpacity
            style={Style.backArrowButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-arrow-round-back" size={45} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={Style.title}>{title}</Text>
      </View>
      <View style={[Style.icon]}>
        {!!showBars && (
          <TouchableOpacity
            style={Style.barsButton}
            onPress={() => navigation.push('profile')}
          >
            <Octicons name="three-bars" size={35} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
