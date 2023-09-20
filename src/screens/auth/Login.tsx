import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '@types';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
const images: string[] = [
  'https://www.themoviedb.org/t/p/w1280/cswPVyXwQ13dFHU1KFS8dpFxIyY.jpg',
  'https://www.themoviedb.org/t/p/w1280/kdAOhC8IIS5jqzruRk7To3AEsHH.jpg',
  'https://www.themoviedb.org/t/p/w1280/wrEKXTKoUuJuLmg52wT9ZybGXEC.jpg',
  'https://www.themoviedb.org/t/p/w1280/bX547n5W9ZIKCeAE44Vf2nfw4w.jpg',
];
const {width, height} = Dimensions.get('screen');
const Login = ({navigation}: NativeStackScreenProps<MainStackParamList>) => {
  const flatlistRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const xScroll = useRef(new Animated.Value(0)).current;
  const autoScroll = () => {
    if (flatlistRef.current) {
      currentIndex.current = (currentIndex.current + 1) % images.length;
      flatlistRef.current.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }
  };
  useEffect(() => {
    const intervalid = setInterval(autoScroll, 5000);
    return () => clearInterval(intervalid);
  }, []);
  return (
    <KeyboardAwareScrollView style={{flex: 1}}>
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
          <Animated.FlatList
            ref={flatlistRef}
            data={images}
            horizontal
            showsHorizontalScrollIndicator={true}
            snapToInterval={width}
            decelerationRate={'fast'}
            keyExtractor={(_, index) => index.toString()}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: xScroll}}}],
              {useNativeDriver: true},
            )}
            renderItem={({item, index}) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              return (
                <View style={styles.view_img}>
                  <Animated.Image style={[styles.image]} source={{uri: item}} />
                </View>
              );
            }}
          />
        </View>

        <View style={{flex: 1, marginTop: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', marginTop: 30, marginLeft: 10}}>
              Email
            </Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={'white'}
              style={{
                color: 'white',
                borderWidth: 2,
                marginTop: 10,
                padding: 10,
                borderRadius: 20,
                borderColor: 'white',
                marginLeft: 35,
                width: '75%',
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', marginTop: 30, marginLeft: 10}}>
              Password
            </Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={'white'}
              style={{
                color: 'white',
                borderWidth: 2,
                marginTop: 10,
                padding: 10,
                borderRadius: 20,
                borderColor: 'white',
                marginLeft: 10,
                width: '75%',
              }}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'white',
                padding: 10,
                width: 130,
                marginTop: 20,
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'white', marginTop: 10}}>
                Don't have account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: 10,
                    marginLeft: 10,
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: height + 120,
  },
  view_img: {
    width,
    height: 650,
    justifyContent: 'flex-start',
  },
  image: {
    height: 650,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
