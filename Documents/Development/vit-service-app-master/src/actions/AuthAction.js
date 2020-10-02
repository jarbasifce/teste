import AsyncStorage from '@react-native-community/async-storage';
import { login } from '../services/Auth';
import refreshFCM from '../util/fcmToken';

export default (dispatch) => ({
  singIn: (data) =>
    new Promise((accept, reject) => {
      login(data)
        .then(async (res) => {
          try {
            const { token } = res.data;
            await AsyncStorage.setItem('@vitService:token', token);
            await AsyncStorage.setItem(
              '@vitService:refresh_token',
              res.data.refreshToken,
            );
            const user = {
              id: res.data.user.id,
              title: `${res.data.user.nome} ${res.data.user.sobrenome}`,
              img: res.data.user.url_avatar || '',
            };
            await AsyncStorage.setItem(
              '@vitService:user',
              JSON.stringify(user),
            );
            refreshFCM(true);
            dispatch({ type: 'LOGIN', user, token });
          } catch (error) {
            reject(error);
            console.log(error);
          }
          accept();
        })
        .catch((erro) => {
          console.log('=>', erro);
          reject(erro);
        });
    }),
  logOut: async () => {
    await AsyncStorage.removeItem('@vitService:token');
    await AsyncStorage.removeItem('@vitService:refresh_token');
    await AsyncStorage.removeItem('@vitService:user');
    await AsyncStorage.removeItem('@vitService:fcm_data');
    dispatch({ type: 'LOGOUT' });
  },
});
