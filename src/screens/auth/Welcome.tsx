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
import LinearGradient from 'react-native-linear-gradient';
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
    <LinearGradient
      colors={[
        '#FF0000', // Đỏ
        '#FF7F00', // Cam
        '#FFFF00', // Vàng
        '#00FF00', // Xanh lá cây
        '#0000FF', // Xanh dương
        '#4B0082', // Xanh dương da trời
        '#9400D3', // Tím
      ]}
      style={styles.container}>
      <View>
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
    </LinearGradient>
  );
};

export default Welcome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
