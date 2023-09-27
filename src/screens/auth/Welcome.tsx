import {NativeStackScreenProps} from '@react-navigation/native-stack';

import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {RootParamList} from '@type/navigation';
import {PERCENT} from '@type/theme';
const Welcome = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  useEffect(() => {
    if (isAnimationCompleted) {
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
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
