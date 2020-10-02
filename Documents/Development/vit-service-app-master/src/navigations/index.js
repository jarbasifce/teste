/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { AuthContext } from '../context';
import { loginReducer } from '../reducer/loginReducer';
import AuthActions from '../actions/AuthAction';
import { navigationRef } from "./root-navigation";

import CarContext from '../context/CarShopContext';
import AppNavigation from './app-navigation';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Subcategories from '../screens/subcategories';
import Splash from '../screens/splash';

import AuthNavigation from './auth-navigation';
import Header from '../components/header';
import Location from '../screens/location';
import LocationRegister from '../screens/location-register';
import Historic from '../screens/historic';
import Checkout from '../screens/checkout';
import Agenda from '../screens/agenda';
import OrderDetails from '../screens/order-details';
import Car from '../screens/car';
import Schedule from '../screens/schedules';
import Details from '../screens/details';
import EditProfile from '../screens/edit-profile';
import Rating from '../screens/rating';
import Pather from '../screens/partner';
import Help from '../screens/help';
import Terms from '../screens/terms';
import Service from '../screens/service';
import EventSystem from '../util/eventsystem';

const Stack = createStackNavigator();
export default function Navigation() {
  const initialLoginState = {
    isLoading: true,
    user: null,
    token: null,
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(() => AuthActions(dispatch), []);

  const linking = {
    prefixes: ['https://vitservice.com.br/', 'vitservice://'],
    config: {
      home: 'home',
      Rating: {
        path: 'rating/:orderID/:ratingID',
        parse: {
          orderID: Number,
          ratingID: Number,
        }
      },
      OrdemDetails: {
        path: 'order/detail/:orderID',
        parse: {
          orderID: Number,
        }
      }
    },
  };
  React.useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('@vitService:token').then(token => {
        dispatch({ type: 'RETRIEVE_TOKEN', token })
      }).catch(error => {
        console.log(error);
      })
    }, 1000)
    EventSystem.subscribe('refresh.token.error', () => {
      dispatch({ type: 'LOGOUT' })
    });
    return () => {
      EventSystem.unsubscribe('refresh.token.error');
    }
  }, []);

  if (loginState.isLoading) {
    return (
      <Splash />
    );
  }
  const AuthRouter = () => <AuthNavigation />;

  return (

    <AuthContext.Provider value={authContext}>
      <CarContext>
        <NavigationContainer ref={navigationRef} linking={linking}>
          {loginState.token !== null ? (
            <Stack.Navigator screenOptions={{ header: () => null }}>
              <Stack.Screen name="home" component={Home} options={{ header: () => null }} />
              <Stack.Screen name="checkout" component={Checkout} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="appnavigate" component={AppNavigation} options={{ headerShown: false }} />
              <Stack.Screen name="profile" component={Profile} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="address" component={Location} options={{ header: ({ navigation }) => <Header title="Endereços" navigation={navigation} /> }} />
              <Stack.Screen name="address-register" component={LocationRegister} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="historic" component={Historic} options={{ header: ({ navigation }) => <Header title="Meus pedidos" navigation={navigation} /> }} />
              <Stack.Screen name="agenda" component={Agenda} options={{ header: ({ navigation }) => <Header title="Agenda" navigation={navigation} /> }} />
              <Stack.Screen name="OrdemDetails" component={OrderDetails} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="carshop" component={Car} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="shedule" component={Schedule} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="details" component={Details} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="editProfile" component={EditProfile} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="Rating" component={Rating} options={{ header: ({ navigation }) => <Header navigation={navigation} /> }} />
              <Stack.Screen name="Pather" component={Pather} options={{ header: ({ navigation }) => <Header title="Seja um parceiro" navigation={navigation} /> }} />
              <Stack.Screen name="help" component={Help} options={{ header: ({ navigation }) => <Header title="Ajuda" navigation={navigation} /> }} />
              <Stack.Screen name="terms" component={Terms} options={{ header: ({ navigation }) => <Header title="Política de privacidade" navigation={navigation} /> }} />
            </Stack.Navigator>
          ) : (
              <AuthRouter />
            )}
        </NavigationContainer>
      </CarContext>
    </AuthContext.Provider>
  );
}
