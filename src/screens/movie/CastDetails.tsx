import { baseImagePath, castPeoples } from '@api/apiCall';
import IconHeader from '@components/IconHeader';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '@type/navigation';
import { BORDERRADIUS, COLORS, FONTSIZE, FONTTFAMILY, MARGIN, SPACING } from '@type/theme';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CastDetails = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const [peopleDetails, setPeopleDetails] = useState<any>();
  const route = useRoute<any>();
  const data = route?.params;
  const insets = useSafeAreaInsets()

  const getPeopleDetails = async (castId: number) => {
    try {
      let response = await fetch(castPeoples(castId));
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
console.log(peopleDetails)
  useEffect(() => { 
    (async () => { 
      const castDatas = await getPeopleDetails(data?.castId);
      setPeopleDetails(castDatas);
    })();
  }, []);
  console.log(peopleDetails)
  console.log(peopleDetails)
  if (!peopleDetails && !peopleDetails ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.iconHeader}>
          <IconHeader
            name="arrow-left"
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingIcon}>
          <ActivityIndicator size={'large'} color={COLORS.White} />
        </View>
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View>
          <LinearGradient colors={[COLORS.LightGreyRGBA50]}>
            <View style={styles.iconHeader}>
              <IconHeader
                name="arrow-left"
                action={() => navigation.goBack()}
              />
              <Image
                source={{
                  uri: baseImagePath('w342', peopleDetails?.profile_path),
                }}
                style={styles.images}
              />
            </View>
            <View style={styles.nameCast}>
              <Text style={styles.nameStyles}>{peopleDetails?.name}</Text>
              <Text style={styles.place}>{peopleDetails?.place_of_birth}</Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.borderWidth}>
            <Text style={styles.textTitle}>Gender</Text>
            <Text style={styles.textContent}>
              {peopleDetails?.gender == 1 ? 'Female' : 'Male'}
            </Text>
          </View>
          <View style={styles.borderWidth}>
            <Text style={styles.textTitle}>Birth Day</Text>
            <Text style={styles.textContent}>{peopleDetails?.birthday}</Text>
          </View>
          <View style={styles.borderWidth}>
            <Text style={styles.textTitle}>Know For</Text>
            <Text style={styles.textContent}>
              {peopleDetails?.known_for_department}
            </Text>
          </View>
          <View style={styles.borderWidthLast}>
            <Text style={styles.textTitle}>Popularity</Text>
            <Text style={styles.textContent}>
              {peopleDetails?.popularity?.toFixed(2)} %
            </Text>
          </View>
        </View>
        <View style={[styles.biographyContainer, {marginBottom: insets.bottom}]}>
          <Text style={styles.nameStyles}>Biography</Text>
          <Text style={styles.textBiography}>{peopleDetails?.biography}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles =  StyleSheet.create({
    
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
      marginTop: SPACING.space_20 * 2,
    },
    images: {
      width: '80%',
      aspectRatio: 1 / 1,
      borderRadius: BORDERRADIUS.radius_32 * 4,
      alignSelf: 'center',
    },
    scrollContainer: {
      flex: 1,
    },
    nameCast: {
      marginTop: MARGIN.margin_20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nameStyles: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_24,
      color: COLORS.White,
    },
    place: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_20,
      color: COLORS.White,
    },
    infoContainer: {
      flex: 1,
      marginTop: MARGIN.margin_20,
      flexDirection: 'row',
      borderWidth: 2,
      alignSelf: 'center',
      width: '95%',
      padding: SPACING.space_10,
      borderRadius: BORDERRADIUS.radius_20 * 3,
    },
    textTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: COLORS.White,
      marginLeft: 2,
      fontSize: 14,
    },
    textContent: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: COLORS.White,
      marginTop: 10,
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: 14,
    },
    borderWidth: {flex: 1, borderRightWidth: 2},
    borderWidthLast: {
      flex: 1,
    },
    biographyContainer: {
      flex: 1,
      marginTop: SPACING.space_20,
      marginLeft: SPACING.space_10,
      marginRight: SPACING.space_10,
     
    },
    textBiography: {
      flex: 1,
      marginTop: SPACING.space_10,
      alignItems: 'center',
      textAlign: 'justify',
      color: COLORS.White,
    },
  });

export default CastDetails;
