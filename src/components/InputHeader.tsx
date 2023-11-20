import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  SPACING,
} from '@type/theme';
import React, {useContext, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import CustomIcon from './CustomIcon';
import {useTranslation} from 'react-i18next';
import ThemeContext from '@context/ThemeContext';

const InputHeader = (props: any) => {
  const {t} = useTranslation();
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [searchText, setSearchText] = useState<string>('');
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      marginTop: SPACING.space_20,
      paddingHorizontal: SPACING.space_24,
      paddingVertical: SPACING.space_12,
      borderWidth: 3,
      borderColor: theme === 'dark' ? 'white' : 'black',
      borderRadius: BORDERRADIUS.radius_24,
      flexDirection: 'row',
    },
    textInput: {
      width: '90%',
      fontFamily: FONTTFAMILY.poppins_regular,
      fontSize: FONTSIZE.size_14,
      color: theme === 'dark' ? 'white' : 'black',
    },
    searchIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: SPACING.space_10,
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={`${t('Search your movies')}`}
        placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
        onChangeText={value => setSearchText(value)}
        value={searchText}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <CustomIcon
          name="search"
          size={18}
          color={theme === 'dark' ? 'white' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputHeader;
