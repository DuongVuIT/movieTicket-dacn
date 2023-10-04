import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import CustomIcon from './CustomIcon';

const SubCardMovie = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.cardMovieFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAtEnd
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
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
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
});

export default SubCardMovie;
