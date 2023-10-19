import CustomIcon from '@components/CustomIcon';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {removeToken} from '@redux/actions/authActions';
import {AuthTypes} from '@redux/reducers/authReducer';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  MARGIN,
  SPACING,
} from '@type/theme';
import firebase from 'firebase/compat';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export default function Account({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const dispacth = useDispatch();
  const uid = useSelector((store: AuthTypes) => store?.uid);
  const [dataUser, setDataUser] = useState<any>();
  const [modalPassword, setModalPassword] = useState<boolean>(false);
  const [modalProfile, setModalProfile] = useState<boolean>(false);
  const [newName, setNewName] = useState<any>();
  const [newEmail, setNewEmail] = useState<any>();
  const [newPassword, setNewPassword] = useState<any>();
  const isFocused = useIsFocused();
  useEffect(() => {
    getDataUser();
  }, [isFocused]);
  const getDataUser = async () => {
    if (uid) {
      try {
        firebase
          .database()
          .ref(`users/${uid}`)
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
  const handlerChangePassword = async () => {
    try {
      const user = await firebase.auth().currentUser;
      console.log('current user', user);
      if (user) {
        const newPass = await user.updatePassword(newPassword);
        await firebase.database().ref(`users/${uid}`).update({
          password: newPassword,
        });
        console.log('Mật khẩu đã được cập nhật thành công.');
        setNewPassword(newPass);
      }
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Change Password Successfully`,
        visibilityTime: 4000,
        topOffset: 50,
        autoHide: true,
      });
      setModalPassword(!modalPassword);
    } catch (error) {
      console.log(error);
    }
  };
  const handlerChangeProfile = async () => {
    try {
      const user = firebase.auth().currentUser;
      console.log('1111', user?.displayName);
      if (user) {
        const userName = await user.updateProfile(newName);
        await firebase.database().ref(`users/${uid}`).update({
          displayName: newName,
        });
        setNewName(userName);
        console.log('Tên đã được cập nhật thành công.');
      }
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Change Infomation Successfully`,
        visibilityTime: 3000,
        topOffset: 50,
        autoHide: true,
      });
      setModalProfile(!modalProfile);
    } catch (error) {
      console.log(error);
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
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>My Profile</Text>
      </View>
      <View>
        <Image
          style={styles.imagesStyles}
          source={require('@assets/image/avatar1.png')}
        />
        <Text style={styles.nameUser}>
          {dataUser ? dataUser?.displayName : dataUser?.name}
        </Text>
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
                Change your password:
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
                      color: COLORS.White,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handlerChangePassword();
                  }}
                  style={[styles.button, styles.buttonSave]}>
                  <Text style={{...styles.title, fontSize: 20, color: 'white'}}>
                    Save
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
                Change your name:
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
                      color: COLORS.White,
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handlerChangeProfile();
                  }}
                  style={[styles.button, styles.buttonSave]}>
                  <Text style={{...styles.title, fontSize: 20, color: 'white'}}>
                    Save
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
          <Text style={styles.mainTitle}>Account</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalProfile(!modalProfile);
          }}>
          <Text style={styles.textSubtitle}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalPassword(!modalPassword);
          }}>
          <Text style={styles.textSubtitle}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="ticket" size={30} />
          <Text style={styles.mainTitle}>Ticket</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(APP_SCREEN.MY_TICKET)}>
          <Text style={styles.textSubtitle}>My Ticket</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="setting" size={30} />
          <Text style={styles.mainTitle}>Setting</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.textSubtitle}>Themes</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.textSubtitle}>Languages</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="info" size={30} />
          <Text style={styles.mainTitle}>About</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.textSubtitle}>About Lottie Movie</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => handleLogout()}>
          <CustomIcon style={styles.iconStyle} name="arrow-left" size={30} />
          <Text style={styles.logoutTitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  headerContainer: {
    flex: 1,
  },
  text: {
    color: COLORS.White,
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
    color: COLORS.White,
    textAlign: 'center',
    marginBottom: MARGIN.margin_20,
  },
  iconStyle: {
    color: COLORS.White,
    marginLeft: MARGIN.margin_20,
  },
  textSubtitle: {
    fontFamily: FONTTFAMILY.poppins_regular,
    color: COLORS.White,
    marginTop: MARGIN.margin_6,
    fontSize: FONTSIZE.size_16,
    marginLeft: MARGIN.margin_30 * 3,
  },
  mainTitle: {
    color: COLORS.White,
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
    color: COLORS.White,
    fontFamily: FONTTFAMILY.poppins_regular,
  },
  title: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: 26,
    color: COLORS.Black,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: COLORS.White,
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
    backgroundColor: COLORS.Black,
  },
  buttonClose: {
    backgroundColor: COLORS.Black,
  },
  textInput: {
    marginTop: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f7f8fb',
    width: width - 100,
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: 18,
  },
});
