import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import Account from '@screens/movie/Account';
import Home from '@screens/movie/Home';
import Search from '@screens/movie/Search';
import Ticket from '@screens/movie/Ticket';
import {RootParamList} from '@types';
import LottieView from 'lottie-react-native';
const MainBottomTab = () => {
  const Tab = createBottomTabNavigator<RootParamList>();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
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
            <LottieView
              style={{height: '100%', width: '100%'}}
              source={filePath}
              autoPlay={focused}
            />
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
