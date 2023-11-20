import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import CustomIcon from './CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import ThemeContext from '@context/ThemeContext';

const IconHeader = (props: any) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SPACING.space_10,
    },
    iconStyle: {
      color: theme === 'dark' ? 'black' : 'white',
      fontSize: FONTSIZE.size_24,
    },
    headerText: {
      flex: 1,
      fontFamily: FONTTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_20,
      textAlign: 'center',
      color: theme === 'dark' ? 'white' : 'black',
    },
    emptyContainer: {
      height: SPACING.space_20 * 2,
      width: SPACING.space_20 * 2,
    },
    icon: {
      height: SPACING.space_20 * 2,
      width: SPACING.space_20 * 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDERRADIUS.radius_20,
      backgroundColor: theme === 'dark' ? 'white' : 'black',
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => props.action()}>
        <CustomIcon name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

export default IconHeader;
