import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING} from '@type/theme';
import IconHeader from '@components/IconHeader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@type/navigation';
import {useRoute} from '@react-navigation/native';
import {SelectList} from 'react-native-dropdown-select-list';
import {mall} from '@api/fakeData';
const host = 'https://provinces.open-api.vn/api/';

const Booking = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const route = useRoute<any>();
  const [cities, setCities] = useState<[]>([]);
  const [districts, setDistricts] = useState<[]>([]);
  const [selectedCity, setSelectedCity] = useState<[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<[]>([]);
  const [selectedMall, setSelectedMall] = useState<[]>([]);
  console.log(selectedCity, selectedMall, selectedDistrict);
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

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View>
        <ImageBackground
          style={styles.imageBG}
          source={{uri: route.params?.BgImage}}>
          <LinearGradient
            colors={[COLORS.LightGreyRGBA50, COLORS.Black]}
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
            boxStyles={styles.boxSelectedStyle}
            dropdownStyles={styles.dropdownStyle}
            dropdownTextStyles={{fontSize: 14}}
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
            dropdownStyles={styles.dropdownStyle}
            dropdownTextStyles={{fontSize: 14}}
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
          dropdownTextStyles={{fontSize: 14}}
          setSelected={(val: any) => setSelectedMall(val)}
          data={mall.map((item: any) => ({
            value: item.Name,
            key: item.idMall,
          }))}
          save="value"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
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
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  linearGradient: {
    height: '100%',
  },
  itemStyle: {
    fontSize: 16,
    color: COLORS.Black,
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
});
export default Booking;
