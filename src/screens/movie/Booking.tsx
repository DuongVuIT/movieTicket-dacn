import {mall, timeArray} from '@api/fakeData';
import CustomIcon from '@components/CustomIcon';
import IconHeader from '@components/IconHeader';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {APP_SCREEN, RootParamList} from '@type/navigation';

import {saveTicket} from '@redux/actions/authActions';
import {AuthTypes} from '@redux/reducers/authReducer';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import axios from 'axios';
import firebase from 'firebase/compat';
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import ThemeContext from '@context/ThemeContext';
import {useStripe} from '@stripe/stripe-react-native';
const host = 'https://provinces.open-api.vn/api/';
const getDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 30; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};
const generateSeat = () => {
  let numRow = 8;
  let numCol = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;
  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numCol; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numCol += 2;
    }
    if (numCol < 9 && !reachnine) {
      numCol += 2;
    } else {
      reachnine = true;
      numCol -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const Booking = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const route = useRoute<any>();
  const {theme, toggleTheme} = useContext(ThemeContext);

  const dispatch = useDispatch();
  const [cities, setCities] = useState<[]>([]);
  const [dataUser, setData] = useState<any>();
  const [districts, setDistricts] = useState<[]>([]);
  const [seatArray, setSeatArray] = useState<any[][]>(generateSeat());
  const [selectedSeatArray, setSelectedSeatArray] = useState<any>([]);
  const [price, setPrice] = useState<any>();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [selectedCity, setSelectedCity] = useState<any>();
  const [selectedDistrict, setSelectedDistrict] = useState<any>();
  const [selectedMall, setSelectedMall] = useState<any>();
  const [dateArray, setDateArray] = useState<any[]>(getDate());
  const [selectedTime, setSelectedTime] = useState<any>();
  const uid = useSelector((state: AuthTypes) => state?.uid);
  const {t} = useTranslation();
  useEffect(() => {
    callAPI(host);
  }, []);
  useEffect(() => {
    getInfo();
  }, []);

  const callAPI = async (api: any) => {
    try {
      const response = await axios.get(api);
      const city = response.data;
      if (city && city.length > 0) {
        setCities(city);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const callApiDistrict = async (api: any) => {
    try {
      const response = await axios.get(api);
      const district = response.data.districts;
      if (district && district.length > 0) {
        setDistricts(district);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCityChange = (itemValue: any) => {
    callApiDistrict(host + 'p/' + itemValue + '?depth=2');
    const selectCityById: any = cities.find(
      (name: any) => name.code === itemValue,
    );
    setSelectedCity(selectCityById?.name);
  };
  const handleDistrictChange = (itemValue: any) => {
    setSelectedDistrict(itemValue);
  };

  const getInfo = async () => {
    if (uid) {
      try {
        firebase
          .database()
          .ref(`users/${uid}`)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setData(data?.displayName);
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

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!seatArray[index][subindex].taken) {
      seatArray[index][subindex].selected =
        !seatArray[index][subindex].selected;
      if (!selectedSeatArray.includes(num)) {
        selectedSeatArray.push(num);
        setSelectedSeatArray(selectedSeatArray);
      } else {
        const tempIndex = selectedSeatArray.indexOf(num);
        if (tempIndex > -1) {
          selectedSeatArray.splice(tempIndex, 1);
          setSelectedSeatArray(selectedSeatArray);
        }
      }
      setPrice(selectedSeatArray.length * 50);
      setSeatArray(seatArray);
    }
  };
  const stripe = useStripe();
  const bookSeat = async () => {
    const ticketImage = route?.params?.PosterImage;
    const movieName = route?.params?.MovieName;
    if (
      selectedSeatArray.length !== 0 &&
      !!selectedTime &&
      !!selectedDate &&
      !!selectedCity &&
      !!selectedDistrict &&
      !!selectedMall &&
      !!selectedSeatArray
    ) {
      try {
        const userUID = uid;
        const ticketData = {
          userName: dataUser,
          seat: selectedSeatArray,
          movieName: movieName,
          date: selectedDate,
          time: selectedTime,
          city: selectedCity,
          districts: selectedDistrict,
          image: ticketImage,
          mall: selectedMall,
        };
        const ticketsRef = firebase.database().ref(`users/${userUID}/tickets`);
        const newTicketRef = await ticketsRef.push(ticketData);
        const newTicketID: any = newTicketRef?.key;
        dispatch(saveTicket(newTicketID));
        const response = await fetch('http://localhost:8000/payment', {
          method: 'POST',
          body: JSON.stringify({
            amount: Math.floor(price * 1000),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        if (!response.ok) return alert(data.message);
        const clientSecret = data.clientSecret;
        const initSheet = await (stripe as any).initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
        });
        if (initSheet.error) return alert(initSheet.error.message);
        const presentSheet = await (stripe as any).presentPaymentSheet({
          clientSecret,
        });
        if (presentSheet.error) return alert(presentSheet.error.message);
        navigation.navigate(APP_SCREEN.TICKET);

        Toast.show({
          type: 'success',
          position: 'top',
          text1: `${t('Success')}`,
          text2: `${t('Buy ticket success')}`,
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 50,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: `${t('Error')}`,
        text2: `${t('Please select all information')}`,
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    loadingIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollContainer: {
      flex: 1,
    },
    iconHeader: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_24 * 2,
    },
    imageBG: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    boxSelectedStyle: {
      marginTop: 10,
      borderRadius: 20,
      marginRight: 10,
    },
    dropdownStyle: {
      borderRadius: 30,
      marginRight: 10,
    },
    seatContainer: {
      marginVertical: SPACING.space_20,
    },
    seat: {
      gap: SPACING.space_20,
    },
    seatStyle: {
      flexDirection: 'row',
      gap: SPACING.space_20,
      justifyContent: 'center',
    },
    seatIcon: {
      fontSize: FONTSIZE.size_24,
      color: theme === 'dark' ? 'white' : 'black',
    },
    seatRadio: {
      flexDirection: 'row',
      marginVertical: SPACING.space_20,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    radioContainer: {
      flexDirection: 'row',
      gap: SPACING.space_10,
      alignItems: 'center',
    },
    radioIcon: {
      fontSize: FONTSIZE.size_20,
      color: theme === 'dark' ? 'white' : 'black',
    },
    radioText: {
      fontFamily: FONTTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_12,
      color: theme === 'dark' ? 'white' : 'black',
    },
    contentContainerStyle: {
      gap: SPACING.space_24,
    },
    dateContainer: {
      width: SPACING.space_10 * 6,
      height: SPACING.space_10 * 8,
      borderRadius: SPACING.space_36,
      backgroundColor: theme === 'dark' ? 'white' : 'black',
      alignItems: 'center',
      justifyContent: 'center',

      marginBottom: SPACING.space_10,
    },
    dateText: {
      fontFamily: FONTTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_24,
      color: theme === 'dark' ? 'black' : 'white',
    },
    dayText: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: theme === 'dark' ? 'black' : 'white',
    },
    timeContainer: {
      paddingVertical: SPACING.space_10,
      borderWidth: 1,
      borderColor: COLORS.WhiteRGBA50,
      paddingHorizontal: SPACING.space_20,
      borderRadius: BORDERRADIUS.radius_24,
      backgroundColor: theme === 'dark' ? 'white' : 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeText: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: theme === 'dark' ? 'black' : 'white',
    },
    buttonpriceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.space_24,
      paddingBottom: SPACING.space_24,
    },
    priceContainer: {
      alignItems: 'center',
    },
    totalPrice: {
      marginTop: SPACING.space_10,
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_20,
      color: theme === 'dark' ? 'white' : 'black',
    },
    price: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_20,
      color: theme === 'dark' ? 'white' : 'black',
    },
    linearGradient: {
      height: '100%',
    },
    ticketContainer: {
      borderRadius: BORDERRADIUS.radius_24,
      paddingHorizontal: SPACING.space_22,
      paddingVertical: SPACING.space_10,
      backgroundColor: theme === 'dark' ? 'white' : 'black',
    },
    ticket: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_20,
      color: theme === 'dark' ? 'black' : 'white',
    },
    iconSelect: {
      color: theme === 'dark' ? 'white' : 'black',
    },
  });
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          style={styles.imageBG}
          source={{uri: route.params?.BgImage}}>
          <View style={styles.linearGradient}>
            <View style={styles.iconHeader}>
              <IconHeader
                name="arrow-left"
                action={() => navigation.goBack()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
        <View>
          <SelectList
            placeholder={`${t('Select city')}`}
            inputStyles={{color: theme === 'dark' ? 'white' : 'black'}}
            dropdownShown={false}
            boxStyles={styles.boxSelectedStyle}
            dropdownStyles={styles.dropdownStyle}
            dropdownTextStyles={{
              fontSize: 14,
              color: theme === 'dark' ? 'white' : 'black',
            }}
            setSelected={(val: any) => handleCityChange(val)}
            data={cities.map((item: any) => ({
              value: item.name,
              key: item.code,
            }))}
          />
        </View>
        <View>
          <SelectList
            placeholder={`${t('Select district')}`}
            boxStyles={styles.boxSelectedStyle}
            inputStyles={{color: theme === 'dark' ? 'white' : 'black'}}
            dropdownStyles={styles.dropdownStyle}
            dropdownTextStyles={{
              fontSize: 14,
              color: theme === 'dark' ? 'white' : 'black',
            }}
            setSelected={(val: any) => setSelectedDistrict(val)}
            onSelect={() => handleDistrictChange}
            data={districts.map((item: any) => ({
              value: item.name,
              key: item.codename,
            }))}
            save="value"
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SelectList
          placeholder={`${t('Select mall')}`}
          boxStyles={styles.boxSelectedStyle}
          dropdownStyles={styles.dropdownStyle}
          dropdownTextStyles={{
            fontSize: 14,
            color: theme === 'dark' ? 'white' : 'black',
          }}
          setSelected={(val: any) => setSelectedMall(val)}
          inputStyles={{color: theme === 'dark' ? 'white' : 'black'}}
          data={mall.map((item: any) => ({
            value: item.Name,
            key: item.idMall,
          }))}
          save="value"
        />
      </View>
      <View style={styles.seatContainer}>
        <View style={styles.seat}>
          {seatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatStyle}>
                {item?.map((subitem, subindex) => {
                  return (
                    <TouchableOpacity
                      key={subitem.number}
                      onPress={() => {
                        selectSeat(index, subindex, subitem.number);
                      }}>
                      <CustomIcon
                        name="seat"
                        style={[
                          styles.seatIcon,
                          subitem.taken ? {color: COLORS.Grey} : {},
                          subitem.selected ? {color: COLORS.Orange} : {},
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.seatRadio}>
          <View style={styles.radioContainer}>
            <CustomIcon name="radio" style={styles.radioIcon} />
            <Text style={styles.radioText}>{`${t('Available')}`}</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: COLORS.Grey}]}
            />
            <Text style={styles.radioText}>{`${t('Taken')}`}</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: COLORS.Orange}]}
            />
            <Text style={styles.radioText}>{`${t('Selected')}`}</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}) => {
            const isSelected = item === selectedDate;
            return (
              <TouchableOpacity onPress={() => setSelectedDate(item)}>
                <View
                  style={[
                    styles.dateContainer,
                    item === dateArray[0] ? {marginLeft: SPACING.space_18} : {},
                    item === dateArray[dateArray.length - 1]
                      ? {marginRight: SPACING.space_10}
                      : {},
                    isSelected ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                  <Text></Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View>
        <FlatList
          data={timeArray}
          keyExtractor={item => item}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}) => {
            const isSelected = item === selectedTime;
            return (
              <TouchableOpacity onPress={() => setSelectedTime(item)}>
                <View
                  style={[
                    styles.timeContainer,
                    item === timeArray[0] ? {marginLeft: SPACING.space_18} : {},
                    item === timeArray[timeArray.length - 1]
                      ? {marginRight: SPACING.space_10}
                      : {},
                    isSelected ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.buttonpriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPrice}>{`${t('Total Price')}`}</Text>
          <Text style={styles.price}>{price},000 VNĐ</Text>
        </View>
        <TouchableOpacity style={styles.ticketContainer} onPress={bookSeat}>
          <Text style={styles.ticket}>{`${t('Buy ticket')}`}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Booking;
