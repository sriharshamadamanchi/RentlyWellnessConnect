// @flow Copyright © 2019 Rently Softwares, All Rights Reserved
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { Ripple } from '../Ripple/Ripple';

const styles = StyleSheet.create({
  cardStyle: {
    // flex: 1,
    backgroundColor: theme.colors.background.default,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginVertical: moderateScale(8),

  },
  cardShadowStyle: {
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  }
});

interface cardType {
  onPress?: ()=>void,
  onLongPress?: ()=>void,
  children: any,
  style?: any | Array<any>,
  disabled?: boolean,
  useRipple?: boolean,
  testID?: string,
  accessibilityLabel?: string
};

export const Card = ({ children, disabled, onPress, onLongPress, useRipple = true, style, testID, accessibilityLabel }: cardType) => {
  if (disabled) {
    return (<TouchableOpacity
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
      disabled = {disabled}
      onPress = {onPress}
      onLongPress = {onLongPress}
      style = {[styles.cardStyle, styles.cardShadowStyle, style]}>
      {children}
    </TouchableOpacity>);
  }

  if (useRipple) {
    return ( <Ripple
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
      rippleContainerBorderRadius = {{ ...styles.cardStyle, ...styles.cardShadowStyle }.borderRadius}
      onPress = {onPress}
      onLongPress = {onLongPress}
      style = {[styles.cardStyle, styles.cardShadowStyle, style]}>
      {children}
    </Ripple>
    );
  }

  return (
    <TouchableOpacity
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
      onPress = {onPress}
      onLongPress = {onLongPress}
      style = {[styles.cardStyle, styles.cardShadowStyle, style]}>
      {children}
    </TouchableOpacity>
  );
};
