import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Octicons from 'react-native-vector-icons/Octicons';
import Style from './styles';
import Card from '../../components/Card';
import { list } from '../../services/Category';
import { listTopBanners } from '../../services/Banner';
import BannerCarousel from '../../components/BannerCarousel';

const logo = require('../../assets/images/logo.png');

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [categories, SetCategories] = React.useState([]);
  const [refreshing, SetRefreshing] = React.useState(true);
  const [topBanners, SetTopBanners] = React.useState([]);
  // const [botBanners, SetBotBanners] = React.useState([]);
  const [firstLoad, setFirstLoad] = React.useState(false);

  const listCategories = async () => {
    SetRefreshing(true);
    list()
      .then(({ data }) => {
        SetCategories(data.data);
        SetRefreshing(false);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  const listBanners = async () => {
    SetRefreshing(true);
    listTopBanners()
      .then(({ data }) => {
        SetTopBanners(data.map((b) => b.url_banner));
      })
      .catch(() => { });
    // listBottomBanners()
    //   .then(({ data }) => {
    //     SetBotBanners(data.map((b) => b.url_banner));
    //   })
    //   .catch(() => { });
  };

  React.useEffect(() => {
    listCategories();
    listBanners();
  }, []);

  React.useEffect(() => {
    if (!refreshing && !firstLoad) setFirstLoad(true);
  }, [refreshing]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#d6001b' }}>
      <ScrollView
        style={Style.container}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          marginTop: 12,
        }}
        refreshControl={
          <RefreshControl
            colors={['#f00']}
            refreshing={firstLoad && refreshing}
            onRefresh={listCategories}
          />
        }
      >
        <Animatable.View
          animation="fadeIn"
          duration={400}
          useNativeDriver
          easing="ease-in"
          style={Style.logoContainer}
        >
          <Image source={logo} style={Style.logo} resizeMode="stretch" />
        </Animatable.View>

        <View style={Style.categoryContainer}>
          {!firstLoad && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <ActivityIndicator color="white" size={48} />
            </View>
          )}
          {firstLoad &&
            categories.map((item, index) => (
              <Card
                key={`index-${item.id}`}
                delay={100 * index}
                click={() => {
                  if (item.categories.length > 0)
                    navigation.navigate('appnavigate', { categoryId: item.id });
                }}
              >
                <Image
                  source={{ uri: item.url_image }}
                  style={[
                    Style.cardImage,
                    { opacity: item.categories.length > 0 ? 1 : 0.3 },
                  ]}
                />
                <Text
                  style={[
                    Style.categorieTxt,
                    { opacity: item.categories.length > 0 ? 1 : 0.3 },
                  ]}
                >
                  {item.nome}
                </Text>
              </Card>
            ))}
        </View>
        {firstLoad && <BannerCarousel images={topBanners} />}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          top: width * 0.085,
          left: width * 0.074,
          right: width * 0.08,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={Style.barsButton}
          onPress={() => navigation.push('profile')}
        >
          <Octicons name="three-bars" size={35} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[Style.barsButton, { display: 'none' }]}
          onPress={() => navigation.push('profile')}
        >
          <Octicons name="bell" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
