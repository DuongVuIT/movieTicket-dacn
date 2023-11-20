import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomIcon from './CustomIcon';
import ThemeContext from '@context/ThemeContext';

const SubCardMovie = (props: any) => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardImage: {
      aspectRatio: 2 / 3,
      borderRadius: BORDERRADIUS.radius_20,
    },
    textTitle: {
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_16,
      color: theme === 'dark' ? 'white' : 'black',
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
      color: theme === 'dark' ? 'white' : 'black',
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

  return (
    <TouchableOpacity onPress={() => props.cardMovieFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAtEnd
            ? props.firstCard
              ? {marginLeft: SPACING.space_20}
              : props.lastCard
              ? {marginRight: SPACING.space_20}
              : {}
            : {},
          props.shouldMarginatedAround ? {margin: SPACING.space_10} : {},
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

export default SubCardMovie;
