import {
  baseImagePath,
  nowPlaying,
  popular,
  topRated,
  upComming,
} from '@api/apiCall';
import CardMovie from '@components/CardMovie';
import CustomHeader from '@components/CustomHeader';

import CustomTitle from '@components/CustomTitle';
import InputHeader from '@components/InputHeader';
import SubCardMovie from '@components/SubCardMovie';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [keys, setKeys] = useState([]);
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
      setNowPlayingMovieList([
        {id: 'zun01'},
        ...nowPlayIng.results,
        {id: 'zun02'},
      ]);
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
    !nowPlayingMovieList &&
    !popularMovieList &&
    !topRatedMovieList &&
    !upCommingMovieList
  ) {
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.scollContainer}>
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
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scollContainer}>
      <View style={styles.inputHeaderContainer}>
        <CustomHeader />
      </View>
      <CustomTitle title={'Now Playing'} />
      <FlatList
        data={nowPlayingMovieList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.contentContainer}
        decelerationRate={0}
        snapToInterval={width * 0.7 + SPACING.space_36}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => {
          if (!item.original_title) {
            return (
              <View
                style={{
                  width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2,
                }}></View>
            );
          }
          return (
            <CardMovie
              shouldMarginatedAtEnd={false}
              cardMovieFunction={() => {
                navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {
                  movieId: item.id,
                });
              }}
              cardWidth={width * 0.7}
              firstCard={index == 0 ? true : false}
              lastCard={index == nowPlayingMovieList?.length ? true : false}
              title={item.original_title}
              imagaPath={baseImagePath('w780', item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average.toFixed(2)}
              vote_count={item.vote_count}
            />
          );
        }}
      />
      <CustomTitle title={'Popular'} />
      <FlatList
        data={popularMovieList}
        showsHorizontalScrollIndicator={false}
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
            genre={item.genre_ids.slice(1, 4)}
            vote_average={item.vote_average}
            vote_count={item.vote_count}
          />
        )}
      />
      <CustomTitle title={'Up comming'} />
      <FlatList
        data={upCommingMovieList}
        showsHorizontalScrollIndicator={false}
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
            vote_average={item.vote_average}
            vote_count={item.vote_count}
          />
        )}
      />
      <CustomTitle title={'Top Rated'} />
      <FlatList
        data={topRatedMovieList}
        showsHorizontalScrollIndicator={false}
        bounces={false}
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
            vote_average={item.vote_average}
            vote_count={item.vote_count}
          />
        )}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GrayRGBA,
  },
  scollContainer: {
    backgroundColor: COLORS.GrayRGBA,
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
