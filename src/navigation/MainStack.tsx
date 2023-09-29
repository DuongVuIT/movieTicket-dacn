import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@screens/movie/Home';
import Login from '@screens/auth/Login';
import Register from '@screens/auth/Register';
import Welcome from '@screens/auth/Welcome';
import MainBottomTab from './MainBottomTab';
import React from 'react';
import {StyleSheet} from 'react-native';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import MovieDetails from '@screens/movie/MovieDetails';

const RootStack = createNativeStackNavigator<RootParamList>();
const MainStack = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{header: () => null}}>
        <RootStack.Screen
          name={APP_SCREEN.WELCOME}
          component={Welcome}
          options={{headerShown: false}}
        />
        <RootStack.Screen name={APP_SCREEN.HOME} component={Home} />
        <RootStack.Screen
          name={APP_SCREEN.LOGIN}
          component={Login}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={APP_SCREEN.REGISTER}
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name={APP_SCREEN.MOVIE_HOME}
          component={MainBottomTab}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name={APP_SCREEN.MOVIE_DETAIL}
          component={MovieDetails}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
