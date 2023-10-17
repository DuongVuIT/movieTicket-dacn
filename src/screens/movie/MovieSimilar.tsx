import {
  baseImagePath,
  castDetails,
  movieDetails,
  movieSimilar,
  movieTrailers,
} from '@api/apiCall';
import CastCard from '@components/CastCard';
import CustomIcon from '@components/CustomIcon';
import CustomTitle from '@components/CustomTitle';
import IconHeader from '@components/IconHeader';
import SubCardMovie from '@components/SubCardMovie';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import YoutubePlayer from 'react-native-youtube-iframe';
const {width} = Dimensions.get('window');
export default function MovieSimilar({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const [movieData, setMovieData] = useState<any>();
  const [movieCastData, setMovieCastData] = useState<any>();
  const [similarData, setSimilar] = useState<any>();
  const [trailerUrl, setTrailerUrl] = useState<any>();
  const [playing, setPlaying] = useState(false);
  const [modalTrailer, setModalTrailer] = useState(false);
  const route = useRoute<any>();
  const data = route.params;
  const SeparatorComponent = () => {
    return <View style={{width: 10}} />;
  };
  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);
  const getMovieTrailer = async (movieId: number) => {
    try {
      let response = await fetch(movieTrailers(movieId));
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

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

  const getMovieSimilar = async (movieId: number) => {
    try {
      let response = await fetch(movieSimilar(movieId));
      let json = await response.json();
      setSimilar(json.results);
    } catch (error) {
      console.log(error);
    }
  };
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(data?.movieId);
      setMovieData(tempMovieData);
    })();
    (async () => {
      const tempMovieTrailer = await getMovieTrailer(data?.movieId);
      const trailerKey = tempMovieTrailer?.videos?.results[0]?.key;
      setTrailerUrl(trailerKey);
    })();
    (async () => {
      const tempMovieCastData = await getMovieCastDetails(data?.movieId);
      setMovieCastData(tempMovieCastData?.cast);
    })();
    getMovieSimilar(data?.movieId);
  }, []);
  if (!similarData && !movieData && !movieCastData && !trailerUrl) {
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
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTrailer}
          onRequestClose={() => {
            setModalTrailer(!modalTrailer);
          }}>
          <TouchableOpacity style={{flex: 1}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 20,
                    paddingTop: 10,
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalTrailer(!modalTrailer)}>
                    <CustomIcon name="close" size={40} color={COLORS.Orange} />
                  </TouchableOpacity>
                </View>
                <View>
                  <YoutubePlayer
                    width={width - 30}
                    height={width + 250}
                    play={playing}
                    videoId={trailerUrl}
                    onChangeState={onStateChange}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
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
        <TouchableOpacity
          onPress={() => {
            setModalTrailer(!modalTrailer);
            togglePlaying;
          }}
          style={styles.button}>
          <Image
            style={{
              flex: 1,

              height: 60,
              width: 60,
              resizeMode: 'cover',
              borderRadius: 30,
            }}
            source={require('@assets/image/youtube.jpg')}
          />
        </TouchableOpacity>
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
          {movieData?.genres?.map((item: any) => {
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
            {movieData?.vote_average?.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.time}>
            {movieData?.release_date?.substring(8, 10)}{' '}
            {new Date(movieData?.release_date).toLocaleDateString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date?.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.overview}>{movieData?.overview}</Text>
      </View>
      <View>
        <CustomTitle title="Top Cast" />
        <View>
          <FlatList
            data={movieCastData}
            keyExtractor={(item: any) => item.id}
            horizontal
            renderItem={({item, index}) => (
              <CastCard
                action={() => {
                  navigation.navigate(APP_SCREEN.CASTDETAILS, {
                    castId: item?.id,
                  });
                }}
                cardWidth={90}
                firstCard={index === 0 ? true : false}
                lastCard={index == movieCastData?.length - 1 ? true : false}
                imagePath={baseImagePath('w342', item.profile_path)}
                title={item.original_name}
                subtitle={item.character}
              />
            )}
            ItemSeparatorComponent={SeparatorComponent}
          />
        </View>
      </View>
      <View>
        <CustomTitle title={'Movie Similar'} />
        <FlatList
          data={similarData}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.contentContainer}
          horizontal
          renderItem={({item, index}) => (
            <SubCardMovie
              shouldMarginatedAtEnd={true}
              cardMovieFunction={() => {
                navigation.navigate(APP_SCREEN.MOVIE_SIMILAR, {
                  movieId: item.id,
                });
              }}
              cardWidth={width / 3}
              firstCard={index == 0 ? true : false}
              lastCard={index == similarData?.length ? true : false}
              title={item.original_title}
              imagaPath={baseImagePath('w342', item.poster_path)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() =>
            navigation.navigate(APP_SCREEN.BOOKING, {
              BgImage: baseImagePath('w780', movieData.backdrop_path),
              PosterImage: baseImagePath('original', movieData.poster_path),
              MovieName: movieData?.original_title,
            })
          }>
          <Text style={styles.buttonText}>Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.GrayRGBA,
  },
  loadingIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    padding: 10,
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
  overview: {
    marginTop: SPACING.space_10,
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'justify',
  },
  contentContainer: {
    gap: SPACING.space_36,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: SPACING.space_10,
    padding: SPACING.space_20,
    marginBottom: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.Black,
  },
  buttonText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTTFAMILY.poppins_regular,
    color: COLORS.White,
  },
  subText: {
    fontFamily: 'nunito-regular',
    fontSize: 14,
    color: COLORS.White,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    marginTop: 100,
    borderRadius: 20,
    padding: 10,
    margin: 20,
  },
});
