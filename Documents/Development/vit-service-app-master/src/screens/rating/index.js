/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import { show } from '../../services/Order';
import { update } from '../../services/Rating';
import style from './styles';

const rating = ({ route }) => {
  const [profile, setProfile] = React.useState({});
  const [order, setOrder] = React.useState({});
  const [notification, setNotification] = React.useState({});
  const [isErro, SetIsErro] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [note, setNote] = React.useState(-1);
  const [stars, setStars] = React.useState([
    {
      enable: false,
      value: 0,
    },
    {
      enable: false,
      value: 1,
    },
    {
      enable: false,
      value: 2,
    },
    {
      enable: false,
      value: 3,
    },
    {
      enable: false,
      value: 4,
    },
  ]);

  const navigation = useNavigation();
  const { orderID, ratingID } = route.params;

  const submitRating = async () => {
    await update(ratingID, {
      avaliacao: Math.max(0, note),
      comentario: comment,
    })
      .then(() => {
        setNotification({
          notRead: true,
          title: 'Muito Obrigado!',
          body: 'Avaliação concluída com sucesso',
        });
      })
      .catch((erro) => {
        console.log(erro.response.data.message);
        SetIsErro(true);
        setNotification({
          notRead: true,
          title: 'Ops',
          body: 'Não foi possível enviar a avaliação, por favor, tente novamente.',
        });
      });
  };

  const modalCallback = () => {
    if (!isErro) {
      navigation.navigate('home');
      setNotification({ ...notification, notRead: false });
    } else {
      setNotification({ ...notification, notRead: false });
    }
  };

  const fecthOrder = async () => {
    await show(orderID).then(({ data }) => {
      setOrder(data[0]);
    });
  };

  React.useEffect(() => {
    const getProfile = async () => {
      const userProfile = JSON.parse(
        await AsyncStorage.getItem('@vitService:user'),
      );
      setProfile(userProfile);
    };

    getProfile();
  }, []);

  React.useEffect(() => {
    fecthOrder();
  }, []);

  return (
    <View style={style.conatainer}>
      <View style={style.titleConatainer}>
        <Text style={style.treatmentTXT}>Olá {order?.user?.nome}</Text>
        <Text style={style.treatmentSubTXT}>
          Sua avalição conta muito para cada serviço
        </Text>
      </View>
      <ScrollView contentContainerStyle={style.content} keyboardShouldPersistTaps="handled">
        <View style={style.storeInfo}>
          <Image
            source={{ uri: order?.store?.url_logo }}
            style={style.banner}
            resizeMode="stretch"
          />
          <View style={style.description}>
            <Text style={style.storeName} ellipsizeMode="tail">
              {order?.store?.nome}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={style.commentTXT}>Deixe seu comentário</Text>
          <TextInput
            placeholder="Comente algo sobre a sua experiência com a loja..."
            onChangeText={(text) => setComment(text)}
            style={style.comment}
            multiline
            numberOfLines={5}
          />
          <Text style={style.classificationTXT}>
            Classifique seu grau de satisfação em estrelas
          </Text>
          <View style={style.starts}>
            {stars.map((_, index) => {
              return (
                <FontAwesome
                  key={`star_${index}`}
                  name={index < note ? 'star' : 'star-o'}
                  size={32}
                  onPress={() => setNote(index + 1)}
                  color="#d6001b"
                  style={style.star}
                />
              );
            })}
          </View>
          <TouchableOpacity style={style.btnComment} onPress={submitRating}>
            <Text style={style.btnCommentTxt}>AVALIAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AwesomeAlert
        show={!!notification.notRead}
        showProgress={false}
        title={notification.title}
        message={notification.body}
        closeOnHardwareBackPress={false}
        showConfirmButton
        closeOnTouchOutside={false}
        confirmText="Fechar"
        contentContainerStyle={{
          width: '100%',
          height: '25%'
        }}
        confirmButtonStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '80%',
          height: 46,
          marginTop: 12
        }}
        confirmButtonTextStyle={{ fontWeight: 'bold' }}
        confirmButtonColor="#d6001b"
        onConfirmPressed={() => modalCallback()}
      />
    </View>
  );
};

export default rating;
