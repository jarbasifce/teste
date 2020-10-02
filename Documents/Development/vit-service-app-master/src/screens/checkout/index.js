/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated, TextInput
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import AwesomeAlert from 'react-native-awesome-alerts';

import { CarShopContext } from '../../context/CarShopContext';
import { store } from '../../services/Order';
import style from './styles';

const schedules = ({ route }) => {
  const [order, setOrder] = React.useState(route.params);
  const [coupon, setCoupon] = React.useState(String);
  const [notification, setNotification] = React.useState(Object);

  const { carShop, removePedido } = React.useContext(CarShopContext);
  const navigation = useNavigation();

  const buttonStatus = new Animated.Value(0);

  const playAnimation = () => {
    Animated.timing(buttonStatus, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const finishAnimation = () => {
    buttonStatus.stopAnimation();
    buttonStatus.setValue(1);
  };

  const resetAnimation = () => {
    buttonStatus.setValue(0);
  };

  function humanitizeTime(time) {
    let t = '';
    t +=
      (Math.floor(time / 60) % 24) > 0 ? `${Math.floor(time / 60) % 24}h ` : '';
    t += time % 60 > 0 ? `${time % 60}min ` : '';
    return t;
  }

  const getPedido = () => {
    if (carShop[order.storeId] && carShop[order.storeId].pedidos) {
      const pedido = carShop[order.storeId].pedidos.find(
        (p) => p.id_pedido === order.orderId,
      );
      if (pedido) {
        return pedido;
      }
    }
    return {};
  };

  const getProducts = () => {
    return getPedido().servicos || [];
  };

  const obterProduct = () => {
    return getProducts().map((item) => {
      return {
        id: item.service_id,
        qtd: item.qtd,
      };
    });
  };

  const handleSubmit = async () => {
    resetAnimation();
    playAnimation();
    store({
      store_id: order.storeId,
      address_id: order.address.id,
      services: obterProduct(),
      tipo_pagamento: order.paymentForm,
      delivery: order.delivery,
      inicio: order.inicio,
      coupon_code: coupon ? coupon : null
    })
      .then(() => {
        finishAnimation();
        setNotification({
          notRead: true,
          title: 'Pedido Concluído!',
          body:
            'Você receberá em breve uma resposta da loja!',
        });
      })
      .catch((erro) => {
        finishAnimation();
        setTimeout(resetAnimation, 500);
        if (erro.response?.data) {
          setNotification({
            notRead: true,
            error: true,
            title: erro.response.data.message,
            body: 'Não foi possível finalizar o pedido',
          });
        }
      });
  };

  const modalCallback = () => {
    if (!notification.error) {
      setTimeout(() => {
        removePedido({
          store_id: order.storeId,
          id_pedido: order.orderId,
        });
        navigation.pop(3);
      }, 250);
    }
    setNotification({ ...notification, notRead: false });
  };

  return (
    <View style={style.container}>
      <View style={style.titleConatainer}>
        <Text style={style.title}>Finalizar Pedido</Text>
      </View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={style.pageContent}>
          <View style={style.pageFlex}>
            <Text style={style.label}>Estabelecimento</Text>
            <Text style={style.value}>{(order.store || {}).nome}</Text>

            <Text style={style.label}>Atendimento</Text>
            <Text style={style.value}>
              {order.delivery ? 'À domicílio' : 'No estabelecimento'}
            </Text>
            <Text style={style.label}>Endereço</Text>
            <Text style={style.value}>
              {order.address.rua},{order.address.numero}{' '}
              {order.delivery
                ? order.address.district.nome
                : order.address.bairro}
              ,
              {order.delivery
                ? order.address.district.cidade
                : order.address.cidade}
            </Text>
            <Text style={style.label}>Data do Atendimento</Text>
            <Text style={style.value}>
              {moment(order.inicio).utc().format('ll [de] LT')} às {order.fim}
            </Text>
            <Text style={style.label}>Descrição dos Serviços</Text>
            <View style={style.serviceContainer}>
              {getProducts().map((product) => (
                <View style={style.serviceItem} key={`serv_item_${product.id}`}>
                  <View style={style.serviceItemQty}>
                    <Text style={style.serviceItemQtyLabel}>
                      {product.qtd} x
                    </Text>
                  </View>
                  <View style={style.serviceItemInfo}>
                    <Text numberOfLines={1} style={style.serviceName}>{product.nome}</Text>
                    <View style={style.serviceMeta}>
                      <Text style={{ fontSize: 12, color: '#333' }}>
                        R$ {Number(product.valor).toFixed(2).replace('.', ',')}
                      </Text>
                      <View style={style.serviceDuration}>
                        <FontAwesome
                          color="#333"
                          name="clock-o"
                          size={10}
                          style={{ marginRight: 4 }}
                        />
                        <Text style={{ fontSize: 12, color: '#333' }}>
                          {humanitizeTime(product.duracao)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={style.payInfo}>
              <View style={style.payItem}>
                <View style={style.payItemLeft}>
                  <Text style={style.serviceItemQty}>
                    Forma de Pagamento
                    </Text>
                </View>
                <View style={style.payItemRight}>
                  <Text>{order.paymentForm}</Text>
                </View>
              </View>
              <View style={style.payItem}>
                <View style={style.payItemLeft}>
                  <Text style={style.serviceItemQty}>
                    Taxa de Deslocamento
                    </Text>
                </View>
                <View style={style.payItemRight}>
                  <Text>
                    R${' '}
                    {Number(order.currentDistrict)
                      .toFixed(2)
                      .replace('.', ',')}
                  </Text>
                </View>
              </View>
              <View style={style.payItem}>
                <View style={style.payItemLeft}>
                  <Text style={style.serviceItemQty}>Duração Total</Text>
                </View>
                <View style={style.payItemRight}>
                  <Text>{humanitizeTime(getPedido().total_duracao)}</Text>
                </View>
              </View>
              <View style={style.payItem}>
                <View style={style.payItemLeft}>
                  <Text style={style.serviceItemQty}>Valor Total</Text>
                </View>
                <View style={style.payItemRight}>
                  <Text>
                    R${' '}
                    {Number(getPedido().total_valor + order.currentDistrict)
                      .toFixed(2)
                      .replace('.', ',')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={style.footer}>
              <TextInput
                placeholder="CÓDIGO DO CUPOM"
                placeholderTextColor="#999"
                value={coupon}
                autoCapitalize="characters"
                onChangeText={t => setCoupon(t)}
                style={{
                  textAlign: 'center',
                  borderColor: '#ddd',
                  borderWidth: 2,
                  borderStyle: 'dashed',
                  borderRadius: 4,
                  marginTop: 4,
                }} />
              <TouchableOpacity
                activeOpacity={0.4}
                style={[style.btn]}
                onPress={() => handleSubmit()}
              >
                <Animated.View
                  style={{
                    position: 'absolute',
                    backgroundColor: 'red',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: [
                      {
                        scaleX: buttonStatus,
                      },
                    ],
                  }}
                />
                <Text style={style.labelBtn}>Concluir Pedido</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <AwesomeAlert
          show={!!notification.notRead}
          showProgress={false}
          title={notification.title}
          message={notification.body}
          closeOnHardwareBackPress={false}
          showConfirmButton
          closeOnTouchOutside={false}
          confirmText="Fechar"
          confirmButtonStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '80%',
            height: 42,
          }}
          confirmButtonTextStyle={{ fontWeight: 'bold' }}
          confirmButtonColor="#d6001b"
          onConfirmPressed={() => modalCallback()}
          onCancelPressed={() => modalCallback()}
        />
      </ScrollView>
    </View>
  );
};

export default schedules;
