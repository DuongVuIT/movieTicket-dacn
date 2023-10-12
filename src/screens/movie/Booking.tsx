import {mall, timeArray} from '@api/fakeData';
import CustomIcon from '@components/CustomIcon';
import IconHeader from '@components/IconHeader';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@type/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text} from 'react-native';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
const host = 'https://provinces.open-api.vn/api/';
const {height, width} = Dimensions.get('screen');
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
  const [cities, setCities] = useState<[]>([]);
  const [districts, setDistricts] = useState<[]>([]);
  const [seatArray, setSeatArray] = useState<any[][]>(generateSeat());
  const [selectedSeatArray, setSelectedSeatArray] = useState<any>([]);
  const [price, setPrice] = useState<number>();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [selectedCity, setSelectedCity] = useState<[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<[]>([]);
  const [selectedMall, setSelectedMall] = useState<[]>([]);
  const [dateArray, setDateArray] = useState<any[]>(getDate());
  const [selectedTime, setSelectedTime] = useState<any>();
  useEffect(() => {
    callAPI(host);
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

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!seatArray[index][subindex].taken) {
      let arraySeatSelect: any = [...selectedSeatArray];
      let seat = [...seatArray];
      seat[index][subindex].selected = !seat[index][subindex].selected;
      if (!arraySeatSelect.includes(num)) {
        arraySeatSelect.push(num);
        setSelectedSeatArray(arraySeatSelect);
      } else {
        const tempIndex = arraySeatSelect.indexOf(num);
        if (tempIndex > -1) {
          arraySeatSelect.splice(tempIndex, 1);
          setSelectedSeatArray(arraySeatSelect);
        }
      }
      setPrice(arraySeatSelect.length * 50);
      setSeatArray(seat);
    }
  };
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
          <LinearGradient
            colors={[COLORS.LightGreyRGBA50]}
            style={styles.linearGradient}>
            <View style={styles.iconHeader}>
              <IconHeader
                name="arrow-left"
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
        <View>
          <SelectList
            placeholder="Select city "
            inputStyles={{color: 'white'}}
            dropdownShown={false}
            boxStyles={styles.boxSelectedStyle}
            dropdownStyles={styles.dropdownStyle}
            dropdownTextStyles={{fontSize: 14, color: 'white'}}
            setSelected={(val: any) => handleCityChange(val)}
            data={cities.map((item: any) => ({
              value: item.name,
              key: item.code,
            }))}
          />
        </View>
        <View>
          <SelectList
            placeholder="Select district"
            boxStyles={styles.boxSelectedStyle}
            inputStyles={{color: 'white'}}
            dropdownStyles={styles.dropdownStyle}
            dropdownTextStyles={{fontSize: 14, color: 'white'}}
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <SelectList
          placeholder="Select mall"
          boxStyles={styles.boxSelectedStyle}
          dropdownStyles={styles.dropdownStyle}
          dropdownTextStyles={{fontSize: 14, color: 'white'}}
          setSelected={(val: any) => setSelectedMall(val)}
          inputStyles={{color: 'white'}}
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
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: COLORS.Grey}]}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: COLORS.Orange}]}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDate(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_18}
                      : index == dateArray.length - 1
                      ? {marginRight: SPACING.space_10}
                      : {},
                    index == selectedDate
                      ? {backgroundColor: COLORS.Orange}
                      : {},
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
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTime(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index == 0
                      ? {marginLeft: SPACING.space_24}
                      : index == dateArray.length - 1
                      ? {marginRight: SPACING.space_24}
                      : {},
                    index == selectedTime
                      ? {backgroundColor: COLORS.Orange}
                      : {},
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
          <Text style={styles.totalPrice}>Total Price</Text>
          <Text style={styles.price}>{price},000</Text>
        </View>
        <TouchableOpacity style={styles.ticketContainer}>
          <Text style={styles.ticket}>Buy ticket</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
    height: height + 150,
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
  linearGradient: {
    height: '100%',
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
    color: COLORS.White,
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
    color: COLORS.White,
  },
  radioText: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  contentContainerStyle: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 6,
    height: SPACING.space_10 * 8,
    borderRadius: SPACING.space_36,
    backgroundColor: COLORS.Black,
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: SPACING.space_10,
  },
  dateText: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_24,
    backgroundColor: COLORS.Black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
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
    color: COLORS.White,
  },
  price: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  ticketContainer: {
    borderRadius: BORDERRADIUS.radius_24,
    paddingHorizontal: SPACING.space_22,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
  },
  ticket: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
});
export default Booking;
