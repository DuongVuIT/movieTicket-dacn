import {DimensionValue} from 'react-native';

interface Spacing {
  space_2: number;
  space_4: number;
  space_6: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_14: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_22: number;
  space_24: number;
  space_26: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_34: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_6: 6,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_14: 14,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_22: 22,
  space_24: 24,
  space_26: 26,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_34: 34,
  space_36: 36,
};

interface Color {
  Black: string;
  White: string;
  Gray: string;
  Red: string;
  Green: string;
  Blue: string;
  Yellow: string;
  Purple: string;
  Pink: string;
  Orange: string;
  Cyan: string;
  BlackRGB10: string;
  WhiteRGBA75: string;
  WhiteRGBA50: string;
  WhiteRGBA32: string;
  WhiteRGBA15: string;
  OrangeRGBA0: string;
  DarkGrey: string;
}
export const COLORS: Color = {
  Black: '#000000',
  White: '#FFFFFF',
  Gray: '#CCCCCC',
  Red: '#FF0000',
  Green: '#00FF00',
  Blue: '#0000FF',
  Yellow: '#FFFF00',
  Purple: '#800080',
  Pink: '#FFC0CB',
  Orange: '#FFA500',
  Cyan: '#00FFFF',
  BlackRGB10: 'rgba(0, 0, 0, 0.1)',
  WhiteRGBA75: 'rgba(255, 255, 255, 0.75)',
  WhiteRGBA50: 'rgba(255, 255, 255, 0.5)',
  WhiteRGBA32: 'rgba(255, 255, 255, 0.32)',
  WhiteRGBA15: 'rgba(255, 255, 255, 0.15)',
  OrangeRGBA0: 'rgba(255, 165, 0, 0)',
  DarkGrey: '#333333',
};
interface Fontsize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_22: number;
  size_24: number;
  size_26: number;
  size_28: number;
  size_30: number;
}

export const FONTSIZE: Fontsize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_22: 22,
  size_24: 24,
  size_26: 26,
  size_28: 28,
  size_30: 30,
};

interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
}
export const FONTTFAMILY: FontFamily = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};
interface BorderRadius {
  radius_4: number;
  radius_6: number;
  radius_8: number;
  radius_10: number;
  radius_12: number;
  radius_14: number;
  radius_16: number;
  radius_18: number;
  radius_20: number;
  radius_22: number;
  radius_24: number;
  radius_26: number;
  radius_28: number;
  radius_30: number;
  radius_32: number;
  radius_34: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_6: 6,
  radius_8: 8,
  radius_10: 10,
  radius_12: 12,
  radius_14: 14,
  radius_16: 16,
  radius_18: 18,
  radius_20: 20,
  radius_22: 22,
  radius_24: 24,
  radius_26: 26,
  radius_28: 28,
  radius_30: 30,
  radius_32: 32,
  radius_34: 34,
};

interface Margin {
  margin_0: number;
  margin_2: number;
  margin_4: number;
  margin_6: number;
  margin_8: number;
  margin_10: number;
  margin_12: number;
  margin_14: number;
  margin_16: number;
  margin_18: number;
  margin_20: number;
  margin_22: number;
  margin_24: number;
  margin_26: number;
  margin_28: number;
  margin_30: number;
  margin_32: number;
  margin_34: number;
  margin_36: number;
  margin_38: number;
  margin_40: number;
  margin_42: number;
  margin_44: number;
  margin_46: number;
  margin_48: number;
  margin_50: number;
}
export const MARGIN: Margin = {
  margin_0: 0,
  margin_2: 2,
  margin_4: 4,
  margin_6: 6,
  margin_8: 8,
  margin_10: 10,
  margin_12: 12,
  margin_14: 14,
  margin_16: 16,
  margin_18: 18,
  margin_20: 20,
  margin_22: 22,
  margin_24: 24,
  margin_26: 26,
  margin_28: 28,
  margin_30: 30,
  margin_32: 32,
  margin_34: 34,
  margin_36: 36,
  margin_38: 38,
  margin_40: 40,
  margin_42: 42,
  margin_44: 44,
  margin_46: 46,
  margin_48: 48,
  margin_50: 50,
};

interface Percent {
  percent_25: DimensionValue;
  percent_50: DimensionValue;
  percent_75: DimensionValue;
  percent_100: DimensionValue;
}
export const PERCENT: Percent = {
  percent_25: '25%',
  percent_50: '50%',
  percent_75: '75%',
  percent_100: '100%',
};
