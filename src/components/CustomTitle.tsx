import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {COLORS, FONTSIZE, FONTTFAMILY, SPACING} from '@type/theme';
import ThemeContext from '@context/ThemeContext';

const CustomTitle = (props: any) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    textTitle: {
      fontFamily: FONTTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_18,
      color: theme === 'dark' ? 'white' : 'black',
      paddingHorizontal: SPACING.space_36,
      paddingVertical: SPACING.space_28,
    },
  });
  return (
    <View>
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  );
};

export default CustomTitle;
