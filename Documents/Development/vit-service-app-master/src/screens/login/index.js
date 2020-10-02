/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  Animated,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';

import Style, { headerLogo, headerLogosmall } from './style';
import { AuthContext } from '../../context';

const logo = require('../../assets/images/logo.png');

const Login = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState('');
  const [senha, onChangesenha] = React.useState('');
  const [loading, SetLoading] = React.useState(false);
  const [error, SetError] = React.useState(false);
  const { singIn } = React.useContext(AuthContext);
  const logoHeigth = new Animated.Value(headerLogo);

  const attemptLogin = () => {
    SetLoading(true);
    singIn({ email, senha }).catch(() => {
      SetLoading(false);
      SetError(true);
    });
  };

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={Style.header}>
          <Animated.Image
            source={logo}
            style={[Style.logo, { height: logoHeigth, width: logoHeigth }]}
            resizeMode="stretch"
          />
          <Text style={Style.txtLogo}>Um app de serviços feito pra você</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={Style.footerContainer}>
          <View style={Style.footer}>
            <Text style={Style.txtLogin}>Login</Text>
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
            <TextInput
              placeholder="Senha"
              secureTextEntry
              onChangeText={(text) => onChangesenha(text)}
              placeholderTextColor="#999999"
              style={Style.input}
            />
            <TouchableOpacity
              onPress={() => attemptLogin()}
              style={Style.btnLogin}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                  <Text style={Style.btnLoginTxt}>LOGIN</Text>
                )}
            </TouchableOpacity>
            <View style={Style.forgotContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                <Text style={Style.forgotTxt}>Esqueceu a senha?</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 16 }}>
                <Text style={{ fontSize: 14, color: '#333' }}>Ainda não é cadastrado? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                  <Text style={Style.registerTxt}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/*  <View style={Style.socialContainer}>
            <TouchableOpacity>
              <FontAwesome name="facebook" color="#fff" size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="google" color="#fff" size={25} />
            </TouchableOpacity>
          </View> */}
        </Animatable.View>
      </ScrollView>

      <AwesomeAlert
        show={error}
        showProgress={false}
        title="Credenciais inválidas"
        message="Email ou senha inválidos"
        closeOnTouchOutside
        closeOnHardwareBackPress={false}
        showConfirmButton
        confirmText="Fechar"
        confirmButtonStyle={{ width: 100 }}
        confirmButtonTextStyle={{ textAlign: 'center' }}
        confirmButtonColor="#d6001b"
        onConfirmPressed={() => SetError(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default Login;
