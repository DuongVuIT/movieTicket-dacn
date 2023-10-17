import CustomIcon from '@components/CustomIcon';
import IconHeader from '@components/IconHeader';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthTypes} from '@redux/reducers/authReducer';
import {RootParamList} from '@type/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import firebase from 'firebase/compat';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
export default function Ticket({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const isFocused = useIsFocused();

  const [ticketUser, setTicketUser] = useState<any>();

  useEffect(() => {
    getInfo();
  }, [isFocused]);
  const idticket = useSelector((state: AuthTypes) => state?.ticketId);
  const uid = useSelector((state: AuthTypes) => state?.uid);
  console.log('uid', uid);
  console.log(idticket);
  const getInfo = async () => {
    if (uid) {
      const snapshot = await firebase
        .database()
        .ref(`users/${uid}/tickets/${idticket}/`)
        .once('value');
      if (snapshot.exists()) {
        const data = snapshot.val();
        setTicketUser(data);
        console.log('Dữ liệu vé phim:', data);
      } else {
        console.log('Không có dữ liệu ghế xem phim.');
      }
    }
  };

  if (ticketUser == undefined || ticketUser == null) {
    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.iconHeader}>
          <IconHeader name="arrow-left" action={() => navigation.goBack()} />
        </View>
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={'large'} color={COLORS.White} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.iconHeader}>
        <IconHeader
          name="arrow-left"
          header={''}
          action={() => navigation.goBack()}
        />
      </View>
      <View style={[styles.ticketContainer]}>
        <View>
          <ImageBackground
            source={{uri: ticketUser?.image}}
            style={styles.ticketBGimage}></ImageBackground>
        </View>

        <View style={styles.ticketFooter}>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketUser?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketUser?.date.day}</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.subtitle}>{ticketUser?.time}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.city}>{ticketUser?.city}</Text>
              <Text style={styles.city}>{ticketUser?.districts}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Place</Text>
              <Text style={styles.subtitle}>{ticketUser?.mall}</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketUser?.seat
                  ?.slice(0, 3)
                  ?.map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.name}>Vu Dai Duong</Text>
          </View>
          <Image
            source={require('@assets/image/barcode.png')}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GrayRGBA,
  },
  loadingIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeader: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_24 * 2,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGimage: {
    top: 10,
    alignSelf: 'center',
    borderTopLeftRadius: BORDERRADIUS.radius_26,
    borderTopRightRadius: BORDERRADIUS.radius_26,
    width: 300,
    aspectRatio: 200 / 300,
    overflow: 'hidden',
  },

  ticketFooter: {
    backgroundColor: COLORS.Black,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_26,
    borderBottomRightRadius: BORDERRADIUS.radius_26,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subheading: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  city: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  name: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    marginBottom: SPACING.space_10,
  },
});
