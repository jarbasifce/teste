import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  RefreshControl,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import SubCategoryCard from '../../components/SubCategoryCard';
import StoreCard from '../../components/StoreCard2';
import { show } from '../../services/Category';
import { topRated, listBySubcategory } from '../../services/Store';
import { superCategoryBanner } from '../../services/Banner';
import BannerCarousel from '../../components/BannerCarousel';

import Style from './style';

const Subcategories = ({ route, navigation }) => {
  const [category, SetCategory] = React.useState(Object);
  const [stores, SetStores] = React.useState([]);
  const [refreshing, SetRefreshing] = React.useState(true);
  const [searching, setSearching] = React.useState(false);
  const [subcategoryId, SetSubCategoryId] = React.useState(0);
  const [banner, setBanner] = React.useState([]);
  const [subcategory, SetSubCategory] = React.useState(null);
  const [loading, setLoading] = React.useState({
    sub: true,
    top: false,
    list: false,
  });
  const [firstLoad, setFirst] = React.useState(false);
  const [search, setSearch] = React.useState(String);
  const [searchR, setSearchR] = React.useState(String);

  const { categoryId } = route.params;

  const updateLoading = (value) => {
    setLoading((load) => ({ ...load, ...value }));
  };

  const listSubCategories = async () => {
    updateLoading({ sub: true });
    show(categoryId)
      .then(({ data }) => {
        SetCategory(data[0]);
        updateLoading({ sub: false });
      })
      .catch(() => {
        updateLoading({ sub: false });
      });
  };

  const searchStores = async () => {
    updateLoading({ top: true });
    topRated(categoryId, search)
      .then(({ data }) => {
        SetStores(data);
        updateLoading({ top: false });
        setSearching(!!search.length);
        setSearchR(search);
      })
      .catch(() => {
        setLoading({ top: false });
      });
  };

  const listTopRatedStores = async () => {
    updateLoading({ top: true });
    topRated(categoryId)
      .then(({ data }) => {
        SetStores(data);
        if (searching) setSearching(false);
        updateLoading({ top: false });
      })
      .catch((error) => {
        setLoading({ top: false });
        console.log(error);
      });
  };

  const listStoresBySub = async () => {
    updateLoading({ list: true });
    listBySubcategory(subcategoryId)
      .then(({ data }) => {
        SetSubCategory(data);
        SetStores(data.stores.data);
        if (searching) setSearching(false);
        updateLoading({ list: false });
      })
      .catch((error) => {
        updateLoading({ list: false });
        console.log(error);
      });
  };

  const fetchBanners = async () => {
    superCategoryBanner(categoryId).then(({ data }) => {
      setBanner(data.map((b) => b.url_banner));
    });
  };
  const fetchData = async () => {
    SetStores([]);
    listSubCategories();
    if (subcategoryId) {
      listStoresBySub();
    } else {
      listTopRatedStores();
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchBanners();
  }, [subcategoryId]);

  React.useEffect(() => {
    const isLoading = Object.values(loading).some((l) => l);
    SetRefreshing(isLoading);
    if (!firstLoad && !isLoading) setFirst(true);
  }, [loading]);

  return (
    <>
      <View style={Style.container}>
        <View style={Style.heading}>
          <TextInput
            placeholder="Buscar por lojas"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={Style.searchBar}
          />
          <TouchableOpacity
            onPress={() => searchStores()}
            style={Style.searchButton}
          >
            <FontAwesome name="search" color="white" size={16} />
          </TouchableOpacity>
        </View>
        {firstLoad ? (
          <Animatable.View
            style={{ flex: 1 }}
            animation="fadeIn"
            duration={150}
            useNativeDriver
            easing="ease-in"
          >
            <ScrollView
              style={Style.scrollContainer}
              refreshControl={
                <RefreshControl
                  colors={['#f00']}
                  refreshing={refreshing}
                  onRefresh={fetchData}
                />
              }
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={Style.categoryContainer}
              >
                <Text style={Style.categoryLabel}>{category.nome}</Text>
              </TouchableOpacity>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={Style.subcategoriesContainer}
                data={category.categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <SubCategoryCard
                    data={item}
                    key={index.toString()}
                    selected={item.id == subcategoryId}
                    click={() => SetSubCategoryId(item.id)}
                  ></SubCategoryCard>
                )}
              />
              <View style={Style.storeContainer}>
                <Text style={Style.storeLabel}>
                  {searching
                    ? `Buscando por "${searchR}"`
                    : subcategory
                      ? 'Filtrando lojas por '
                      : 'Lojas mais avaliadas'}
                  {!!subcategory && !searching && (
                    <Text style={{ fontWeight: 'bold', color: 'red' }}>
                      {(subcategory || {}).nome}
                    </Text>
                  )}
                </Text>
                <View style={Style.scrollContainer}>
                  {stores.map((item, index) => (
                    <StoreCard
                      data={item}
                      key={index.toString()}
                      click={() =>
                        navigation.dangerouslyGetParent().push('service', {
                          storeId: item.id,
                          superCategoryId: categoryId,
                          categoryId: subcategoryId,
                        })
                      }
                    />
                  ))}
                </View>
              </View>
              <BannerCarousel images={banner} />
            </ScrollView>
          </Animatable.View>
        ) : (
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            >
              <ActivityIndicator color="red" size={42} />
            </View>
          )}
      </View>
    </>
  );
};

export default Subcategories;
