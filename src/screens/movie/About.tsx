import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconHeader from '@components/IconHeader';
import {RootParamList} from '@type/navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {COLORS, SPACING} from '@type/theme';

const About = ({navigation}: NativeStackScreenProps<RootParamList>) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconHeader}>
        <IconHeader name="arrow-left" action={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.GrayRGBA,
  },
  iconHeader: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_24 * 2,
  },
});
export default About;
