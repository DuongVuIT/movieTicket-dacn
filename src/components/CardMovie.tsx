import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from './CustomIcon';

const genres: any = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10769: 'Western',
  39: 'Animation',
};

const CardMovie = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardMovieFunction()}>
      <View
        style={[
          styles.container,
          props.Margin
            ? props.firstCard
              ? {marginLeft: SPACING.space_36}
              : props.lastCard
              ? {marginRight: SPACING.space_36}
              : {}
            : {},
          props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
          {maxWidth: props.cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{uri: props.imagaPath}}
        />

        <View>
          <View style={styles.rateContainer}>
            <CustomIcon name="star" style={styles.iconStyle} />
            <Text style={styles.voteText}>
              {props.vote_average}({props.vote_count})
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.textTitle}>
            {props.title}
          </Text>
          <View style={styles.genreContainer}>
            {props.genre.map((item: any) => {
              return (
                <View key={item} style={styles.genreBox}>
                  <Text style={styles.genreText}>{genres[item]}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_20,
  },
  textTitle: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  iconStyle: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  voteText: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'center',
  },
  release: {
    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    textAlign: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_26,
  },
  genreText: {
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA75,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default CardMovie;
