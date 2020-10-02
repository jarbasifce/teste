import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login';
import Signup from '../screens/signup';
import Forgot from '../screens/forgot';

const Stack = createStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signup" component={Signup} />
    <Stack.Screen name="forgot" component={Forgot} />
  </Stack.Navigator>
);

export default AuthNavigation;
