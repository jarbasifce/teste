import React from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';

import { show as showStore } from '../../services/Store';
import { listByStore } from '../../services/Service';
import style from './styles';

import ServiceModal from '../../components/ServiceModal';

import { CarShopContext } from '../../context/CarShopContext';

const service = ({ route, navigation }) => {
  const [store, setStore] = React.useState({});
  const [superCategoryId, setSuperCategoryId] = React.useState(
    route?.params?.superCategoryId || '0',
  );
  const [categoryId, setCategoryId] = React.useState(
    route?.params?.categoryId || '0',
  );
  const [refreshing, SetRefreshing] = React.useState(true);
  const [first, setFirst] = React.useState(false);
  const [showBio, setShowBio] = React.useState(false);

  const storeId = route?.params?.storeId;

  let children;

  const item = {
    nome: '',
    valor: 0,
    duracao: 0,
    desconto: 0,
    img: '',
    descricao: '',
  };

  const { insertService, findMerge } = React.useContext(CarShopContext);

  const fetchData = async () => {
    SetRefreshing(true);
    showStore(storeId)
      .then(async ({ data: storeData }) => {
        listByStore(storeId, `${superCategoryId},${categoryId}`).then(
          ({ data }) => {
            setStore({
              ...storeData, products: data.data, categories: [{
                nome: 'Todos',
                id: '0'
              }, ...storeData.categories]
            });
            SetRefreshing(false);
            if (!first) setFirst(true);
          },
        );
      })
      .catch(() => {
        SetRefreshing(false);
        navigation.goBack();
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [categoryId]);

  function RenderStar(note) {
    const stars = [];
    Array(5)
      .fill()
      .forEach((_, n) => {
        stars.push(
          <FontAwesome
            key={`star_${n}`}
            name={n + 1 <= note ? 'star' : 'star-o'}
            color={n + 1 <= note ? '#f00' : '#c3c3c3'}
            size={22}
            style={style.star}
          />,
        );
      });
    return stars;
  }

  const RenderProduct2 = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        children.openModal({
          ...item,
          storeName: store.nome,
          ger_tempo: store.ger_tempo,
        })
      }
      style={{
        backgroundColor: 'white',
        marginHorizontal: 4,
        borderRadius: 8,
        width: 140,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      key={item.id}
    >
      <Image
        source={{ uri: item.url_image }}
        style={{
          width: 124,
          height: 124,
          marginHorizontal: 8,
          marginTop: 8,
          marginBottom: 6,
          backgroundColor: '#f3f3f3',
          borderColor: '#eee',
          borderWidth: .5
        }}
        resizeMode="stretch"
      />
      {item.desconto > 0 && (
        <View style={{
          position: 'absolute',
          top: 8,
          right: 8,
          left: 8,
          height: 24,
          borderRadius: 2,
          justifyContent: 'center',
          backgroundColor: '#f00'
        }}>
          <Text style={{
            fontSize: 10,
            textAlign: 'center',
            fontFamily: 'Roboto-Regular',
            fontWeight: 'bold',
            color: 'white'
          }}>PROMOÇÃO {item.desconto}% OFF</Text>
        </View>)
      }
      <Text numberOfLines={1} style={{
        fontSize: 9,
        paddingTop: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular'
      }}>
        {item.nome}
      </Text>
      <View style={{ height: 10, justifyContent: 'center' }}>
        {item.desconto > 0 && <Text style={{
          fontSize: 8,
          paddingVertical: 1,
          paddingHorizontal: 8,
          textAlign: 'center',
          color: '#888',
          fontFamily: 'Roboto-Regular',
        }}>
          De <Text style={{ fontWeight: 'bold' }}>R$ {Number(item.valor).toFixed(2).replace(".", ",")}</Text> por
      </Text>}
      </View>
      <View>
        <Text style={{
          fontSize: 12,
          textAlign: 'center',
          fontFamily: 'Roboto-Regular',
          color: '#f00',
          marginBottom: 12,
          fontWeight: '600'
        }}>
          R$ {(item.valor * ((100 - item.desconto) / 100.0) || 0).toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const RenderCategories = (item) => {
    const isSelected = item.item.id === categoryId;
    return (
      <TouchableOpacity
        onPress={() => setCategoryId(item.item.id)}
        key={item.item.id}
        style={isSelected ? style.activeCategory : style.category}
      >
        <Text style={isSelected ? style.activeCategoryText : style.categoryText}>{item.item.nome}</Text>
      </TouchableOpacity>
    )
  };

  return (
    (!refreshing || first) ? (<>
      <View style={style.titleConatainer}>
        <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">
          {store.nome}
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#f00']}
            refreshing={refreshing}
            onRefresh={fetchData}
          />
        }
        style={style.container}
      >
        <View style={style.content}>
          <View style={style.bannerCover}>
            <Image
              source={{ uri: store.url_logo }}
              style={style.banner}
              resizeMode="cover"
            />
            <TouchableOpacity style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              backgroundColor: '#fff',
              borderColor: 'red',
              borderWidth: 2,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 36,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 5,
            }}
              onPress={() => setShowBio(true)}
            >
              <FontAwesome name="info-circle" size={18} color="#f00" />
            </TouchableOpacity>
          </View>
          <View style={style.description}>
            <View style={style.infoStore}>
              <View style={style.stars}>{RenderStar(store.avaliacao)}</View>
            </View>
            <FlatList
              horizontal
              data={store.categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={RenderCategories}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <FlatList
            data={store.products}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={RenderProduct2}
            style={style.listProduct}
          />
          {!store.products?.length && (
            <View style={style.emptyView}>
              <Text style={style.emptyText}>Nenhum serviço disponível</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <ServiceModal
        ref={(ref) => (children = ref)}
        item={item}
        check={findMerge}
        add={insertService}
      />
      <AwesomeAlert
        show={showBio}
        showProgress={false}
        title={`Sobre`}
        message={store.descricao}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton
        contentContainerStyle={{ width: '100%', paddingVertical: 10 }}
        actionContainerStyle={{ width: '100%' }}
        messageStyle={{ textAlign: 'justify', lineHeight: 18 }}
        confirmText="Fechar"
        confirmButtonStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '60%',
          height: 42,
        }}
        confirmButtonTextStyle={{ fontWeight: 'bold' }}
        confirmButtonColor="#d6001b"
        onConfirmPressed={() => setShowBio(false)}
      />
    </>)
      :
      (
        <ActivityIndicator style={{ marginTop: 64 }} color="#f00" size="large" />
      )
  );
};

export default service;
