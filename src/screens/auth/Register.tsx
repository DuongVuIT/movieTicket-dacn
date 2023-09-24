import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@types';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getDatabase, ref, set} from 'firebase/database';
import React, {useEffect, useRef, useState} from 'react';
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
const Register = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState<any>();
  const [passwordError, setPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [emailError, setEmailError] = useState('');
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

  const RegisterHandler = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential?.user;
        setTimeout(() => {
          navigation.navigate('Login');
        }, 3000);
        if (user) {
          return user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              const db = getDatabase();
              const userRef = ref(db, 'users/' + user.uid);
              return set(userRef, {
                email: email,
                name: name,
                password: password,
              });
            })
            .then(() => {
              return user.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://movieticket-befc8.firebaseapp.com',
              });
            })
            .then(() => {
              alert('Verification email sent');
            });
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (!email || !password) {
          setRegisterError('Please enter complete information');
          setTimeout(() => {
            setRegisterError('');
          }, 2000);
          return;
        }
        let hasError = false;
        if (errorCode === 'auth/weak-password') {
          setPasswordError('Password too weak, try again');

          setTimeout(() => {
            setPasswordError('');
            hasError = true;
          }, 2000);
        } else if (errorCode === 'auth/email-already-in-use') {
          setEmailError('Email has been used, please select another email');
          setTimeout(() => {
            setEmailError('');
            hasError = true;
          }, 2000);
        } else if (!email.includes('@')) {
          setEmailError('The email must have the correct format');
          setTimeout(() => {
            setEmailError('');
            hasError = true;
          }, 2000);
        } else {
          setRegisterError('Failed register: ' + errorMessage);
          setTimeout(() => {
            setRegisterError('');
            hasError = true;
          }, 2000);
        }
      });
  };
  useEffect(() => {
    const intervalid = setInterval(autoScroll, 3000);
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

        <View style={{flex: 1, marginTop: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                marginTop: 30,
                marginLeft: 10,
              }}>
              Name
            </Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={'white'}
              style={styles.text_name}
              onChangeText={text => setName(text)}
              value={name}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', marginTop: 35, marginLeft: 10}}>
              Email
            </Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={'white'}
              style={styles.text_Email}
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <Text style={styles.erroMessage}>{emailError}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', marginTop: 30, marginLeft: 10}}>
              Password
            </Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={'white'}
              style={styles.text_password}
              onChangeText={text => setPassword(text)}
              value={password}
            />
          </View>
          <Text style={styles.erroMessage}>{passwordError}</Text>
          <Text style={styles.erroMessage}>{registerError}</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={RegisterHandler}
              style={styles.buttonRegister}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: height + 140,
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
  buttonRegister: {
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    width: 130,
    borderRadius: 10,
  },
  erroMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  text_Email: {
    color: 'white',
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    borderColor: 'white',
    marginLeft: 38,
    width: '75%',
  },
  text_password: {
    color: 'white',
    borderWidth: 2,
    marginTop: 15,
    padding: 10,
    borderRadius: 20,
    borderColor: 'white',
    marginLeft: 10,
    width: '75%',
  },
  text_name: {
    color: 'white',
    borderWidth: 2,
    marginTop: 13,
    padding: 10,
    borderRadius: 20,
    borderColor: 'white',
    marginLeft: 35,
    width: '75%',
  },
});
export default Register;
