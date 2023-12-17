import {baseImagePath, searchMovies} from '@api/apiCall';
import InputHeader from '@components/InputHeader';
import SubCardMovie from '@components/SubCardMovie';
import ThemeContext from '@context/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {APP_SCREEN, RootParamList} from '@type/navigation';
import {SPACING} from '@type/theme';
import React, {useContext, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
const {width} = Dimensions.get('screen');

export default function Search({
  navigation,
}: NativeStackScreenProps<RootParamList>) {
  const [searchList, setSearchList] = useState([]);
  const {theme} = useContext(ThemeContext);
  const searchMovieFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.log('error');
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? 'black' : 'white',
    },
    inputHeaderContainer: {
      marginHorizontal: SPACING.space_36,
      marginTop: SPACING.space_28,
    },
    contentContainer: {
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMovieFunction} />
            </View>
          }
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => (
            <SubCardMovie
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardMovieFunction={() => {
                navigation.navigate(APP_SCREEN.MOVIE_DETAIL, {
                  movieId: item.id,
                });
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagaPath={baseImagePath('w342', item.poster_path)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          )}
        />
      </View>
    </View>
  );
}
