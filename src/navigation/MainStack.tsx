import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@screens/movie/Home';
import Login from '@screens/auth/Login';
import Register from '@screens/auth/Register';
import Welcome from '@screens/auth/Welcome';
import {RootParamList} from '@types';
import MainBottomTab from './MainBottomTab';
import React from 'react';
import {StyleSheet} from 'react-native';
const RootStack = createNativeStackNavigator<RootParamList>();
const MainStack = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{header: () => null}}>
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
        <RootStack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="MovieHome"
          component={MainBottomTab}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
