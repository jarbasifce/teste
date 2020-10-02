import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { CarShopContext } from '../../context/CarShopContext';
import style from './styles';

const Car = () => {
  const { carShop, removeService, changeQtd, currentServices, findMerge, mergePedidos } = React.useContext(CarShopContext);

  const navigation = useNavigation();
  const handleDelete = (item) => {
    removeService(item);
  };

  const handleQtd = (type, item) => {
    changeQtd(type, item);
  };

  function humanitizeTime(time) {
    let t = '';
    t +=
      Math.floor(time / 60) % 24 > 0 ? `${Math.floor(time / 60) % 24}h ` : '';
    t += time % 60 > 0 ? `${time % 60}min ` : '';
    return t;
  }

  return (
    <>
      <View style={style.titleConatainer}>
        <Text style={style.title}>Carrinho</Text>
      </View>
      <ScrollView>
        {currentServices > 0 ? (
          <View style={style.content}>
            {Object.keys(carShop).map((ele) =>
              (carShop[ele].pedidos || []).map((pedido) => (
                <View style={style.content} key={`${ele}+'_'+${pedido.id_pedido}`}>
                  <View style={{ backgroundColor: '#2a414f', flexDirection: 'row', width: '95%', height: 42, borderTopLeftRadius: 8, borderTopRightRadius: 8, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={[style.storeNameTXT, { width: '90%' }]} numberOfLines={1}>
                      {carShop[ele].nome_loja}
                    </Text>
                  </View>

                  <View style={{ borderWidth: 1, borderColor: '#2a414f', width: '95%', backgroundColor: '#fefefe', justifyContent: 'flex-end', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, }}>
                    {pedido.servicos.map((item) => (
                      <View key={item.service_id} style={style.serviceContainer}>
                        <View style={style.serviceRow}>
                          <View style={{ minWidth: '22%', maxWidth: '22%' }}>
                            <Image source={{ uri: item.img }} style={{ width: '100%', height: 72, borderRadius: 8 }} />
                          </View>
                          <View style={{ minWidth: '48%', maxWidth: '48%', paddingLeft: 12 }}>
                            <Text style={[style.serviceTXT, { width: '100%' }]} numberOfLines={1} >
                              {item.nome}
                            </Text>
                            <Text style={style.servicePriceTXT}>
                              R$ {Number(item.valor).toFixed(2).replace('.', ',')}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Fontisto name="clock" style={{ marginBottom: 3 }} color="#444" size={10} />
                              <Text style={style.duration}>
                                {humanitizeTime(item.duracao)}
                              </Text>
                            </View>
                          </View>
                          <View style={{ minWidth: '30%', maxWidth: '30%', alignItems: 'center' }}>
                            <View style={style.serviceQTD}>
                              <Fontisto
                                name="caret-left"
                                size={20}
                                color='#2a414f'
                                style={{ paddingHorizontal: 5, paddingVertical: 5 }}
                                onPress={() =>
                                  handleQtd('-', {
                                    store_id: ele,
                                    service_id: item.service_id,
                                    id_pedido: pedido.id_pedido,
                                  })
                                }
                              />
                              <Text style={style.serviceQtdTXT}>{item.qtd}</Text>
                              <Fontisto
                                name="caret-right"
                                color='#2a414f'
                                size={20}
                                style={{ paddingHorizontal: 5, paddingVertical: 5 }}
                                onPress={() =>
                                  handleQtd('+', {
                                    store_id: ele,
                                    service_id: item.service_id,
                                    id_pedido: pedido.id_pedido,
                                  })
                                }
                              />
                            </View>

                            <Octicons
                              name="trashcan"
                              size={20}
                              style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                              onPress={() =>
                                handleDelete({
                                  store_id: ele,
                                  service_id: item.service_id,
                                  id_pedido: pedido.id_pedido,
                                })
                              }
                              color="#d6001b"
                            />
                          </View>
                        </View>
                      </View>
                    ))}
                    <View style={style.details}>
                      <View style={{ minWidth: '40%', alignItems: 'center' }}>
                        <Text style={style.price}>
                          R$ {Number(pedido.total_valor).toFixed(2).replace('.', ',')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Fontisto name="clock" style={{ marginBottom: 2 }} color="#2a414f" size={12} />
                          <Text style={style.duration}>
                            {humanitizeTime(pedido.total_duracao)}
                          </Text>
                        </View>
                      </View>
                      <View style={{ minWidth: '60%', maxWidth: '60%', alignItems: 'center' }}>
                        <TouchableOpacity
                          style={style.btnFinish}
                          onPress={() => {
                            navigation.navigate('shedule', {
                              storeId: ele,
                              orderId: pedido.id_pedido,
                              duration: pedido.total_duracao,
                            })
                          }
                          }
                        >
                          <Text style={style.btnFinishTxt}>Agendar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )),
            )}
          </View>
        ) : (
            <View style={style.emptyCarContainer}>
              <Text style={style.empytCarTEXT}>Seu carrinho está vazio!</Text>
            </View>
          )}
      </ScrollView>
    </>
  );
};

export default Car;
