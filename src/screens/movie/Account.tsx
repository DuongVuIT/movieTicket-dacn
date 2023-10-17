import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {removeToken} from '@redux/actions/authActions';
import {AuthTypes} from '@redux/reducers/authReducer';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
export default function Account({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const dispacth = useDispatch();
  const uid = useSelector((store: AuthTypes) => store?.uid);
  useEffect(() => {
    const getData = async () => {
      try {
        if (uid !== null) {
          console.log('Dữ liệu đã được lấy thành công:', uid);
          return uid;
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
  const handleLogout = async () => {
    try {
      dispacth(removeToken());

      console.log('Token removed successfully');
    } catch (error) {
      console.error('Error removing token:', error);
    }
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
