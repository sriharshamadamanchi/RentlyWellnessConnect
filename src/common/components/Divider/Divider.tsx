import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  dividerStyle: {
    height: 1,
    borderRadius: 10,
    opacity: 0.3,
    backgroundColor: theme.colors.divider
  }
});

interface dividerType {
    style ?: any
  }

export const Divider = ({ style }: dividerType) => {
  return (
    <View style = {[styles.dividerStyle, style]} />
  );
};
