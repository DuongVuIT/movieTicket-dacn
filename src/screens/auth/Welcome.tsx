import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {PERCENT} from '@type/theme';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
const Welcome = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const [isAnimationCompleted, setIsAnimationCompleted] =
    useState<boolean>(false);
  const uid = useSelector((store: any) => store?.uid);
  console.log('1', uid);
  const userToken = useSelector((store: any) => store?.token);
  console.log('2', userToken);
  useEffect(() => {
    const checkToken = async () => {
      try {
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
  }, [isAnimationCompleted, navigation]);

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
