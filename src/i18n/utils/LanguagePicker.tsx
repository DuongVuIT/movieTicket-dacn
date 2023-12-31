import ThemeContext from '@context/ThemeContext';
import {
  BORDERRADIUS,
  FONTSIZE,
  FONTTFAMILY,
  MARGIN,
  SPACING,
} from '@type/theme';
import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const LanguagePicker = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {i18n} = useTranslation();
  interface languagesType {
    name: string;
    label: string;
  }
  const languages = [
    {
      name: 'en',
      label: 'English',
    },
    {
      name: 'vi',
      label: 'Vietnamese',
    },
    {
      name: 'th',
      label: 'Thailand',
    },
    {
      name: 'fr',
      label: 'French',
    },
    {
      name: 'kr',
      label: 'Korean',
    },
    {
      name: 'ch',
      label: 'Chinese',
    },
  ];
  const LanguageItem = ({name, label}: languagesType) => (
    <Pressable
      style={styles.button}
      onPress={() => {
        i18n.changeLanguage(name);
        setModalVisible(!modalVisible);
      }}>
      <Text style={styles.textStyle}>{label}</Text>
    </Pressable>
  );
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: theme === 'dark' ? 'white' : 'black',
      borderRadius: BORDERRADIUS.radius_20 * 2,
      padding: SPACING.space_10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      borderRadius: BORDERRADIUS.radius_10,
      padding: SPACING.space_10,
      marginLeft: MARGIN.margin_10,
      color: theme === 'dark' ? 'black' : 'white',
    },
    buttonOpen: {
      backgroundColor: theme === 'dark' ? 'white' : 'black',
    },
    textStyle: {
      color: theme === 'dark' ? 'black' : 'white',
      fontSize: FONTSIZE.size_14,
      fontFamily: FONTTFAMILY.poppins_regular,
      textAlign: 'center',
    },
  });

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {languages.map(lang => (
              <LanguageItem {...lang} key={lang.name} />
            ))}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>{i18n.language}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguagePicker;
