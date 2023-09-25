import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@types/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  MARGIN,
  PERCENT,
  SPACING,
} from '@types/theme';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
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
const Login = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState<any>();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
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
  const ForgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch(error => {
        Alert.alert('Message', `Failed to connect to server`, error);
      });
  };
  const LoginHandler = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;

      if (user) {
        setName(user.displayName);
        navigation.navigate('MovieHome');
      }
    } catch (error) {
      const errorCode = (error as firebase.auth.Error).code;
      const errorMessage = (error as firebase.auth.Error).message;

      if (!email || !password) {
        setLoginStatus('Please enter your email and password');
        setTimeout(() => {
          setLoginStatus('');
        }, 3000);
      } else {
        let errorText = '';

        if (
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/user-not-found'
        ) {
          errorText = 'Email is not valid or not found';
        } else if (errorCode === 'auth/wrong-password') {
          errorText = 'Incorrect password';
        } else {
          errorText = 'Login failed: ' + errorMessage;
        }

        if (errorText) {
          setLoginStatus(errorText);
          setTimeout(() => {
            setLoginStatus('');
          }, 3000);
        }
      }
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

        <View style={{flex: 1, marginTop: MARGIN.margin_30}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text_input}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={'white'}
              style={styles.textInput_email}
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <Text style={{color: COLORS.Red, fontSize: FONTSIZE.size_16}}>
            {emailError}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text_input}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={'white'}
              style={styles.textInput_password}
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>
          <Text style={{color: COLORS.Red, fontSize: FONTSIZE.size_20}}>
            {passwordError}
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.Red,
                fontSize: FONTSIZE.size_16,
                marginTop: MARGIN.margin_16,
              }}>
              {loginStatus}
            </Text>
            <TouchableOpacity
              onPress={() => LoginHandler()}
              style={styles.button_login}>
              <Text style={{color: COLORS.White, textAlign: 'center'}}>
                Login
              </Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              <Text style={{color: COLORS.White, marginTop: MARGIN.margin_10}}>
                Don't have account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text
                  style={{
                    color: 'white',
                    marginTop: MARGIN.margin_10,
                    marginLeft: MARGIN.margin_10,
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={ForgotPassword}>
              <Text
                style={{
                  color: 'white',
                  marginTop: MARGIN.margin_10,
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
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
    height: height + 120,
  },
  view_img: {
    width,
    height: 650,
    justifyContent: 'flex-start',
  },
  image: {
    height: 650,
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderBottomRightRadius: BORDERRADIUS.radius_20,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_input: {
    color: COLORS.White,
    marginTop: MARGIN.margin_30,
    marginLeft: MARGIN.margin_10,
  },
  button_login: {
    borderWidth: 2,
    borderColor: COLORS.White,
    padding: SPACING.space_10,
    width: 130,
    borderRadius: BORDERRADIUS.radius_10,
  },
  textInput_password: {
    color: COLORS.White,
    borderWidth: 2,
    marginTop: 15,
    padding: SPACING.space_10,
    borderRadius: 20,
    borderColor: COLORS.White,
    marginLeft: MARGIN.margin_10,
    width: PERCENT.percent_75,
  },
  textInput_email: {
    color: COLORS.White,
    borderWidth: 2,
    marginTop: MARGIN.margin_14,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    borderColor: COLORS.White,
    marginLeft: MARGIN.margin_36,
    width: PERCENT.percent_75,
  },
});
