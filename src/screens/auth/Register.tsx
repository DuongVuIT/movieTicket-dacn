import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  MARGIN,
  PERCENT,
  SPACING,
} from '@type/theme';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getDatabase, ref, set} from 'firebase/database';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
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
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<any>();
  const [passwordError, setPasswordError] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
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
      .then(async userCredential => {
        const user = userCredential?.user;
        setTimeout(() => {
          navigation.navigate(APP_SCREEN.LOGIN);
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
                displayName: name,
                password: password,
              });
            })
            .then(() => {
              return user.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://movieticket-ecfc5.firebaseapp.com',
              });
            })
            .then(() => {
              alert(`${t('Verification email sent')}`);
            });
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (!email || !password) {
          setRegisterError(`${t('Please enter complete information')}`);
          setTimeout(() => {
            setRegisterError('');
          }, 2000);
          return;
        }
        let hasError = false;
        if (errorCode === 'auth/weak-password') {
          setPasswordError(`${t('Password too weak, try again')}`);

          setTimeout(() => {
            setPasswordError('');
            hasError = true;
          }, 2000);
        } else if (errorCode === 'auth/email-already-in-use') {
          setEmailError(
            `${t('Email has been used, please select another email')}`,
          );
          setTimeout(() => {
            setEmailError('');
            hasError = true;
          }, 2000);
        } else if (!email.includes('@')) {
          setEmailError(`${t('The email must have the correct format')}`);
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

        <View style={{flex: 1, marginTop: MARGIN.margin_30}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.White,
                marginTop: MARGIN.margin_30,
                marginLeft: MARGIN.margin_10,
              }}>
              Name
            </Text>
            <TextInput
              placeholder={`${t('Enter your name')}`}
              placeholderTextColor={'white'}
              style={styles.text_name}
              onChangeText={text => setName(text)}
              value={name}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.White,
                marginTop: MARGIN.margin_36,
                marginLeft: MARGIN.margin_10,
              }}>
              Email
            </Text>
            <TextInput
              placeholder={`${t('Enter your email')}`}
              placeholderTextColor={'white'}
              style={styles.text_Email}
              onChangeText={text => setEmail(text)}
              value={email}
            />
          </View>
          <Text style={styles.erroMessage}>{emailError}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: COLORS.White,
                marginTop: MARGIN.margin_30,
                marginLeft: MARGIN.margin_10,
              }}>
              Password
            </Text>
            <TextInput
              placeholder={`${t('Enter your password')}`}
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
              <Text style={{color: COLORS.White, textAlign: 'center'}}>
                {`${t('Register')}`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.textLogin}>
                {`${t('Have account')}`}? {`${t('Login')}`}
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
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderBottomRightRadius: BORDERRADIUS.radius_20,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {
    borderWidth: 2,
    borderColor: COLORS.White,
    padding: SPACING.space_10,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  erroMessage: {
    color: COLORS.Red,
    fontSize: FONTSIZE.size_16,
    textAlign: 'center',
  },
  text_Email: {
    color: COLORS.White,
    borderWidth: 2,
    marginTop: MARGIN.margin_20,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    borderColor: COLORS.White,
    marginLeft: MARGIN.margin_38,
    width: PERCENT.percent_75,
  },
  text_password: {
    color: COLORS.White,
    borderWidth: 2,
    marginTop: MARGIN.margin_16,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    borderColor: COLORS.White,
    marginLeft: 10,
    width: PERCENT.percent_75,
  },
  text_name: {
    color: COLORS.White,
    borderWidth: 2,
    marginTop: MARGIN.margin_14,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
    borderColor: COLORS.White,
    marginLeft: MARGIN.margin_36,
    width: PERCENT.percent_75,
  },
  textLogin: {
    color: COLORS.White,
    textAlign: 'center',
    marginTop: MARGIN.margin_6,
  },
});
export default Register;
