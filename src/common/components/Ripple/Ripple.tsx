import * as React from 'react';

import MaterialRipple from 'react-native-material-ripple';

interface rippleType {
    children: any,
    onPress?: ()=>void,
    onLongPress?: ()=>void,
    testID?: string,
    accessibilityLabel?: string,
    style?: any,
    disabled?: boolean,
    rippleOpacity?: number,
    rippleContainerBorderRadius?: number
};
export const Ripple = ({ children, testID, accessibilityLabel, ...rest }: rippleType) => {
  return (
    <MaterialRipple
      rippleOpacity = {0.09}
      rippleDuration = {600}
      rippleContainerBorderRadius = {50}
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
      {...rest}
    >
      {children}
    </MaterialRipple>
  );
};
