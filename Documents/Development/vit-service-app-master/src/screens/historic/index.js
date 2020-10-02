/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import style from './styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { orderByUser } from '../../services/Order';

const historic = () => {
  const [order, setOrder] = React.useState({});
  const [refreshing, SetRefreshing] = React.useState(true);

  const navigation = useNavigation();

  const fectOrder = async () => {
    SetRefreshing(true);
    orderByUser().then(({ data }) => {
      setOrder(data);
    });
    SetRefreshing(false);
  };

  React.useEffect(() => {
    fectOrder();
  }, []);

  const RenderOrder = ({ item }) => (
    <TouchableOpacity
      style={style.itemContainer}
      onPress={() => {
        navigation.navigate('OrdemDetails', { orderID: item.id });
      }}
    >
      <Image source={{ uri: item?.store?.url_logo }} style={style.imageStore} />
      <View style={style.orderDescription}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 4 }}>
          <Text style={style.nomeStore} numberOfLines={1} ellipsizeMode="tail">
            #{item.id} {item?.store?.nome}
          </Text>
        </View>
        <View style={style.detailLine}>
          <Text style={style.dataOrder}>
            Efetuado {moment(item.dataAgendamento).fromNow()}
          </Text>
          <Text style={style.dataStatus}>
            {item.status}
          </Text>
        </View>
        <Text style={style.dataOrder}>R$ {Number(item.valor).toFixed(2).replace('.', ',')}</Text>
      </View>
      <View style={{ justifyContent: 'center', marginHorizontal: 4 }}>
        <FontAwesome color="#d0d0d0" name="chevron-right" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <View style={style.content}>
        <FlatList
          data={order}
          keyExtractor={(item) => item.id.toString()}
          renderItem={RenderOrder}
          refreshing={order}
          refreshControl={
            <RefreshControl
              colors={['#f00']}
              refreshing={refreshing}
              onRefresh={fectOrder}
            />
          }
        />
      </View>
    </View>
  );
};

export default historic;
