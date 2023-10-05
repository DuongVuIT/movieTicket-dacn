import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';

const CastCard = (props: any) => {
  return (
    <TouchableOpacity onPress={() => props.action()}>
      <View style={[styles.container, {maxWidth: props.cardWidth}]}>
        <Image
          source={{uri: props.imagePath}}
          style={[styles.cardImage, {width: props.cardWidth}]}
        />
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {props.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1 / 1,
    marginBottom: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_26 * 4,
  },
  title: {
    alignSelf: 'center',

    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  subtitle: {
    alignSelf: 'stretch',
    marginBottom: SPACING.space_20,

    fontFamily: FONTTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
});
export default CastCard;
