import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import {ImageBackground} from 'react-native';

const CustomHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Lottie Movie</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: SPACING.space_20,
    paddingVertical: SPACING.space_12,

    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_24,
  },
  textHeader: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTTFAMILY.poppins_regular,
    textAlign: 'center',
  },
});
export default CustomHeader;
