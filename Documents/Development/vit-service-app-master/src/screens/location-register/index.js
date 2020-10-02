/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import StepItem from '../../components/StepItem';

import { list } from '../../services/City';
import { store } from '../../services/Address';
import style from './styles';

const location = ({ route }) => {
  const [cities, setCities] = React.useState([]);
  const [selectCity, setSelectCity] = React.useState(Object);
  const [districts, setDistricts] = React.useState([]);
  const [selectDistrict, setSelectDistrict] = React.useState({});
  const [currentStep, setCurrentStep] = React.useState(1);

  const ref_input_2 = useRef();
  const ref_input_3 = useRef();
  const ref_input_4 = useRef();

  const [address, setAddress] = React.useState({
    nome: '',
    nome_valid: true,
    district_id: '',
    rua: '',
    rua_valid: true,
    numero: '',
    numero_valid: true,
    complemento: '',
    user_id: '',
  });
  const navigation = useNavigation();

  const loadDistrict = (city) => {
    setSelectCity(city);
    setDistricts(city.districts);
    setCurrentStep(currentStep + 1);
  };

  const getUserID = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('@vitService:user'));
    setAddress({
      ...address,
      user_id: user.id,
    });
  };

  const handleDistrict = (district) => {
    setSelectDistrict(district);
    if (district) {
      setAddress({ ...address, district_id: district });
    }
    setCurrentStep(currentStep + 1);
  };

  const submitAddress = async () => {
    await store(address)
      .then(() => {
        Alert.alert('Endereço Salvo', 'O endereço foi salvo com sucesso');
        setAddress({
          nome: '',
          district_id: '',
          rua: '',
          numero: '',
          complemento: '',
          user_id: '',
        });
        setDistricts({});
        route.params.onRegister();
        navigation.navigate('address');
      })
      .catch(() => {
        Alert.alert(
          'Erro ao salvar o endereço',
          'Não foi possivel salvar o endereço, tente novamente',
        );
      });
  };

  React.useEffect(() => {
    const fecthCities = async () => {
      await list()
        .then(({ data }) => {
          setCities(data.data);
        })
        .catch(() => {
          Alert.alert(
            'Erro ao obter cidades',
            'Não foi possível obter lista de cidades, verifique sua conexão com a internet',
          );
        });
    };
    getUserID();
    fecthCities();
  }, []);

  const renderCity = ({ item }) => (
    <TouchableOpacity
      onPress={() => loadDistrict(item)}
      style={{
        ...style.boxItem,
        ...(selectCity.id === item.id ? style.boxItemSelected : {}),
      }}
    >
      <Text style={style.addrTitle}>{item.nome}</Text>
    </TouchableOpacity>
  );

  const renderDistrict = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDistrict(item.id)}
      style={{
        ...style.boxItem,
        ...(address.district_id === item.id ? style.boxItemSelected : {}),
      }}
    >
      <Text style={style.addrTitle}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <View style={style.heading}>
        <Text style={style.headingLabel}>Registrar Endereço</Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
        <View style={style.content}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              maxHeight: 56,
              marginTop: 8,
              backgroundColor: 'white',
              width: '100%',
            }}
          >
            <StepItem
              stepName="Cidade"
              checked={currentStep > 1}
              current={currentStep === 1}
              stepNumber="1"
              onPress={() => {
                setCurrentStep(1);
              }}
            />
            <StepItem
              stepName="Bairro"
              checked={currentStep > 2}
              current={currentStep === 2}
              stepNumber="2"
              onPress={() => {
                if (address.district_id || selectCity.id) setCurrentStep(2);
              }}
            />
            <StepItem
              stepName="Endereço"
              checked={currentStep === 4}
              current={currentStep === 3}
              stepNumber="3"
              onPress={() => {
                if (address.district_id) setCurrentStep(3);
              }}
            />
          </View>
          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            {currentStep === 1 ? (
              <>
                <Text style={style.accountLabel}>Qual a sua cidade ?</Text>
                <Animatable.View
                  animation="fadeInUp"
                  duration={300}
                  easing="ease-out"
                  style={style.box}
                >
                  <FlatList
                    data={cities}
                    renderItem={renderCity}
                    keyExtractor={(item) => `city_${item.id}`}
                  />
                </Animatable.View>
              </>
            ) : currentStep === 2 ? (
              <>
                <Text style={style.accountLabel}>Qual o seu bairro ?</Text>
                <View
                  animation="slideInUp"
                  duration={300}
                  easing="ease-in"
                  style={style.box}
                >
                  <FlatList
                    data={districts}
                    renderItem={renderDistrict}
                    keyExtractor={(item) => `district_${item.id}`}
                  />
                </View>
              </>
            ) : (
                  <>
                    <Text style={style.accountLabel}>Qual o seu endereço ?</Text>
                    <View style={style.form}>
                      <TextInput
                        onSubmitEditing={() => ref_input_2.current.focus()}
                        placeholder="Apelido para o endereço, ex: casa"
                        placeholderTextColor="#999999"
                        blurOnSubmit={false}
                        style={style.input}
                        value={address.nome}
                        onChangeText={(text) => {
                          setAddress({
                            ...address,
                            nome: text,
                          });
                        }}
                      />
                      <TextInput
                        ref={ref_input_2}
                        onSubmitEditing={() => ref_input_3.current.focus()}
                        placeholder="Nome da rua"
                        placeholderTextColor="#999999"
                        blurOnSubmit={false}
                        style={style.input}
                        value={address.rua}
                        onChangeText={(text) => {
                          setAddress({
                            ...address,
                            rua: text,
                          });
                        }}
                      />
                      <TextInput
                        ref={ref_input_3}
                        onSubmitEditing={() => ref_input_4.current.focus()}
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                        placeholder="Nº"
                        placeholderTextColor="#999999"
                        style={style.input}
                        value={address.numero}
                        onChangeText={(text) => {
                          setAddress({
                            ...address,
                            numero: text,
                          });
                        }}
                      />
                      <TextInput
                        ref={ref_input_4}
                        placeholder="Complemento"
                        placeholderTextColor="#999999"
                        style={style.input}
                        value={address.complemento}
                        onChangeText={(text) => {
                          setAddress({
                            ...address,
                            complemento: text,
                          });
                        }}
                      />
                      <View style={style.form}>
                        <TouchableOpacity
                          style={style.btnSaveAddress}
                          onPress={() => submitAddress()}
                        >
                          <Text style={style.txtBTN}>FINALIZAR</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default location;
