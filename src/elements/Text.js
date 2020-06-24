/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { theme } from '../constants';

export default function Typography(props) {
  const {
    h1,
    h2,
    h3,
    title,
    body,
    caption,
    small,
    size,
    transform,
    align,
    // estilos
    regular,
    bold,
    medium,
    weight,
    light,
    stylized,
    center,
    right,
    spacing, // letter-spacing
    height, // line-height
    // colors
    color,
    primary,
    secondary,
    tertiary,
    white,
    gray,
    gray2,
    style,
    children,
  } = props;

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    title && styles.title,
    body && styles.body,
    caption && styles.caption,
    small && styles.small,
    size && { fontSize: size },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    medium && styles.medium,
    light && styles.light,
    stylized && styles.stylized,
    center && styles.center,
    right && styles.right,
    color && styles[color],
    color && !styles[color] && { color },
    // color shortcuts
    primary && styles.primary,
    secondary && styles.secondary,
    tertiary && styles.tertiary,
    white && styles.white,
    gray && styles.gray,
    gray2 && styles.gray2,
    style, // rewrite predefined styles
  ];

  const [fontsLoaded] = useFonts({
    'LilyScriptOne-Regular': require('../assets/fonts/LilyScriptOne-Regular.ttf'),
    'Mada-Light': require('../assets/fonts/Mada-Light.ttf'),
    'Mada-Medium': require('../assets/fonts/Mada-Medium.ttf'),
    'Mada-Regular': require('../assets/fonts/Mada-Light.ttf'),
    'Mada-Bold': require('../assets/fonts/Mada-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Text style={textStyles}>{children}</Text>;
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.white,
    fontFamily: 'Mada-Regular',
  },
  // variations
  stylized: {
    fontFamily: 'LilyScriptOne-Regular',
  },
  regular: {
    fontFamily: 'Mada-Regular',
  },
  bold: {
    fontFamily: 'Mada-Bold',
  },
  medium: {
    fontFamily: 'Mada-Medium',
  },
  light: {
    fontFamily: 'Mada-Light',
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  primary: { color: theme.colors.primary },
  secondary: { color: theme.colors.secondary },
  tertiary: { color: theme.colors.tertiary },
  white: { color: theme.colors.white },
  gray: { color: theme.colors.gray },
  gray2: { color: theme.colors.gray2 },
  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small,
});
