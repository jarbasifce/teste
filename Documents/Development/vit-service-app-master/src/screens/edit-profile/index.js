import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TextInputMask from 'react-native-text-input-mask';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

import moment from 'moment';

import { me, update } from '../../services/User';
import style from './styles';

const editProfile = () => {
  const [user, setUser] = React.useState({});
  const [isLoad, setIsLoad] = React.useState(false);
  const [image, setImage] = React.useState({});
  const [btnDisable, setBtnDisable] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [isSave, setIsSave] = React.useState(false);
  const [erro, setErro] = React.useState(false);

  const getUser = async () => {
    await me().then(({ data }) => {
      setUser(data);
    });
  };

  const openPicker = () => {
    setOpenModal(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperToolbarTitle: 'Cortar Imagem',
      compactarImageQuality: 0.8,
    }).then((result) => {
      setImage(result);
      setBtnDisable(false);
    });
  };

  const openCamera = () => {
    setOpenModal(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperToolbarTitle: 'Cortar Imagem',
      compactarImageQuality: 0.8,
    }).then((result) => {
      setImage(result);
      setBtnDisable(false);
    });
  };

  const submitUser = async () => {
    setIsLoad(true);
    const form = new FormData();
    form.append('nome', user.nome);
    form.append('sobrenome', user.sobrenome);
    form.append('telefone', user.telefone);
    if (Object.keys(image).length !== 0) {
      const path = image.path.split('/');
      form.append('avatar', {
        uri: image.path,
        name: path[path.length - 1],
        type: image.mime,
      });
    }

    await update(user.id, form)
      .then(async ({ data }) => {
        const userProfile = JSON.parse(
          await AsyncStorage.getItem('@vitService:user'),
        );
        userProfile.title = `${data.nome} ${data.sobrenome}`;
        userProfile.img = data.url_avatar + `?t=${new Date().getTime()}` || '';
        await AsyncStorage.setItem(
          '@vitService:user',
          JSON.stringify(userProfile),
        );
        setIsSave(true);
        setIsLoad(false);
      })
      .catch((erro) => {
        setErro(true);
        setIsLoad(false);
      });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <KeyboardAvoidingView style={style.container}>
        <View style={style.titleConatainer}>
          <Text style={style.title}>Editar Perfil</Text>
        </View>
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <View style={style.avatarContainer}>
            <Image
              source={{ uri: image?.path || user.url_avatar }}
              style={style.headingLogo}
            />
            <TouchableOpacity
              onPress={() => setOpenModal(true)}
              style={style.headingProfileButton}
            >
              <Text style={style.headingProfileButtonText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>
          <View style={style.form}>
            <Text style={style.titleForm}>Dados Pessoais</Text>
            <TextInput
              placeholder="Nome"
              onChangeText={(text) => {
                setBtnDisable(false);
                setUser({
                  ...user,
                  nome: text,
                });
              }}
              value={user.nome}
              placeholderTextColor="#999999"
              style={style.input}
            />
            <TextInput
              placeholder="Sobrenome"
              onChangeText={(text) => {
                setBtnDisable(false);
                setUser({
                  ...user,
                  sobrenome: text,
                });
              }}
              value={user.sobrenome}
              placeholderTextColor="#999999"
              style={style.input}
            />
            <TextInputMask
              keyboardType="number-pad"
              placeholder="Telefone"
              onChangeText={(text) => {
                setBtnDisable(false);
                setUser({
                  ...user,
                  telefone: text,
                });
              }}
              value={user.telefone}
              mask="([00]) [00000]-[0000]"
              placeholderTextColor="#999999"
              style={style.input}
            />
            <TextInput
              editable={false}
              value={user.email}
              style={style.input}
            />

            <TextInputMask
              editable={false}
              onChangeText={(formatText, text) => {
                setUser({
                  ...user,
                  cpf: text,
                });
              }}
              value={user.cpf}
              mask="[000].[000].[000]-[00]"
              style={style.input}
            />
            <TextInput
              editable={false}
              value={moment(user.dataNascimento).format('DD/MM/YYYY')}
              style={style.input}
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry
              value={user.senha}
              onChangeText={(text) => {
                setBtnDisable(false);
                setUser({
                  ...user,
                  senha: text,
                });
              }}
              placeholderTextColor="#000"
              style={style.input}
            />
            <TextInput
              placeholder="Confime a senha"
              secureTextEntry
              value={user.senha_confirmation}
              onChangeText={(text) => {
                setUser({
                  ...user,
                  senha_confirmation: text,
                });
              }}
              placeholderTextColor="#000"
              style={style.input}
            />
            <TouchableOpacity
              disabled={btnDisable}
              onPress={() => submitUser()}
              style={[style.btnSubmit, btnDisable ? style.btnDisable : {}]}
            >
              {isLoad ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                  <Text style={style.btnSubmitTxt}>Salvar</Text>
                )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        transparent
        animationType="fade"
        visible={openModal}
        style={style.modalContainer}
      >
        <View style={style.modalScreen}>
          <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
            <View style={style.modalOverflow} />
          </TouchableWithoutFeedback>
          <View style={style.modalContentUp}>
            <TouchableOpacity
              style={style.optionModal}
              onPress={() => openCamera()}
            >
              <Feather name="camera" size={30} color="#d6001b" />
              <Text style={style.optionModalTXT}>Câmera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.optionModal}
              onPress={() => openPicker()}
            >
              <FontAwesome name="picture-o" size={30} color="#d6001b" />
              <Text style={style.optionModalTXT}>Galeria</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <AwesomeAlert
        show={isSave}
        showProgress={false}
        title="Obrigado!"
        message="Dados salvos com sucesso"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress
        showConfirmButton
        confirmText="Fechar"
        confirmButtonStyle={{ width: 100 }}
        confirmButtonTextStyle={{ textAlign: 'center' }}
        confirmButtonColor="#d6001b"
        onConfirmPressed={() => setIsSave(false)}
      />
      <AwesomeAlert
        show={erro}
        showProgress={false}
        title="Operação Falhou!"
        message="Não foi possível salvar as informações"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress
        showConfirmButton
        confirmText="Fechar"
        confirmButtonStyle={{ width: 100 }}
        confirmButtonTextStyle={{ textAlign: 'center' }}
        confirmButtonColor="#d6001b"
        onConfirmPressed={() => setErro(false)}
      />
    </>
  );
};

export default editProfile;
