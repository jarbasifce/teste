/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BadgeCar from '../components/BadgeCarIcon';
import Profile from '../screens/profile';
import Service from '../screens/service';
import Location from '../screens/location';
import Subcategories from '../screens/subcategories';
import Car from '../screens/car';
import Agenda from '../screens/agenda';
import Schedules from '../screens/schedules';

import Header from '../components/header';

const Stack = createStackNavigator();
const StackHome = ({ route }) => {
  const { categoryId } = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => (
          <Header
            hideBackArrow={false}
            key={Math.random().toString()}
            navigation={navigation}
          />
        ),
      }}
    >
      <Stack.Screen
        name="subcategory"
        component={Subcategories}
        initialParams={{ categoryId }}
      />
      <Stack.Screen name="service" component={Service} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="address" component={Location} />
      <Stack.Screen name="shedule" component={Schedules} />
    </Stack.Navigator>
  );
};

const StackCarNav = createStackNavigator();
const StackCar = () => {
  return (
    <StackCarNav.Navigator
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />,
      }}
    >
      <StackCarNav.Screen name="car" component={Car} />
    </StackCarNav.Navigator>
  );
};

const StackAgendaNav = createStackNavigator();
const StackAgenda = () => {
  return (
    <StackAgendaNav.Navigator
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />,
        headerShown: true,
      }}
    >
      <StackAgendaNav.Screen name="agenda" component={Agenda} />
    </StackAgendaNav.Navigator>
  );
};

const StackProfileNav = createStackNavigator();
const StackProfile = () => {
  return (
    <StackProfileNav.Navigator
      screenOptions={{
        header: ({ navigation }) => <Header navigation={navigation} />,
      }}
    >
      <StackProfileNav.Screen name="profile" component={Profile} />
    </StackProfileNav.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const navigations = ({ route }) => {
  const { categoryId } = route.params;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f00',
        tabStyle: {
          backgroundColor: '#2a414f',
        },
      }}
    >
      <Tab.Screen
        name="subcategori"
        component={StackHome}
        initialParams={{ categoryId }}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="pgLogin"
        component={StackCar}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: (props) => <BadgeCar {...props} />,
        }}
      />
      <Tab.Screen
        name="pgLogin1"
        component={StackAgenda}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={StackProfile}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default navigations;
