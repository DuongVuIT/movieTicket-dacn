import {baseImagePath} from '@api/apiCall';
import CustomTitle from '@components/CustomTitle';
import IconHeader from '@components/IconHeader';
import MovieCard from '@components/MovieCard';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthTypes} from '@redux/reducers/authReducer';
import {RootParamList} from '@type/navigation';
import {COLORS, SPACING} from '@type/theme';
import firebase from 'firebase/compat';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Dimensions, ScrollView} from 'react-native';
import {FlatList} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');
const MyTicket = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const uid = useSelector((state: AuthTypes) => state?.uid);
  const idticket = useSelector((state: AuthTypes) => state?.ticketId);
  console.log('id', idticket);
  console.log(uid);
  const [movieData, setMovieData] = useState<any[]>();
  const isFocused = useIsFocused();
  useEffect(() => {
    getDataTicket();
  }, [isFocused]);
  const getDataTicket = async () => {
    try {
      const snapshot = await firebase
        .database()
        .ref(`users/${uid}/tickets`)
        .once('value');
      if (snapshot) {
        const dataMovies = snapshot.val();
        const movieArray = Object.values(dataMovies);
        setMovieData(movieArray);
      } else {
        console.log('Not found dataMove');
      }
    } catch (error) {
      console.log('Erro when get data from firebase');
    }
  };
  console.log('dataMovie', movieData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconHeader}>
        <IconHeader name="arrow-left" action={() => navigation.goBack()} />
      </View>

      <FlatList
        data={movieData}
        keyExtractor={(item: any) => item.id?.toString()}
        renderItem={({item}) => {
          return (
            <MovieCard
              key={item.idticket}
              cardWidth={width}
              imagaPath={item.image}
              mall={item.mall}
              vote_average={item.vote_average}
              movieName={item.movieName}
              userName={item.userName}
              seat={item.seat}
              time={item.time}
              date={item.date}
              districts={item.districts}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GrayRGBA,
  },
  iconHeader: {
    marginHorizontal: SPACING.space_36,
  },
  scollContainer: {
    backgroundColor: COLORS.GrayRGBA,
  },
});
export default MyTicket;
