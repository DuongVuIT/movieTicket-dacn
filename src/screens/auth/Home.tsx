import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
export default function Home() {
  const [name, setName] = useState<any>();
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setName(user.displayName);
    }
  }, []);
  return (
    <View>
      <Text>Home:{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
