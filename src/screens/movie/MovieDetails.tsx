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
import {useIsFocused, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthTypes} from '@redux/reducers/authReducer';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  MARGIN,
  SPACING,
} from '@type/theme';
import firebase from 'firebase/compat';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');
export default function MovieDetails({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const [movieData, setMovieData] = useState<any>();
  const [movieCastData, setMovieCastData] = useState<any>();
  const [similarData, setSimilar] = useState<any>();
  const [trailerUrl, setTrailerUrl] = useState<any>();
  const [playing, setPlaying] = useState(false);
  const [modalTrailer, setModalTrailer] = useState<boolean>(false);
  const [modalComment, setModalComment] = useState<boolean>(false);
  const [comment, setComment] = useState<any>();
  const [commentData, setCommentData] = useState<any>();
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  const [dataUser, setDataUser] = useState<any>();
  const uid = useSelector((state: AuthTypes) => state?.uid);
  const data = route.params;
  const SeparatorComponent = () => {
    return <View style={{width: 10}} />;
  };
  const movieId = movieData?.id;
  const getInfo = async () => {
    if (uid) {
      try {
        firebase
          .database()
          .ref(`users/${uid}`)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              setDataUser(data?.displayName);
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

  useEffect(() => {
    getInfo();
    getComments();
  }, [isFocused]);
  const closeModal = () => {
    setModalComment(!modalComment);
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
  const getComments = async () => {
    if (uid) {
      try {
        firebase
          .database()
          .ref(`users/comments/`)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              const dataArray = Object.values(data);
              setCommentData(dataArray);
              console.log('data:', dataArray);
            } else {
              console.log('No data.');
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const commentUser = async () => {
    try {
      await firebase.database().ref(`users/comments/`).push({
        userName: dataUser,
        movieId: movieId,
        comment: comment,
      });
      setComment('');
      setModalComment(!modalComment);
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
  }, [isFocused]);
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
    <View style={styles.container}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalComment}
            onRequestClose={() => {
              setModalComment(!modalComment);
            }}>
            <TouchableWithoutFeedback>
              <View style={styles.viewCentered}>
                <View style={styles.modal}>
                  <Text style={{...styles.title, fontSize: 20}}>
                    Write your reviews here:
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    editable={true}
                    defaultValue={comment}
                    onChangeText={comment => setComment(comment)}
                    maxLength={500}
                    keyboardType="default"
                  />

                  <View style={{flexDirection: 'row', gap: 20, paddingTop: 50}}>
                    <TouchableOpacity
                      onPress={() => {
                        closeModal();
                      }}
                      style={[styles.buttonModal, styles.buttonClose]}>
                      <Text
                        style={{
                          ...styles.title,
                          fontSize: 20,
                          color: COLORS.White,
                        }}>
                        Close
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonModal, styles.buttonSave]}
                      onPress={() => commentUser()}>
                      <Text
                        style={{...styles.title, fontSize: 20, color: 'white'}}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalTrailer}
            onRequestClose={() => {
              setModalTrailer(!modalTrailer);
            }}>
            <View style={{flex: 1}}>
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
                      <CustomIcon
                        name="close"
                        size={40}
                        color={COLORS.Orange}
                      />
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
            </View>
          </Modal>
          <ImageBackground
            style={styles.imageBG}
            source={{
              uri: baseImagePath('w780', movieData?.backdrop_path),
            }}>
            <View>
              <View style={styles.iconHeader}>
                <IconHeader
                  name="arrow-left"
                  action={() => navigation.goBack()}
                />
              </View>
            </View>
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
            showsHorizontalScrollIndicator={false}
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
          <Text
            style={{
              color: COLORS.White,
              fontSize: FONTSIZE.size_18,
              fontFamily: FONTTFAMILY.poppins_semibold,
              marginLeft: MARGIN.margin_20 * 2,
              marginBottom: MARGIN.margin_14,
            }}>
            Reviews
          </Text>
          {commentData &&
            commentData.length > 0 &&
            commentData
              .filter((item: any) => item.movieId === movieId)
              .map((item: any, index: any) => (
                <View key={index.toString()}>
                  <Text
                    style={{
                      color: COLORS.White,
                      fontSize: FONTSIZE.size_16,
                      marginLeft: 20 * 2,
                      fontFamily: FONTTFAMILY.poppins_regular,
                      textAlign: 'justify',
                    }}>
                    {item.userName.toUpperCase()}
                  </Text>
                  <Text style={styles.comments}>{item.comment}</Text>
                </View>
              ))}
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setModalComment(!modalComment)}>
              <Text style={styles.buttonText}>Comment</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                const releaseDate = new Date(movieData.release_date);
                const currentYear = new Date('2023-05-08');
                if (releaseDate > currentYear) {
                  navigation.navigate(APP_SCREEN.BOOKING, {
                    BgImage: baseImagePath('w780', movieData.backdrop_path),
                    PosterImage: baseImagePath(
                      'original',
                      movieData.poster_path,
                    ),
                    MovieName: movieData?.original_title,
                  });
                } else {
                  Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error',
                    text2: 'Unavailable',
                    visibilityTime: 1000,
                    autoHide: true,
                    topOffset: 50,
                  });
                }
              }}>
              <Text style={styles.buttonText}>Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
  title: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: 26,
    color: COLORS.Black,
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
    marginLeft: 20,
    marginRight: 30,
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

  buttonSave: {
    backgroundColor: COLORS.Black,
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
  buttonClose: {
    backgroundColor: COLORS.Black,
  },
  textInput: {
    marginTop: MARGIN.margin_10,
    padding: SPACING.space_10,
    borderRadius: 25,
    backgroundColor: '#f7f8fb',
    width: width - 100,
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: 18,
  },
  viewCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MARGIN.margin_22,
  },
  modal: {
    backgroundColor: COLORS.White,
    borderRadius: BORDERRADIUS.radius_20,
    padding: SPACING.space_36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 50,
  },
  comments: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    marginLeft: MARGIN.margin_20,
    marginBottom: MARGIN.margin_10,
    color: COLORS.White,
  },
});
