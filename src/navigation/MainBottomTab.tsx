import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Account from '@screens/movie/Account';
import Home from '@screens/movie/Home';
import Search from '@screens/movie/Search';
import Ticket from '@screens/movie/Ticket';

import {RootParamList} from '@type/navigation';
import {COLORS, FONTSIZE, PERCENT} from '@type/theme';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';

const MainBottomTab = () => {
  const Tab = createBottomTabNavigator<RootParamList>();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          height: 100,
          borderBlockColor: COLORS.Black,
        },
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: FONTSIZE.size_16,
          color: COLORS.White,
        },

        tabBarIcon: ({focused}) => {
          let filePath;
          let iconName;

          switch (route.name) {
            case 'Home':
              filePath = require('@assets/lotties/home.json');

              break;
            case 'Search':
              filePath = require('@assets/lotties/search.json');

              break;
            case 'Ticket':
              filePath = require('@assets/lotties/ticket.json');
              break;
            case 'Account':
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Ticket" component={Ticket} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default MainBottomTab;
