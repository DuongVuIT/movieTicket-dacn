import {
  baseImagePath,
  nowPlaying,
  popular,
  topRated,
  upComming,
} from '@api/apiCall';
import CardMovie from '@components/CardMovie';
import CustomTitle from '@components/CustomTitle';
import InputHeader from '@components/InputHeader';
import SubCardMovie from '@components/SubCardMovie';
import {useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {COLORS, SPACING} from '@type/theme';
import 'firebase/compat/auth';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const {width} = Dimensions.get('window');

export default function Home({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const route = useRoute<any>();
  const {uid} = route.params;
  const [nowPlayingMovieList, setNowPlayingMovieList] = useState<any>();
  const [popularMovieList, setPopularMovieList] = useState<any>();
  const [topRatedMovieList, setTopRatedMovieList] = useState<any>();
  const [upCommingMovieList, setUpCommingMovieList] = useState<any>();
  const getNowPlayingMovieList = async () => {
    try {
      let response = await fetch(nowPlaying);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  console.log('home', uid);
  const getPopularMovieList = async () => {
    try {
      let response = await fetch(popular);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const getTopRatedMovieList = async () => {
    try {
      let response = await fetch(topRated);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };
  const getUpCommingMovieList = async () => {
    try {
      let response = await fetch(upComming);
      let json = await response.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      let nowPlayIng = await getNowPlayingMovieList();
      setNowPlayingMovieList(nowPlayIng.results);
      let popularMovie = await getPopularMovieList();
      setPopularMovieList(popularMovie.results);
      let topRatedMovie = await getTopRatedMovieList();
      setTopRatedMovieList(topRatedMovie.results);
      let upCommingMovie = await getUpCommingMovieList();
      setUpCommingMovieList(upCommingMovie.results);
    })();
  }, []);

  const searchMovieFunction = () => {
    navigation.navigate(APP_SCREEN.SEARCH);
  };
  if (
    nowPlayingMovieList == undefined &&
    nowPlayingMovieList == null &&
    popularMovieList == undefined &&
    popularMovieList == null &&
    topRatedMovieList == undefined &&
    topRatedMovieList == null &&
    upCommingMovieList == undefined &&
    upCommingMovieList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scollContainer}>
        <StatusBar hidden />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchMovie={searchMovieFunction} />
        </View>
        <View style={styles.loadingIcon}>
          <ActivityIndicator size="large" color={COLORS.White} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      scrollEnabled
      style={styles.container}
      contentContainerStyle={styles.scollContainer}>
      <StatusBar hidden />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchMovie={searchMovieFunction} />
      </View>
      <CustomTitle title={'Now Playing'} />
      <FlatList
        data={popularMovieList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.contentContainer}
        horizontal
        renderItem={({item, index}) => (
          <CardMovie
            shouldMarginatedAtEnd={true}
            cardMovieFunction={() => {
              navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {movieId: item.id});
            }}
            cardWidth={width * 0.7}
            firstCard={index == 0 ? true : false}
            lastCard={index == upCommingMovieList?.length ? true : false}
            title={item.original_title}
            imagaPath={baseImagePath('w780', item.poster_path)}
            genre={item.genre_ids.slice(1, 4)}
            vote_average={item.vote_average}
            vote_count={item.vote_count}
          />
        )}
      />
      <CustomTitle title={'Popular'} />
      <FlatList
        data={popularMovieList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.contentContainer}
        horizontal
        renderItem={({item, index}) => (
          <SubCardMovie
            shouldMarginatedAtEnd={true}
            cardMovieFunction={() => {
              navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {movieId: item.id});
            }}
            cardWidth={width / 3}
            firstCard={index == 0 ? true : false}
            lastCard={index == upCommingMovieList?.length ? true : false}
            title={item.original_title}
            imagaPath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CustomTitle title={'Up comming'} />
      <FlatList
        data={upCommingMovieList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.contentContainer}
        horizontal
        renderItem={({item, index}) => (
          <SubCardMovie
            shouldMarginatedAtEnd={true}
            cardMovieFunction={() => {
              navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {movieId: item.id});
            }}
            cardWidth={width / 3}
            firstCard={index == 0 ? true : false}
            lastCard={index == upCommingMovieList?.length ? true : false}
            title={item.original_title}
            imagaPath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
      <CustomTitle title={'Top Rated'} />
      <FlatList
        data={topRatedMovieList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.contentContainer}
        horizontal
        renderItem={({item, index}) => (
          <SubCardMovie
            shouldMarginatedAtEnd={true}
            cardMovieFunction={() => {
              navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {movieId: item.id});
            }}
            cardWidth={width / 3}
            firstCard={index == 0 ? true : false}
            lastCard={index == upCommingMovieList?.length ? true : false}
            title={item.original_title}
            imagaPath={baseImagePath('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scollContainer: {
    backgroundColor: COLORS.Black,
  },
  loadingIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  contentContainer: {
    gap: SPACING.space_36,
  },
});
