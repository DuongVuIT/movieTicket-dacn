import IconHeader from '@components/IconHeader';
import MovieCard from '@components/MovieCard';
import ThemeContext from '@context/ThemeContext';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthTypes} from '@redux/reducers/authReducer';
import {RootParamList} from '@type/navigation';
import {COLORS, SPACING} from '@type/theme';
import firebase from 'firebase/compat';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');
const MyTicket = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const uid = useSelector((state: AuthTypes) => state?.uid);
  const idticket = useSelector((state: AuthTypes) => state?.ticketId);
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
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    iconHeader: {
      marginHorizontal: SPACING.space_36,
    },
    scollContainer: {
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconHeader}>
        <IconHeader name="arrow-left" action={() => navigation.goBack()} />
      </View>

      <FlatList
        data={movieData}
        keyExtractor={(item: any, index: number) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <MovieCard
              key={index}
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

export default MyTicket;
