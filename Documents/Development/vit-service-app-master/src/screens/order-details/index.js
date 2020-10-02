/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StepIndicator from 'react-native-step-indicator';
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment';

import { show, cancel } from '../../services/Order';
import style from './styles';

const orderDetail = ({ route }) => {
  const [order, setOrder] = React.useState({});
  const [isLoading, setIsLoading] = React.useState({});
  const [step, setStep] = React.useState(0);
  const [notification, setNotification] = React.useState({
    isOpen: false,
    mensage: ''
  });
  const { orderID } = route.params;

  const customStyles = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 45,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#d6001b',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#d6001b',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#d6001b',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#d6001b',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#d6001b',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: '#d6001b'
  }

  function humanitizeTime(time) {
    let t = '';
    t +=
      Math.floor(time / 60) % 24 > 0 ? `${Math.floor(time / 60) % 24}h ` : '';
    t += time % 60 > 0 ? `${time % 60}min ` : '';
    return t;
  }

  const updateStatus = () => {
    switch (order.status) {
      case 'aguardo':
        setStep(0);
        break;
      case 'aceito':
        setStep(1);
        break;
      case 'enviado':
        setStep(2);
        break;
      case 'finalizado':
        setStep(3);
        break;
      case 'cancelado':
        setStep(1);
        break;
      default:
        break;
    }
  }

  const getOrder = async () => {
    setIsLoading(true);
    await show(orderID)
      .then((response) => {
        setOrder(response.data[0]);
        updateStatus();
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const renderIconName = ({ position, stepStatus }) => {
    const config = {
      name: 'clock',
      color: stepStatus === 'finished' ? '#ffffff' : '#d6001b',
      size: 20,
    }
    switch (position) {
      case 0: {
        config.name = 'clock-o';
        break;
      }
      case 1: {
        order.status !== 'cancelado' ? config.name = 'check' : config.name = 'close';
        break;
      }
      case 2: {
        config.name = 'motorcycle';
        break;
      }
      case 3: {
        config.name = 'star-o';
        break;
      }
      default: {
        break;
      }
    }
    return config;
  }

  const cancelOrder = async () => {
    cancel(order.id).then(() => {
      setNotification({ mensage: "O seu pedido foi cancelado", isOpen: true });
      getOrder();
    }).catch(erro => {
      console.log(erro);
      setNotification({ mensage: "Não foi possível cancelar serviço", isOpen: true });
    })
  }

  const renderIcon = (params) => (
    <FontAwesome {...renderIconName(params)} />
  );

  const checkDisable = () => {
    return !(moment().utc(true).isBefore(
      moment(order.agendamento_inicio)
        .utc(true)
        .subtract(1, 'hour')
      , 'minutes'));
  }

  React.useEffect(() => {
    getOrder();
  }, []);

  React.useEffect(() => {
    updateStatus();
  }, [order])

  return (
    <View style={style.container}>
      <View style={style.titleConatainer}>
        <Text style={style.title}>Pedido #{orderID}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator color="#d6001b" size="large" />
      ) : (
          <>
            <ScrollView style={style.content}>
              <View style={{ marginTop: 20 }}>
                {order.status !== 'cancelado' ? (
                  <StepIndicator
                    customStyles={customStyles}
                    currentPosition={step}
                    stepCount={4}
                    renderStepIndicator={renderIcon}
                    labels={[
                      'Aguardando loja',
                      'Serviço aceito',
                      'Em andamento',
                      'Finalizado'
                    ]}
                  />
                ) : (
                    <StepIndicator
                      customStyles={customStyles}
                      currentPosition={step}
                      stepCount={2}
                      renderStepIndicator={renderIcon}
                      labels={[
                        'Aguardando loja',
                        'Cancelado'
                      ]}
                    />
                  )}

              </View>
              <View style={style.pageContent}>
                <View style={style.pageFlex}>
                  <Text style={style.label}>Estabelecimento</Text>
                  <Text style={style.value}>{order?.store?.nome}</Text>
                  <Text style={style.label}>Atendimento</Text>
                  <Text style={style.value}>
                    {order.delivery ? 'No meu endereço' : 'No estabelecimento'}
                  </Text>
                  <Text style={style.label}>Endereço</Text>
                  <Text style={style.value}>
                    {order?.address?.rua}, {order?.address.numero}{' '}
                    {order?.address?.district?.nome}, {order?.address?.district?.city?.nome}
                  </Text>
                  <Text style={style.label}>Data do Atendimento</Text>
                  <Text style={style.value}>
                    {moment(order?.agendamento_inicio).format('ll [de] LT')}{' '}
                as {moment(order?.agendamento_fim).format('HH:mm')}
                  </Text>
                  <Text style={style.label}>Descrição dos Serviços</Text>
                  <View style={style.serviceContainer}>
                    {order?.services.map((product) => (
                      <View
                        style={style.serviceItem}
                        key={`serv_item_${product.id}`}
                      >
                        <View style={style.serviceItemQty}>
                          <Text style={style.serviceItemQtyLabel}>
                            {product?.pivot.qtd} x
                      </Text>
                        </View>
                        <View style={style.serviceItemInfo}>
                          <Text style={style.serviceName} numberOfLines={1}>{product.nome}</Text>
                          <View style={style.serviceMeta}>
                            <Text style={{ fontSize: 12, color: '#333' }}>
                              R${' '}
                              {Number(product.valor).toFixed(2).replace('.', ',')}
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
                          Forma de Pagamento:
                    </Text>
                      </View>
                      <View style={style.payItemRight}>
                        <Text>{order.tipo_pagamento}</Text>
                      </View>
                    </View>
                    <View style={style.payItem}>
                      <View style={style.payItemLeft}>
                        <Text style={style.serviceItemQty}>
                          Taxa de Deslocamento:
                    </Text>
                      </View>
                      <View style={style.payItemRight}>
                        <Text>
                          R${' '}
                          {Number(order.valor_deslocamento)
                            .toFixed(2)
                            .replace('.', ',')}
                        </Text>
                      </View>
                    </View>
                    <View style={style.payItem}>
                      <View style={style.payItemLeft}>
                        <Text style={style.serviceItemQty}>Duração Total:</Text>
                      </View>
                      <View style={style.payItemRight}>
                        <Text>{humanitizeTime(order.total_duration)}</Text>
                      </View>
                    </View>
                    <View style={style.payItem}>
                      <View style={style.payItemLeft}>
                        <Text style={style.serviceItemQty}>Valor Total:</Text>
                      </View>
                      <View style={style.payItemRight}>
                        <Text>
                          R${' '}
                          {Number(order.valor + order.valor_deslocamento)
                            .toFixed(2)
                            .replace('.', ',')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              {order.status !== 'cancelado' && order.status !== 'finalizado' ? (
                <TouchableOpacity
                  onPress={cancelOrder}
                  disabled={checkDisable()}
                  style={[style.btn, checkDisable() ? { backgroundColor: 'gray' } : {}]}>
                  <Text style={style.labelBtn}>Cancelar serviço</Text>
                </TouchableOpacity>
              ) : null}
            </ScrollView>
          </>
        )}
      <AwesomeAlert
        show={notification.isOpen}
        showProgress={false}
        message={notification.mensage}
        closeOnTouchOutside
        closeOnHardwareBackPress
        showConfirmButton
        confirmText="Fechar"
        confirmButtonStyle={{ width: 100 }}
        confirmButtonTextStyle={{ textAlign: 'center' }}
        confirmButtonColor="#d6001b"
        onConfirmPressed={() => setNotification({ ...notification, isOpen: false })}
      />
    </View>
  );
};

export default orderDetail;
