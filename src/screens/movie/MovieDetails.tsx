import {baseImagePath, castDetails, movieDetails} from '@api/apiCall';
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
import React, {useEffect, useState} from 'react';
import {Image, ImageBackground} from 'react-native';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function MovieDetails({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const [movieData, setMovieData] = useState<any>();
  const [movieCastData, setMovieCastData] = useState<any>();
  const route = useRoute<any>();
  const data = route.params;
  const getMovieDetails = async (movieId: number) => {
    try {
      let response = await fetch(movieDetails(movieId));
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  const getMovieCastDetails = async (movieId: number) => {
    try {
      let response = await fetch(castDetails(movieId));
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(data?.movieId);
      setMovieData(tempMovieData);
    })();

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(data?.movieId);
      setMovieCastData(tempMovieCastData.cast);
    })();
  }, []);
  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
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
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          style={styles.imageBG}
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}>
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
        <View style={styles.imageBG}></View>
        <Image
          source={{uri: baseImagePath('w342', movieData?.poster_path)}}
          style={styles.images}
        />
      </View>
      <View style={styles.time_realease}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.time}>
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>
      <View>
        <Text style={styles.original_title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View key={item.id} style={styles.genreBox}>
                <Text style={styles.genres}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>
      <View style={styles.overviewContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.time}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.time}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleDateString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date.substring(0, 4)}
          </Text>
        </View>
      </View>
      <View></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
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
  imagesContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  images: {
    width: '60%',
    position: 'absolute',
    aspectRatio: 200 / 300,
    alignSelf: 'center',
    bottom: 0,
    borderRadius: BORDERRADIUS.radius_20,
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    alignSelf: 'center',
    right: SPACING.space_6,
  },
  time: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    marginLeft: SPACING.space_6,
  },
  time_realease: {
    top: SPACING.space_10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  original_title: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    textAlign: 'center',
    top: SPACING.space_14,
  },
  genreContainer: {
    top: SPACING.space_20,
    flexDirection: 'row',
    gap: SPACING.space_8,
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_26,
  },
  genres: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10 + 1,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    color: COLORS.White,
    textAlign: 'center',
    top: SPACING.space_14 * 2,
    fontSize: FONTSIZE.size_16,
  },
  overviewContainer: {
    marginHorizontal: SPACING.space_24,
    marginTop: SPACING.space_14 * 3,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.Yellow,
  },
});
