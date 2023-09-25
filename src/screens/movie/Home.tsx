import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@types/navigation';
export default function Home({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const [name, setName] = useState<any>();
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setName(user.displayName);
    }
  }, []);
  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('User signed out');
      });
    navigation.navigate('Login');
  };
  return (
    <View>
      <Text>Home:{name}</Text>
      <TouchableOpacity
        onPress={() => Logout()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
