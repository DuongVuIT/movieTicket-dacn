import CustomIcon from '@components/CustomIcon';
import ThemeContext from '@context/ThemeContext';
import '@i18n/config/i18.config';
import LanguagePicker from '@i18n/utils/LanguagePicker';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {removeToken} from '@redux/actions/authActions';
import {AuthTypes} from '@redux/reducers/authReducer';
import {APP_SCREEN, RootParamList} from '@type/navigation';

import {
  BORDERRADIUS,
  FONTSIZE,
  FONTTFAMILY,
  MARGIN,
  SPACING,
} from '@type/theme';
import firebase from 'firebase/compat';
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
const {width} = Dimensions.get('window');
export default function Account({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const dispacth = useDispatch();
  const userId = useSelector((store: AuthTypes) => store?.uid);
  const [dataUser, setDataUser] = useState<any>();
  const [modalPassword, setModalPassword] = useState<boolean>(false);
  const [modalProfile, setModalProfile] = useState<boolean>(false);
  const [newName, setNewName] = useState<any>();
  const [image, setImage] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [imageURLs, setImageURLs] = useState<any>([]);
  const [newPassword, setNewPassword] = useState<any>();
  const isFocused = useIsFocused();
  useEffect(() => {
    getDataUser();
  }, [isFocused]);
  const {t} = useTranslation();
  const getDataUser = async () => {
    if (userId) {
      try {
        await firebase
          .database()
          .ref(`users/${userId}`)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setDataUser(data);
              console.log('data:', data);
            } else {
              console.log('No data.');
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCloseModal = () => {
    setModalPassword(!modalPassword);
  };
  const handleCloseProfile = () => {
    setModalProfile(!modalProfile);
  };
  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  };

  const handlerChangePassword = async () => {
    if (newPassword) {
      try {
        if (userId) {
          const newPass = await firebase
            .auth()
            .currentUser?.updatePassword(newPassword);
          await firebase
            .database()
            .ref(`users/${userId}`)
            .child('password')
            .set(newPassword);

          setNewPassword(newPass);

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `${t(`Change Password Successfully`)}`,
            visibilityTime: 4000,
            topOffset: 50,
            autoHide: true,
          });

          setModalPassword(!modalPassword);
        } else {
          console.log('User is not logged in.');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your new password',
        visibilityTime: 4000,
        topOffset: 50,
        autoHide: true,
      });
    }
  };
  const handlerChangeProfile = async () => {
    if (newName) {
      try {
        if (userId) {
          const userName = await firebase
            .auth()
            .currentUser?.updateProfile(newName);
          await firebase
            .database()
            .ref(`users/${userId}`)
            .child('displayName')
            .set(newName);
          setNewName(userName);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `${t(`Change Profile Successfully`)}`,
            visibilityTime: 4000,
            topOffset: 50,
            autoHide: true,
          });

          setModalProfile(!modalProfile);
        } else {
          console.log('User is not logged in.');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your name',
        visibilityTime: 4000,
        topOffset: 50,
        autoHide: true,
      });
    }
  };
  const handleLogout = async () => {
    try {
      dispacth(removeToken());

      console.log('Token removed successfully');
    } catch (error) {
      console.error('Error removing token:', error);
    }
    navigation.navigate(APP_SCREEN.LOGIN);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    headerContainer: {
      flex: 1,
    },
    text: {
      color: theme === 'dark' ? 'white' : 'black',
      fontSize: FONTSIZE.size_24,
      fontFamily: FONTTFAMILY.poppins_regular,
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: MARGIN.margin_40 * 2,
    },
    imagesStyles: {
      marginTop: MARGIN.margin_10,
      alignSelf: 'center',
      height: 90,
      borderRadius: 60,
      width: 90,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameUser: {
      marginTop: MARGIN.margin_14,
      fontSize: FONTSIZE.size_16,
      color: theme === 'dark' ? 'white' : 'black',
      textAlign: 'center',
      marginBottom: MARGIN.margin_20,
    },
    iconStyle: {
      color: theme === 'dark' ? 'white' : 'black',
      marginLeft: MARGIN.margin_20,
    },
    textSubtitle: {
      fontFamily: FONTTFAMILY.poppins_regular,
      color: theme === 'dark' ? 'white' : 'black',
      marginTop: MARGIN.margin_6,
      fontSize: FONTSIZE.size_16,
      marginLeft: MARGIN.margin_30 * 3,
    },
    mainTitle: {
      color: theme === 'dark' ? 'white' : 'black',
      fontSize: FONTSIZE.size_20,
      marginLeft: MARGIN.margin_10,
      fontFamily: FONTTFAMILY.poppins_regular,
    },
    subContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginLeft: 30,
    },
    logoutTitle: {
      fontSize: FONTSIZE.size_20,
      color: theme === 'dark' ? 'white' : 'black',
      fontFamily: FONTTFAMILY.poppins_regular,
    },
    title: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: 26,
      color: theme === 'dark' ? 'white' : 'black',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      borderRadius: BORDERRADIUS.radius_20,
      padding: SPACING.space_36,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      paddingHorizontal: 50,
    },
    buttonSave: {
      backgroundColor: theme === 'dark' ? 'white' : 'black',
    },
    buttonClose: {
      backgroundColor: theme === 'dark' ? 'white' : 'black',
    },
    textInput: {
      marginTop: 10,
      padding: 10,
      borderRadius: 25,
      color: theme === 'dark' ? 'white' : 'black',
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      width: width - 100,
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: 18,
    },
  });
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.text}>{`${t('My profile')}`}</Text>
      </View>
      <View>
        <Image
          style={styles.imagesStyles}
          source={require('@assets/image/avatar1.png')}
        />
        <Text style={styles.nameUser}>{dataUser?.displayName}</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPassword}
        onRequestClose={() => {
          setModalPassword(!modalPassword);
        }}>
        <TouchableWithoutFeedback>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{...styles.title, fontSize: 20}}>
                {`${t('Change your password')}`}
              </Text>
              <TextInput
                style={styles.textInput}
                editable={true}
                defaultValue={newPassword}
                onChangeText={newPassword => setNewPassword(newPassword)}
                maxLength={50}
                textAlign="center"
                keyboardType="numeric"
              />

              <View style={{flexDirection: 'row', gap: 20, paddingTop: 50}}>
                <TouchableOpacity
                  onPress={() => {
                    handleCloseModal();
                  }}
                  style={[styles.button, styles.buttonClose]}>
                  <Text
                    style={{
                      ...styles.title,
                      fontSize: 20,
                      color: theme === 'dark' ? 'black' : 'white',
                    }}>
                    {`${t('Close')}`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handlerChangePassword();
                  }}
                  style={[styles.button, styles.buttonSave]}>
                  <Text
                    style={{
                      ...styles.title,
                      fontSize: 20,
                      color: theme === 'dark' ? 'black' : 'white',
                    }}>
                    {`${t('Save')}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalProfile}
        onRequestClose={() => {
          setModalProfile(!modalProfile);
        }}>
        <TouchableWithoutFeedback>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{...styles.title, fontSize: 20}}>
                {`${t('Change your name')}`}
              </Text>
              <TextInput
                style={styles.textInput}
                editable={true}
                defaultValue={newName}
                onChangeText={newName => setNewName(newName)}
                maxLength={50}
                textAlign="center"
                keyboardType="numeric"
              />

              <View style={{flexDirection: 'row', gap: 20, paddingTop: 50}}>
                <TouchableOpacity
                  onPress={() => {
                    handleCloseProfile();
                  }}
                  style={[styles.button, styles.buttonClose]}>
                  <Text
                    style={{
                      ...styles.title,
                      fontSize: 20,
                      color: theme === 'dark' ? 'black' : 'white',
                    }}>
                    {`${t('Close')}`}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handlerChangeProfile();
                  }}
                  style={[styles.button, styles.buttonSave]}>
                  <Text
                    style={{
                      ...styles.title,
                      fontSize: 20,
                      color: theme === 'dark' ? 'black' : 'white',
                    }}>
                    {`${t('Save')}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="user" size={30} />
          <Text style={styles.mainTitle}>{`${t('Account')}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalProfile(!modalProfile);
          }}>
          <Text style={styles.textSubtitle}>{`${t('Edit profile')}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalPassword(!modalPassword);
          }}>
          <Text style={styles.textSubtitle}>{`${t('Change Password')}`}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="ticket" size={30} />
          <Text style={styles.mainTitle}>{`${t('Ticket')}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(APP_SCREEN.MY_TICKET)}>
          <Text style={styles.textSubtitle}>{`${t('My Ticket')}`}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="setting" size={30} />
          <Text style={styles.mainTitle}>{`${t('Setting')}`}</Text>
        </View>

        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textSubtitle}>{`${t('Languages')}`}</Text>
            <LanguagePicker />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textSubtitle}>{`${t('Theme')}`}</Text>
            <TouchableOpacity onPress={handleToggleTheme}>
              {theme === 'dark' ? (
                <Icon
                  style={{marginTop: 5, marginLeft: 5}}
                  name="dark-mode"
                  size={25}
                  color={'white'}
                />
              ) : (
                <Icon
                  style={{marginTop: 5, marginLeft: 5}}
                  name="light-mode"
                  size={25}
                  color={'black'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="info" size={30} />
          <Text style={styles.mainTitle}>{`${t('About')}`}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(APP_SCREEN.ABOUT)}>
          <Text style={styles.textSubtitle}>{`${t(
            'About Lottie Movie',
          )}`}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => handleLogout()}>
          <CustomIcon style={styles.iconStyle} name="arrow-left" size={30} />
          <Text style={styles.logoutTitle}>{`${t('Log out')}`}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
