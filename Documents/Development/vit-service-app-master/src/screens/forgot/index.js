/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Style, { headerLogo, headerLogosmall } from './style';
import * as User from '../../services/User';

const logo = require('../../assets/images/logo.png');

const Login = ({ navigation }) => {
  const logoHeigth = new Animated.Value(headerLogo);
  const [email, onChangeEmail] = React.useState('');

  function keyboadWillShow() {
    Animated.timing(logoHeigth, {
      duration: 300,
      toValue: headerLogosmall,
      useNativeDriver: false,
    }).start();
  }

  function keyboardWillHide() {
    Animated.timing(logoHeigth, {
      duration: 300,
      toValue: headerLogo,
      useNativeDriver: false,
    }).start();
  }

  const submitForgot = async () => {
    await User.forgot({ email }).then(() => {
      Alert.alert(
        'Email de recuperação enviado',
        'As instruções para recuperação de senha foi enviado para seu email',
      );
    });
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboadWillShow);
    Keyboard.addListener('keyboardDidHide', keyboardWillHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={Style.containe}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={Style.header}>
          <Animated.Image
            source={logo}
            style={[Style.logo, { height: logoHeigth, width: logoHeigth }]}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View animation="fadeInUpBig" style={Style.footerContainer}>
          <View style={Style.footer}>
            <Text style={Style.txtForgot}>Recuperar senha</Text>
            <Text style={Style.txt}>Vamos iniciar</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              autoCompleteType="email"
              onChangeText={(text) => onChangeEmail(text)}
              placeholderTextColor="#999999"
              style={Style.input}
            />
            <TouchableOpacity
              onPress={() => submitForgot()}
              style={Style.btnForgot}
            >
              <Text style={Style.btnForgotTxt}>RECUPERAR SENHA</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
