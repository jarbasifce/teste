/* eslint-disable camelcase */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

import { listByUser } from '../../services/Address';
import { show } from '../../services/Store';
import style from './styles';

const details = ({ route }) => {
  const [payment, setpayment] = React.useState(true);
  const [receive, setReceive] = React.useState(true);
  const [store, setStore] = React.useState(Object);
  const [addresses, setAddresses] = React.useState([]);
  const [selectedAddress, setSelectAddresses] = React.useState(Object);
  const [currentDistrict, setCurrentDistrict] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const { storeId, orderId, inicio, fim } = route.params;

  const isAddressAvailable = (item) => {
    return store?.active_districts.some(
      (it) => it.pivot?.district_id === item.district?.id,
    );
  };

  const fetchStore = async () => {
    setLoading(() => true);
    show(storeId)
      .then((res) => {
        const s = res.data;
        setLoading(() => false);
        const info = {
          aceitaDelivery: ['0', '2'].indexOf(s.modo_atendimento) !== -1,
          aceitaLoja: ['1', '2'].indexOf(s.modo_atendimento) !== -1,
          aceitaAmbos: s.modo_atendimento === '2',
          aceitaDinheiro: ['1', '2'].indexOf(s.modo_pagamento) !== -1,
          aceitaCartao: ['0', '2'].indexOf(s.modo_pagamento) !== -1,
          aceitaTodos: s.modo_pagamento === '2',
        };

        setStore({
          ...s,
          ...info,
        });

        setReceive(info.aceitaAmbos ? true : !!info.aceitaDelivery);
      })
      .catch(() => {
        setLoading(() => false);
        Alert.alert('Não foi possível encontrar a loja');
        navigation.goBack();
      });
  };

  const getAddress = async () => {
    await listByUser()
      .then(({ data }) => {
        setAddresses(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          'Erro ao obter cidades',
          'Não foi possivel obter lista de cidades verifique sua conexão com a internet',
        );
      });
  };

  const handleAddress = (item) => {
    setSelectAddresses(item);
    setCurrentDistrict(
      store.active_districts.find(
        (d) => d.pivot?.district_id === item.district?.id,
      ),
    );
    setShowModal(false);
  };

  const renderAddress = (item, isAvailable) => (
    <TouchableOpacity
      style={style.boxItem}
      onPress={() => {
        if (isAvailable) handleAddress(item);
      }}
    >
      <View style={style.boxItemSub}>
        <Text style={[style.addrTitle, isAvailable ? {} : { color: 'gray' }]}>
          {item.nome}
        </Text>
        <Text style={[style.addrInfo, isAvailable ? {} : { color: 'gray' }]}>
          {item.district?.cidade}, {item.district?.nome}
        </Text>
        {isAvailable ? (
          <Text style={style.addrInfo}>
            {item.rua}, {item.numero}
          </Text>
        ) : (
            <Text style={[style.addrInfo, { color: '#f00' }]}>
              Bairro não atendido pela loja
            </Text>
          )}
      </View>
    </TouchableOpacity>
  );

  React.useEffect(() => {
    fetchStore();
  }, []);

  const renderPayment = () => {
    return (
      <View style={style.options}>
        {store.aceitaDinheiro && <View style={style.option}>
          <CheckBox
            value={payment}
            onChange={() => setpayment(store.aceitaTodos ? !payment : true)}
            tintColors={{ true: '#d6001b', false: '#d6001b' }}
            tintColor="gray"
          />
          <TouchableOpacity onPress={() => setpayment(!payment)}>
            <Text style={style.optionTXT}>Dinheiro</Text>
          </TouchableOpacity>
        </View>}
        {store.aceitaCartao && <View style={style.option}>
          <CheckBox
            value={!payment}
            onChange={() => setpayment(store.aceitaTodos ? !payment : false)}
            tintColors={{ true: '#d6001b', false: '#d6001b' }}
            tintColor="#d6001b"
          />
          <TouchableOpacity onPress={() => setpayment(!payment)}>
            <Text style={style.optionTXT}>Cartão de Credito</Text>
          </TouchableOpacity>
        </View>}
      </View>);
  }

  const renderAddressCB = () => {
    return (
      <View style={style.options}>
        {store.aceitaLoja && (
          <View style={style.option}>
            <CheckBox
              value={!receive}
              onChange={() =>
                setReceive(store.aceitaAmbos ? !receive : false)
              }
              tintColors={{ true: '#d6001b', false: '#d6001b' }}
              tintColor="#d6001b"
            />
            <TouchableOpacity
              onPress={() =>
                setReceive(store.aceitaAmbos ? !receive : false)
              }
            >
              <Text style={style.optionTXT}>No estabelecimento</Text>
            </TouchableOpacity>
          </View>
        )}
        {store.aceitaDelivery && (
          <View style={style.option}>
            <CheckBox
              value={receive}
              onChange={() =>
                setReceive(store.aceitaAmbos ? !receive : true)
              }
              tintColors={{ true: '#d6001b', false: '#d6001b' }}
              tintColor="#d6001b"
            />
            <TouchableOpacity
              onPress={() =>
                setReceive(store.aceitaAmbos ? !receive : true)
              }
            >
              <Text style={style.optionTXT}>No meu endereço</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  const renderAddressSelector = () => {
    return receive ? (
      <>
        <Text style={style.title}>Selecione o endereço</Text>
        <TouchableOpacity
          style={style.optionsAddress}
          onPress={() => {
            getAddress();
            setShowModal(true);
          }}
        >
          {Object.keys(selectedAddress).length === 0 ? (
            <Text style={style.selecAddresstTXT}>
              Clique para selecionar
            </Text>
          ) : (
              <Text style={style.selecAddresstTXT}>
                {selectedAddress.nome} - {selectedAddress.rua} {'Nº '}
                {selectedAddress.numero} - {selectedAddress.district.cidade}{' '}
                    / {selectedAddress.district.nome}
              </Text>
            )}
        </TouchableOpacity>
        {
          receive && selectedAddress.nome && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <Text style={style.addressTaxTXT}>Taxa de deslocamento:</Text>
              <Text style={style.addressTaxTXT}>
                R${' '}
                {Number(currentDistrict?.pivot?.taxa_entrega)
                  .toFixed(2)
                  .replace('.', ',')}
              </Text>
            </View>
          )
        }
      </>
    ) : null
  }

  return (
    <View style={style.container}>
      <View style={style.heading}>
        <Text style={style.headingLabel}>Detalhes do Pedido</Text>
      </View>
      {
        loading ?
          <ActivityIndicator color="#f00" size="large" style={{ marginTop: 64 }} /> :
          <ScrollView style={style.content} contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={style.optionsContainer}>
              <Text style={style.title}>Forma de pagamento</Text>
              {renderPayment()}
              <Text style={style.title}>Receber serviço</Text>
              {renderAddressCB()}
              {renderAddressSelector()}
            </View>
            <View style={style.finishContainer}>
              <TouchableOpacity
                style={[
                  style.btnFinish,
                  (receive && selectedAddress.nome) || !receive
                    ? {}
                    : { backgroundColor: 'gray' },
                ]}
                onPress={() => {
                  if ((receive && selectedAddress.nome) || !receive)
                    navigation.navigate('checkout', {
                      paymentForm: payment ? 'dinheiro' : 'cartão',
                      delivery: receive,
                      storeId,
                      inicio,
                      fim,
                      orderId,
                      address: receive ? selectedAddress : store.address,
                      store,
                      currentDistrict:
                        currentDistrict?.pivot?.taxa_entrega || Number(0),
                    });
                }}
              >
                <Text style={style.btnFinishTxt}>AVANÇAR</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      }
      <Modal
        transparent
        animationType="fade"
        visible={showModal}
        style={style.modalContainer}
      >
        <View style={style.modalScreen}>
          <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={style.modalOverflow} />
          </TouchableWithoutFeedback>
          <View style={style.modalContentUp}>
            <View style={{ flex: 1 }}>
              <View style={style.addressTitle}>
                <Text style={style.addressTitleTXT}>Selecione o Endereço</Text>
              </View>
              <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={() => (
                  <View style={{ alignItems: "center", marginTop: 16 }}>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: '#333', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }} onPress={() => { setShowModal(false); navigation.navigate('address') }}>
                      <Text style={{ color: '#333' }}>Gerenciar Endereços</Text>
                    </TouchableOpacity>
                  </View>
                )}
                renderItem={({ item }) =>
                  renderAddress(item, isAddressAvailable(item))
                }
              />
            </View>
            <View style={style.modalFooter}>
              <TouchableOpacity
                style={style.closeModalbtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={style.btnFinishTxt}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default details;
