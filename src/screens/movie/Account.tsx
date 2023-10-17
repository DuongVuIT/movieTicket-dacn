import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {removeToken} from '@redux/actions/authActions';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
export default function Account({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('uid');
        if (value !== null) {
          console.log('Dữ liệu đã được lấy thành công:', value);
          return value;
        } else {
          console.log('Không có dữ liệu với khóa đã cho.');
          return null;
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };
    getData();
  }, []);
  const dispacth = useDispatch();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('ticketId');
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
