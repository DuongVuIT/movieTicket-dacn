import {NativeStackScreenProps} from '@react-navigation/native-stack';
import firebase from 'firebase/compat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {PERCENT} from '@type/theme';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute} from '@react-navigation/native';
const Welcome = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const uid = await AsyncStorage.getItem('uid');
        if (userToken) {
          setTimeout(() => {
            navigation.navigate(APP_SCREEN.MOVIE_HOME, {uid: uid});
          }, 10000);
        } else {
          setTimeout(() => {
            navigation.navigate(APP_SCREEN.LOGIN);
            setIsAnimationCompleted(true);
          }, 10000);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, [navigation]);

  useEffect(() => {
    if (isAnimationCompleted) {
      setTimeout(() => {}, 3000);
    }
  }, [isAnimationCompleted, hasToken, navigation]);

  return (
    <LinearGradient
      colors={[
        '#FF0000',
        '#FF7F00',
        '#FFFF00',
        '#00FF00',
        '#0000FF',
        '#4B0082',
        '#9400D3',
      ]}
      style={styles.container}>
      <View>
        <Animatable.View
          animation="slideInRight"
          duration={8000}
          delay={500}
          onAnimationEnd={() => setIsAnimationCompleted(true)}>
          <Image
            style={{height: PERCENT.percent_100, width: PERCENT.percent_100}}
            source={require('@assets/image/welcome.jpg')}
          />
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
