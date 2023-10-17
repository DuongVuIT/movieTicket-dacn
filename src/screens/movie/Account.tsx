import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {removeToken} from '@redux/actions/authActions';
import {AuthTypes} from '@redux/reducers/authReducer';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {COLORS, FONTSIZE, FONTTFAMILY, MARGIN} from '@type/theme';
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/compat';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomIcon from '@components/CustomIcon';
export default function Account({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const dispacth = useDispatch();
  const uid = useSelector((store: AuthTypes) => store?.uid);
  const [displayName, setDisplayName] = useState();
  useEffect(() => {
    getDataUser();
  }, []);
  const getDataUser = async () => {
    if (uid) {
      try {
        firebase
          .database()
          .ref(`users/${uid}/name`)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              const name = snapshot.val();
              setDisplayName(name);
              console.log('User name:', name);
            } else {
              console.log('No data.');
            }
          });
      } catch (error) {
        console.log(error);
      }
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
        <Text style={styles.nameUser}>{displayName}</Text>
      </View>
      <View>
        <View style={styles.subContainer}>
          <CustomIcon style={styles.iconStyle} name="user" size={30} />
          <Text style={styles.mainTitle}>Account</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.textSubtitle}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
    marginTop: 40,
    marginLeft: 30,
  },
});
