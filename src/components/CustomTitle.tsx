import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE, FONTTFAMILY, SPACING} from '@type/theme';

const CustomTitle = (props: any) => {
  return (
    <View>
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    fontFamily: FONTTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
    paddingHorizontal: SPACING.space_36,
    paddingVertical: SPACING.space_28,
  },
});
export default CustomTitle;
