import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTSIZE,
  FONTTFAMILY,
  MARGIN,
  SPACING,
} from '@type/theme';

const LanguagePicker = () => {
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
  ];
  const LanguageItem = ({name, label}: {name: string; label: string}) => (
    <Pressable
      style={styles.button}
      onPress={() => {
        i18n.changeLanguage(name);
        setModalVisible(!modalVisible);
      }}>
      <Text style={styles.textStyle}>{label}</Text>
    </Pressable>
  );
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: BORDERRADIUS.radius_20 * 2,
    padding: SPACING.space_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_10,
    marginLeft: MARGIN.margin_10,
  },
  buttonOpen: {
    backgroundColor: COLORS.White,
  },
  textStyle: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTTFAMILY.poppins_regular,
    textAlign: 'center',
  },
});

export default LanguagePicker;
