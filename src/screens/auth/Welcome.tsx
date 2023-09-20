import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {MainStackParamList} from '@types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
const Welcome = ({navigation}: NativeStackScreenProps<MainStackParamList>) => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  useEffect(() => {
    if (isAnimationCompleted) {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    }
  }, [isAnimationCompleted, navigation]);
  return (
    <View style={{flex: 1}}>
      <Animatable.View
        animation="slideInRight"
        duration={8000}
        delay={500}
        onAnimationEnd={() => setIsAnimationCompleted(true)}>
        <Image
          style={{height: '100%', width: '100%'}}
          source={require('@assets/image/welcome.jpg')}
        />
      </Animatable.View>
    </View>
  );
};

export default Welcome;
