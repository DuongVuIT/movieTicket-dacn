import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {COLORS, SPACING} from '@type/theme';
import {searchMovies} from '@api/apiCall';
import InputHeader from '@components/InputHeader';
const {width, height} = Dimensions.get('screen');
export default function Search() {
  const [searchList, setSearchList] = useState([]);

  const searchMovieFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={styles.contentContainer}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchMovie={searchMovieFunction} />
            </View>
          }
          renderItem={({item, index}) => (
            <SubCardMovie
              shouldMarginatedAtEnd={true}
              cardMovieFunction={() => {
                navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {
                  movieId: item.id,
                });
              }}
              cardWidth={width / 3}
              firstCard={index == 0 ? true : false}
              lastCard={index == upCommingMovieList?.length ? true : false}
              title={item.original_title}
              imagaPath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  inputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
});
