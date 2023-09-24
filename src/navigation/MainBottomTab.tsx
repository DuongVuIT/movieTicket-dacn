import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Account from '@screens/movie/Account';
import Home from '@screens/movie/Home';
import Search from '@screens/movie/Search';
import Ticket from '@screens/movie/Ticket';
import {RootParamList} from '@types';

const MainBottomTab = () => {
  const Tab = createBottomTabNavigator<RootParamList>();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Ticket" component={Ticket} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default MainBottomTab;
