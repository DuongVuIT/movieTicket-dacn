import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootParamList} from '@type/navigation';
import {COLORS, SPACING} from '@type/theme';
import {ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import 'firebase/compat/auth';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  upComming,
  popular,
  topRated,
  nowPlaying,
  baseImagePath,
} from '@api/apiCall';
import InputHeader from '@components/InputHeader';
import {StatusBar} from 'react-native';
import CustomTitle from '@components/CustomTitle';

const {width, height} = Dimensions.get('window');

export default function Home({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
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
      setNowPlayingMovieList(nowPlayIng.results);
      let popularMovie = await getPopularMovieList();
      setPopularMovieList(popularMovie.results);
      let topRatedMovie = await getTopRatedMovieList();
      setTopRatedMovieList(topRatedMovie.results);
      let upCommingMovie = await getUpCommingMovieList();
      setUpCommingMovieList(upCommingMovie.results);
    })();
  }, []);
  console.log('nowplaying :', nowPlayingMovieList);
  console.log('popular :', popularMovieList);
  console.log('topRated :', topRatedMovieList);
  console.log('upComming :', upCommingMovieList);
  const searchMovieFunction = () => {
    navigation.navigate('Search');
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
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scollContainer}>
      <StatusBar hidden />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchMovie={searchMovieFunction} />
      </View>
      <CustomTitle title={'Now Playing'} />
      <CustomTitle title={'Popular'} />
      <CustomTitle title={'Up comming'} />
      <CustomTitle title={'Top Rated'} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  scollContainer: {
    flex: 1,
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
});
