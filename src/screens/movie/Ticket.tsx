import CustomIcon from '@components/CustomIcon';
import IconHeader from '@components/IconHeader';
import ThemeContext from '@context/ThemeContext';
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
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
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
  const {theme, toggleTheme} = useContext(ThemeContext);
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const [ticketUser, setTicketUser] = useState<any>();
  const [tickets, setTickets] = useState();
  useEffect(() => {
    getInfo();
    getData();
  }, [isFocused]);

  const idticket = useSelector((state: AuthTypes) => state?.ticketId);
  const uid = useSelector((state: AuthTypes) => state?.uid);
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
  const getData = async () => {
    try {
      const snapshot = await firebase
        .database()
        .ref(`users/${uid}/tickets/`)
        .once('value');
      if (snapshot.exists()) {
        const dataticket = snapshot.val();
        setTickets(dataticket);
        console.log('Dữ liệu vé phim:', JSON.stringify(dataticket, null, 5));

        const currentUserHasTicket = Object.keys(dataticket).includes(idticket);

        if (currentUserHasTicket) {
          console.log('Current user have ticket.');
          const userTicketData = dataticket[idticket];
          setTicketUser(userTicketData);
        } else {
          console.log('Current user has no ticket.');
          setTicketUser(null);
        }
      } else {
        console.log('Data not found');
        setTicketUser(null);
      }
    } catch (error) {
      console.log('Data not found');
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    loadingIcon: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
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
  if (!ticketUser) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={'large'} color={COLORS.White} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconHeader}></View>
      <View style={[styles.ticketContainer]}>
        <View>
          <ImageBackground
            source={{uri: ticketUser?.image}}
            style={styles.ticketBGimage}></ImageBackground>
        </View>

        <View style={styles.ticketFooter}>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketUser?.date?.date}</Text>
              <Text style={styles.subtitle}>{ticketUser?.date?.day}</Text>
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
              <Text style={styles.subheading}>{`${t('Place')}`}</Text>
              <Text style={styles.subtitle}>{ticketUser?.mall}</Text>
            </View>

            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>{`${t('Seats')}`}</Text>
              <Text style={styles.subtitle}>
                {ticketUser?.seat
                  ?.slice(0, 3)
                  ?.map((item: any, index: number, arr: any) => {
                    return item + (index === arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.name}>{ticketUser?.userName}</Text>
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
