require('react-native').unstable_enableLogBox();
/* eslint-disable import/first */
import React, { useRef } from 'react';
import { Linking, StatusBar, View, Text, Image, TouchableOpacity, Vibration } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import FA from 'react-native-vector-icons/FontAwesome';
import OI from 'react-native-vector-icons/Octicons';
import II from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';
import GlobalStatusBar from './src/components/GlobalStatusBar';
import Navigate from './src/navigations';
import codePush from 'react-native-code-push';

import Icon from 'react-native-vector-icons/FontAwesome';

import refreshFCM from './src/util/fcmToken';
import NotificationPopupContainer from 'react-native-push-notification-popup';
import NotificationPopup from './src/components/NotificationPopup';

/* Configura os dados do code push para atualizações OTA */
const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

const PATTERN = [
  0,
  90,
  100,
  90
];

codePush.sync({
  updateDialog: false,
  // updateDialog: {
  //   title: "Uma atualização está disponível",
  //   mandatoryUpdateMessage: "Uma atualização está disponível e deve ser aplicada.",
  //   mandatoryContinueButtonLabel: "Aplicar"
  // },
  installMode: codePush.InstallMode.IMMEDIATE
});

/* Carrega fontes (IOS) */
FA.loadFont();
OI.loadFont();
MI.loadFont();
II.loadFont();

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  const popup = useRef();

  const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 8,
      borderColor: '#dbdbdb',
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 18,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingVertical: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 8,
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={appIconSource} style={{ width: 18, height: 18 }} />
          <Text style={{ marginLeft: 8, color: '#888' }}>{appTitle}</Text>
        </View>
        <Text style={{ color: '#888' }}>{timeText}</Text>
      </View>
      <View style={{
        paddingHorizontal: 8,
        paddingVertical: 8,
      }}>
        <Text style={{ fontWeight: 'bold', color: '#333' }}>{title}</Text>
        <Text>{body.message}</Text>
        <Text style={{ color: '#444', marginTop: 4, textAlign: 'left', fontSize: 9 }}>Clique para ver mais</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingVertical: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 8,
        justifyContent: 'space-evenly'
      }}>
        <Icon name="chevron-up" size={8} color="#aaa" />
        <Text style={{ fontSize: 10, marginVertical: 2, color: '#aaa', textAlign: 'center' }}>deslize para fechar</Text>
        <Icon name="chevron-up" size={8} color="#aaa" />
      </View>
    </View>
  );

  const redirectTo = async (data) => {
    if (data) {
      switch (data.path) {
        case 'rating':
          await Linking.openURL(
            `vitservice://${data.path}/${data.order_id}/${data.rating}`,
          ).catch((e) => {
            console.log(e);
          });
          break;
        case 'order/detail':
          await Linking.openURL(
            `vitservice://${data.path}/${data.order_id}`,
          ).catch((e) => {
            console.log(e);
          });
          break;
        default:
          break;
      }
    }
  };

  const configStatusBar = () => {
    setTimeout(() => {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('#d6001b');
      StatusBar.setBarStyle('light-content');
    }, 50);
  }

  React.useEffect(() => {
    refreshFCM();
    configStatusBar();

    messaging().onMessage((message) => {
      //console.log(`Mensagem recebida!: ${JSON.stringify(message, null, ' ')}`);
      const { title, body } = message.notification;
      //setNotification({ notRead: true, , , path: message.data });
      popup.current.show({
        onPress: () => { if (message.data) redirectTo(message.data) },
        appIconSource: require('./src/assets/images/logo.png'),
        appTitle: 'Vit Service',
        timeText: 'agora',
        title: title,
        body: {
          message: body,
        },
        slideOutTime: 10000
      });
      Vibration.vibrate(PATTERN);
    });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      redirectTo(remoteMessage.data);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <GlobalStatusBar barStyle="light-content" />
      <Navigate />
      <NotificationPopupContainer
        ref={popup}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </>
  );
};

export default codePush(codePushOptions)(App);
