import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { setToken } from '../services/User';
import messaging from '@react-native-firebase/messaging';

export default refreshFCM = (force = false) => {
  AsyncStorage.getItem('@vitservice:fcm_data', (err, res) => {
    messaging()
      .getToken()
      .then(async (token) => {
        let shouldUpdate = false;
        let tryAttemps = 3;
        let resData = null;
        if (res) {
          resData = JSON.parse(res);
        }
        if (err || !resData || force) {
          shouldUpdate = true;
        } else if (resData.token != token) {
          shouldUpdate = true;
        } else if (moment().isAfter(resData.expiresIn)) {
          shouldUpdate = true;
        }
        if (!shouldUpdate) {
          console.log('[FCM] O token fcm já é o mais recente')
        }
        while (shouldUpdate && tryAttemps > 0) {
          await setToken(token)
            .then(() => {
              AsyncStorage.setItem('@vitservice:fcm_data', JSON.stringify({
                token,
                expiresIn: moment().add(1, 'd')
              }));
              console.log(`[FCM/${3 - tryAttemps}] Token FCM enviado\n`);
              shouldUpdate = false;
            })
            .catch(() => {
              tryAttemps--;
              console.log(`[FCM/${3 - tryAttemps}] Não foi possível enviar o fcm`);
            });
        }
      });
  });
}