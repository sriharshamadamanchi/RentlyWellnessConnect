// @flow Copyright © 2019 Rently Softwares, All Rights Reserved
import React from 'react';
import { theme } from '../../theme';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';

const styles =  StyleSheet.create({
  buttonStyle:{
  },
  textStyle:{
    color: "#000000"
  },
  underLineStyle: {
    borderBottomWidth :1,
    borderBottomColor: "#000000"
  }
});
interface anchorButtonType {
  title: string,
  underline?: boolean,
  buttonStyle?: any,
  textStyle?: any,
  underLineStyleProp?: any,
  events?: string,
  onPress?: ()=>any,
  light?: boolean,
  regular?: boolean,
  medium?: boolean,
  bold?: boolean,
  xs?: boolean,
  s?: boolean,
  m?: boolean,
  l?: boolean,
  xl?: boolean,
  xxl?: boolean,
  testID?: string,
  disabled?: boolean,
  accessibilityLabel?: string
};

export const AnchorButton = ({
  title,
  underline = true,
  buttonStyle,
  textStyle,
  underLineStyleProp,
  events,
  onPress=() => {
  },
  light,
  regular,
  medium,
  bold,
  xs,
  s,
  m,
  l,
  xl,
  xxl,
  testID,
  disabled,
  accessibilityLabel
}: anchorButtonType): any => {
  // Default style

  const newStyle = {
    fontSize: theme.fontSizes.l,
    fontFamily: theme.fonts.medium
  };

  // Set font Style
  light && (newStyle.fontFamily = theme.fonts.light);
  regular && (newStyle.fontFamily = theme.fonts.regular);
  medium && (newStyle.fontFamily = theme.fonts.medium);
  bold && (newStyle.fontFamily = theme.fonts.bold);

  // Easily Set Font Sizes
  xs && (newStyle.fontSize = theme.fontSizes.xs);
  s && (newStyle.fontSize = theme.fontSizes.s);
  m && (newStyle.fontSize = theme.fontSizes.m);
  l && (newStyle.fontSize = theme.fontSizes.l);
  xl && (newStyle.fontSize = theme.fontSizes.xl);
  xxl && (newStyle.fontSize = theme.fontSizes.xxl);

  const underLineStyle = underline === true ? { ...styles.underLineStyle, ...underLineStyleProp } : {};
  const disableButtonStyle = disabled === true ? { opacity: 0.35 } : {};

  return (
    <TouchableOpacity
      disabled = {disabled}
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
      style = {{  ...underLineStyle, ...styles.buttonStyle, ...buttonStyle, ...disableButtonStyle }}
      onPress = {() => {
        onPress();
      }}
    >
      <Text maxFontSizeMultiplier = {1.2} style = {{ ...styles.textStyle, ...newStyle, ...textStyle }} >{title}</Text>
    </TouchableOpacity>
  );
};
