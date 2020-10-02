/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
import {
  View,
  Animated,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import TextInputMask from 'react-native-text-input-mask';
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import Style, { headerLogo, headerLogosmall } from './style';
import { AuthContext } from '../../context';
import * as User from '../../services/User';
import userSchema from '../../validators/user';
import AwesomeAlert from 'react-native-awesome-alerts';

const logo = require('../../assets/images/logo.png');

const Signup = () => {
  const logoHeigth = new Animated.Value(headerLogo);
  const { singIn } = React.useContext(AuthContext);
  const [isConfirm, setConfirm] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);
  const [showDataPicker, setShowDataPicker] = React.useState(false);
  const [data, setData] = React.useState();
  const [alert, setAlert] = React.useState(Object);

  const ref_input_2 = useRef();
  const ref_input_3 = useRef();
  const ref_input_4 = useRef();
  const ref_input_5 = useRef();
  const ref_input_6 = useRef();
  const ref_input_7 = useRef();
  const ref_input_8 = useRef();


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

  const handleDate = (event, date) => {
    setShowDataPicker(false);
    setData(date);
    ref_input_7.current.focus()
  };

  const submitUser = async (values, reset) => {
    if (!isConfirm) {
      Alert.alert('Você deve concordar com os termos e condições!');
    } else {
      setIsLoad(true);
      values.cpf = values.cpf.replace(/[^\d]+/g, '');
      values.telefone = values.telefone.replace(/[^\d]+/g, '');
      values.dataNascimento = data

      User.store(values).then(() => {
        setIsLoad(false);
        reset();
        setAlert({
          open: true,
          loading: true,
          title: "Realizando o login"
        });
        setTimeout(() => {
          singIn({ email: values.email, senha: values.senha });
        }, 700)
      }).catch(erro => {
        setIsLoad(false);
        if (erro.response && erro.response.data) {
          const errors = erro.response?.data.map(e => e.message).join('\n');
          setAlert({
            open: true,
            body: "Não foi possível criar a sua conta",
            title: errors
          });
        } else {
          setAlert({
            open: true,
            body: "Não foi possível criar a sua conta",
            title: 'Por favor, verifique a sua conexão com a internet e tente novamente'
          });
        }
      });
    }
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
      <ScrollView>
        <View style={Style.header}>
          <Animated.Image
            source={logo}
            style={[Style.logo, { height: logoHeigth, width: logoHeigth }]}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View animation="fadeInUpBig" style={Style.footerContainer}>
          <View style={Style.footer}>
            <Text style={Style.txtSignup}>Conta</Text>
            <Text style={Style.txt}>
              Precisamos de algumas informações no seu cadastro
            </Text>
            <Formik
              initialValues={{
                nome: '',
                sobrenome: '',
                email: '',
                telefone: '',
                senha: '',
                cpf: '',
                dataNascimento: '',
                senha_confirmation: '',
              }}
              validationSchema={userSchema}
              onSubmit={(values, { resetForm }) => {
                submitUser({ ...values }, resetForm);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
                <>
                  <TextInput
                    onSubmitEditing={() => ref_input_2.current.focus()}
                    placeholder="Nome"
                    onChangeText={handleChange('nome')}
                    onBlur={handleBlur('nome')}
                    value={values.nome}
                    placeholderTextColor="#999999"
                    style={[Style.input, touched.nome && errors.nome ? Style.inputError : null]}
                  />
                  {touched.nome && errors.nome ? (
                    <Text style={Style.erroTxt}>
                      {touched.nome && errors.nome}
                    </Text>
                  ) : null
                  }
                  <TextInput
                    ref={ref_input_2}
                    onSubmitEditing={() => ref_input_3.current?.focus()}
                    placeholder="Sobrenome"
                    onChangeText={handleChange('sobrenome')}
                    onBlur={handleBlur('sobrenome')}
                    value={values.sobrenome}
                    placeholderTextColor="#999999"
                    style={[Style.input, touched.sobrenome && errors.sobrenome ? Style.inputError : null]}
                  />
                  {touched.sobrenome && errors.sobrenome ? (
                    <Text style={Style.erroTxt}>
                      {touched.sobrenome && errors.sobrenome}
                    </Text>
                  ) : null
                  }
                  <TextInput
                    ref={ref_input_3}
                    autoCapitalize="none"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCompleteType="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholderTextColor="#999999"
                    style={[Style.input, touched.email && errors.email ? Style.inputError : null]}
                  />
                  {touched.email && errors.email ? (
                    <Text style={Style.erroTxt}>
                      {touched.email && errors.email}
                    </Text>
                  ) : null
                  }
                  <TextInputMask
                    keyboardType="number-pad"
                    placeholder="Telefone"
                    onChangeText={handleChange('telefone')}
                    onBlur={handleBlur('telefone')}
                    value={values.telefone}
                    mask="([00]) [00000]-[0000]"
                    placeholderTextColor="#999999"
                    style={[Style.input, touched.telefone && errors.telefone ? Style.inputError : null]}
                  />
                  {touched.telefone && errors.telefone ? (
                    <Text style={Style.erroTxt}>
                      {touched.telefone && errors.telefone}
                    </Text>
                  ) : null
                  }
                  <TextInputMask
                    onSubmitEditing={() => setShowDataPicker(true)}
                    keyboardType="number-pad"
                    placeholder="CPF"
                    onChangeText={handleChange('cpf')}
                    onBlur={handleBlur('cpf')}
                    value={values.cpf}
                    mask="[000].[000].[000]-[00]"
                    placeholderTextColor="#999999"
                    style={[Style.input, touched.cpf && errors.cpf ? Style.inputError : null]}
                  />
                  {touched.cpf && errors.cpf ? (
                    <Text style={Style.erroTxt}>
                      {touched.cpf && errors.cpf}
                    </Text>
                  ) : null
                  }
                  <TouchableOpacity
                    ref={ref_input_6}
                    style={[
                      Style.input,
                      { justifyContent: 'center', paddingLeft: 8 },
                    ]}
                    onPress={() => setShowDataPicker(true)}
                  >
                    {!data ? (
                      <Text style={Style.empytInput}>Data de nascimento</Text>
                    ) : (
                        <Text>
                          {moment(data).format('DD/MM/YYYY')}
                        </Text>
                      )}
                  </TouchableOpacity>
                  {showDataPicker && (
                    <DateTimePicker
                      mode="date"
                      value={new Date()}
                      onChange={handleDate}
                      display="spinner"
                    />
                  )}
                  {touched.dataNascimento && errors.dataNascimento ? (
                    <Text style={Style.erroTxt}>
                      {touched.dataNascimento && errors.dataNascimento}
                    </Text>
                  ) : null
                  }
                  <TextInput
                    ref={ref_input_7}
                    onSubmitEditing={() => ref_input_8.current.focus()}
                    placeholder="Senha"
                    secureTextEntry
                    value={values.senha}
                    onChangeText={handleChange('senha')}
                    onBlur={handleBlur('senha')}
                    placeholderTextColor="#999999"
                    style={[Style.input, touched.senha && errors.senha ? Style.inputError : null]}
                  />
                  {touched.senha && errors.senha ? (
                    <Text style={Style.erroTxt}>
                      {touched.senha && errors.senha}
                    </Text>
                  ) : null
                  }
                  <TextInput
                    ref={ref_input_8}
                    placeholder="Confime a senha"
                    secureTextEntry
                    value={values.senha_confirmation}
                    onChangeText={handleChange('senha_confirmation')}
                    onBlur={handleBlur('senha_confirmation')}
                    placeholderTextColor="#999999"
                    style={[Style.input, touched.senha_confirmation && errors.senha_confirmation ? Style.inputError : null]}
                  />
                  {touched.senha_confirmation && errors.senha_confirmation ? (
                    <Text style={Style.erroTxt}>
                      {touched.senha_confirmation && errors.senha_confirmation}
                    </Text>
                  ) : null
                  }
                  <TouchableOpacity
                    onPress={() => setConfirm(!isConfirm)}
                    style={Style.termContainer}
                  >
                    <CheckBox
                      disable={false}
                      value={isConfirm}
                      onChange={() => setConfirm(!isConfirm)}
                      tintColors={{ true: '#f45b1d', false: '#f45b1d' }}
                      tintColor="#f45b1d"
                    />
                    <Text style={Style.termTxt}>Li e concordo com os Termos & Condições</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={Style.btnSignup}
                  >
                    {isLoad ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <Text style={Style.btnSignupTxt}>CRIAR CONTA</Text>
                      )}
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </Animatable.View>
      </ScrollView>
      <AwesomeAlert
        show={alert.open}
        title={alert.title}
        message={alert.body}
        showProgress={!!alert.loading}
        progressSize={32}
        progressColor="#d6001b"
        closeOnTouchOutside={!alert.loading}
        closeOnHardwareBackPress={false}
        showConfirmButton={!alert.loading}
        contentContainerStyle={[{ width: '100%' }, !alert.loading ? { height: 200 } : null]}
        actionContainerStyle={{ width: '100%', flex: 1 }}
        confirmText="Fechar"
        confirmButtonStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '40%',
          height: 42,
        }}
        confirmButtonTextStyle={{ fontWeight: 'bold' }}
        cancelButtonTextStyle={{ fontWeight: 'bold' }}
        confirmButtonColor="#d6001b"
        onConfirmPressed={() => setAlert({ ...alert, open: false })}
      />
    </KeyboardAvoidingView>
  );
};

export default Signup;
