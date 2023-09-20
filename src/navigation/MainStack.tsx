import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@screens/auth/Home';
import Login from '@screens/auth/Login';
import Register from '@screens/auth/Register';
import Welcome from '@screens/auth/Welcome';
import {MainStackParamList} from '@types';
import React from 'react';
import {StyleSheet} from 'react-native';
const RootStack = createNativeStackNavigator<MainStackParamList>();
const MainStack = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Welcome">
        <RootStack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="Register" component={Register} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
