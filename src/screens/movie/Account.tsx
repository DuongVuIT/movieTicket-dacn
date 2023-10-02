import {removeToken} from '@actions/authActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_SCREEN} from '@type/navigation';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
export default function Account({navigation}: any) {
  const dispacth = useDispatch();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      console.log('Token removed successfully');
    } catch (error) {
      console.error('Error removing token:', error);
    }
    dispacth(removeToken());
    navigation.navigate(APP_SCREEN.LOGIN);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
