import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Account from '@screens/movie/Account';
import Search from '@screens/movie/Search';
import Ticket from '@screens/movie/Ticket';

import Movie from '@screens/movie/Movie';
import {APP_SCREEN} from '@type/navigation';
import {COLORS, FONTSIZE, PERCENT} from '@type/theme';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

const MainBottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          height: 110,
          borderBlockColor: COLORS.Black,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: FONTSIZE.size_16,
          color: COLORS.White,
        },

        tabBarIcon: ({focused}) => {
          let filePath;
          let iconName;

          switch (route.name) {
            case APP_SCREEN.MOVIE:
              filePath = require('@assets/lotties/home.json');

              break;
            case APP_SCREEN.SEARCH:
              filePath = require('@assets/lotties/search.json');

              break;
            case APP_SCREEN.TICKET:
              filePath = require('@assets/lotties/ticket.json');
              break;
            case APP_SCREEN.ACCOUNT:
              filePath = require('@assets/lotties/profile.json');
              break;
            default:
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
          }
          return (
            <View
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: focused ? 35 : 0,
                backgroundColor: focused ? COLORS.White : COLORS.Black,
              }}>
              <LottieView
                style={{
                  height: PERCENT.percent_100,
                  width: PERCENT.percent_100,
                }}
                source={filePath}
                autoPlay={focused}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name={APP_SCREEN.MOVIE} component={Movie} />
      <Tab.Screen name={APP_SCREEN.SEARCH} component={Search} />
      <Tab.Screen name={APP_SCREEN.TICKET} component={Ticket} />
      <Tab.Screen name={APP_SCREEN.ACCOUNT} component={Account} />
    </Tab.Navigator>
  );
};

export default MainBottomTab;
