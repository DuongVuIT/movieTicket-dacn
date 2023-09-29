import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@type/navigation';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function MovieDetails({navigation, route}: any) {
  const {movieId} = route.params;
  console.log(movieId);
  return (
    <View>
      <Text>MovieDetails</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
