import ThemeContext from '@context/ThemeContext';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CustomHeader = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      marginTop: SPACING.space_20,
      paddingVertical: SPACING.space_12,
      borderColor: COLORS.WhiteRGBA15,
      borderRadius: BORDERRADIUS.radius_24,
    },
    textHeader: {
      color: theme === 'dark' ? 'white' : 'black',
      fontSize: FONTSIZE.size_24,
      fontFamily: FONTTFAMILY.poppins_regular,
      textAlign: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Lottie Movie</Text>
    </View>
  );
};

export default CustomHeader;
