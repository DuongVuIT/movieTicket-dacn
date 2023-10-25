import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import CustomIcon from './CustomIcon';
import {useTranslation} from 'react-i18next';

const InputHeader = (props: any) => {
  const {t} = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={`${t('Search your movies')}`}
        placeholderTextColor={COLORS.White}
        onChangeText={value => setSearchText(value)}
        value={searchText}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <CustomIcon name="search" size={18} color={COLORS.White} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: SPACING.space_20,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_12,
    borderWidth: 3,
    borderColor: COLORS.WhiteRGBA15,
    borderRadius: BORDERRADIUS.radius_24,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    fontFamily: FONTTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});
export default InputHeader;
