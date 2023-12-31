import {baseImagePath, castCredits, castPeoples} from '@api/apiCall';
import IconHeader from '@components/IconHeader';
import SubCardMovie from '@components/SubCardMovie';
import ThemeContext from '@context/ThemeContext';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  MARGIN,
  SPACING,
} from '@type/theme';
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const {width} = Dimensions.get('window');

const CastDetails = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [peopleDetails, setPeopleDetails] = useState<any>();
  const [castMovieList, setCastmovie] = useState<any>();
  const route = useRoute<any>();
  const data = route?.params;
  const {t} = useTranslation();
  const getPeopleDetails = async (castId: number) => {
    try {
      let response = await fetch(castPeoples(castId));
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  const SeparatorComponent = () => {
    return <View style={{width: 10}} />;
  };
  const getCastCredits = async (castId: number) => {
    try {
      let response = await fetch(castCredits(castId));
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      const castDatas = await getPeopleDetails(data?.castId);
      setPeopleDetails(castDatas);
    })();

    (async () => {
      const castDataMovie = await getCastCredits(data?.castId);
      setCastmovie(castDataMovie?.cast);
    })();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
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
      color: theme === 'dark' ? 'white' : 'black',
    },
    place: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_20,
      color: theme === 'dark' ? 'white' : 'black',
    },
    infoContainer: {
      flex: 1,
      marginTop: MARGIN.margin_20,
      flexDirection: 'row',
      borderWidth: 2,
      alignSelf: 'center',
      borderColor: theme === 'dark' ? 'white' : 'black',
      width: '95%',
      padding: SPACING.space_10,
      borderRadius: BORDERRADIUS.radius_20 * 3,
    },
    textTitle: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme === 'dark' ? 'white' : 'black',
      marginLeft: 2,
      fontSize: 14,
    },
    textContent: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: theme === 'dark' ? 'white' : 'black',
      marginTop: 10,
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: 14,
    },
    borderWidth: {
      flex: 1,
      borderRightWidth: 2,
      borderColor: theme === 'dark' ? 'white' : 'black',
    },
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
      color: theme === 'dark' ? 'white' : 'black',
    },
    movies: {
      color: theme === 'dark' ? 'white' : 'black',
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_20,
      marginTop: SPACING.space_20,
      marginLeft: SPACING.space_10,
      marginRight: SPACING.space_10,
      marginBottom: SPACING.space_10,
    },
  });
  if (!peopleDetails && !peopleDetails && !castMovieList) {
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
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View>
          <View>
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
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.borderWidth}>
            <Text style={styles.textTitle}>{`${t('Gender')}`}</Text>
            <Text style={styles.textContent}>
              {peopleDetails?.gender == 1 ? 'Female' : 'Male'}
            </Text>
          </View>
          <View style={styles.borderWidth}>
            <Text style={styles.textTitle}>{`${t('Birth Day')}`}</Text>
            <Text style={styles.textContent}>{peopleDetails?.birthday}</Text>
          </View>
          <View style={styles.borderWidth}>
            <Text style={styles.textTitle}>{`${t('Know For')}`}</Text>
            <Text style={styles.textContent}>
              {peopleDetails?.known_for_department}
            </Text>
          </View>
          <View style={styles.borderWidthLast}>
            <Text style={styles.textTitle}>{`${t('Popularity')}`}</Text>
            <Text style={styles.textContent}>
              {peopleDetails?.popularity?.toFixed(2)} %
            </Text>
          </View>
        </View>
        <View style={styles.biographyContainer}>
          <Text style={styles.nameStyles}>{`${t('Biography')}`}</Text>
          <Text style={styles.textBiography}>{peopleDetails?.biography}</Text>
        </View>
        <View>
          <Text style={styles.movies}>{`${t('MOVIE')}`}</Text>
          <FlatList
            data={castMovieList}
            keyExtractor={(item: any) => item.id}
            horizontal
            renderItem={({item, index}) => (
              <SubCardMovie
                cardMovieFunction={() => {
                  navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {
                    movieId: item.id,
                  });
                }}
                shouldMarginatedAtEnd={true}
                cardWidth={width / 3}
                firstCard={index == 0 ? true : false}
                lastCard={index == castMovieList?.length ? true : false}
                title={item.original_title}
                imagaPath={baseImagePath('w342', item.poster_path)}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            )}
            ItemSeparatorComponent={SeparatorComponent}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CastDetails;
