import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MapView from 'react-native-maps';

import { listByUser, remove } from '../../services/Address';
import style from './styles';

const location = ({ navigation }) => {
  const [addresses, SetAddresses] = React.useState([]);
  const [userid, setUserId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(String);

  const getAddress = async () => {
    setLoading(true);
    await listByUser()
      .then(({ data }) => {
        SetAddresses(data);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          'Erro ao obter cidades',
          'Não foi possivel obter lista de cidades verifique sua conexão com a internet',
        );
      });
    setLoading(false);
  };

  const removeAddress = (id) => {
    setDeleting(id);
    remove(id)
      .then(() => {
        setDeleting('0');
        getAddress();
      })
      .catch(() => {
        setDeleting('0');
      });
  };

  React.useEffect(() => {
    getAddress();
  }, []);

  const renderAddreses = ({ item }) => (
    <View style={style.boxItem}>
      <View style={style.boxItemSub}>
        <Text style={style.addrTitle}>{item.nome}</Text>
        <Text style={style.addrInfo}>
          {item.district.cidade}, {item.district.nome}
        </Text>
        <Text style={style.addrInfo}>
          {item.rua}, {item.numero}
        </Text>
      </View>
      <View style={style.addrDeleteContainer}>
        <TouchableOpacity
          onPress={() => removeAddress(item.id)}
          style={style.addrDeleteButton}
        >
          {deleting == item.id ? (
            <ActivityIndicator color="#a1a1a1" />
          ) : (
              <FontAwesome color="#a1a1a1" size={16} name="trash" />
            )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={style.constiner}>
      <View style={style.content}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('address-register', { onRegister: getAddress })
          }
          style={style.createButton}
        >
          <Text style={style.createButtonLabel}>Adicionar Endereço</Text>
        </TouchableOpacity>
        <Text style={style.accountLabel}>Endereços</Text>
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAddreses}
          refreshControl={
            <RefreshControl
              colors={['#f00']}
              refreshing={loading}
              onRefresh={getAddress}
            />
          }
          style={style.box}
        />
      </View>
    </View>
  );
};

export default location;
