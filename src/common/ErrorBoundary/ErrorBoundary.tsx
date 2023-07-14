// @flow Copyright © 2019 Rently Softwares, All Rights Reserved
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../theme';
import { Label } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    paddingTop:moderateScale(30),
    alignItems: "center",
    justifyContent: 'space-evenly'
  }
});

const Error =() => {

  return (
    <View style = {styles.container}>
        <Label xl title='Something Went Wrong' />
    </View>
  );
};

class ErrorBoundaryComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): any {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (__DEV__) {
      console.error("Error Boundry Error", error);
    } else {
      console.error("Error Boundry Error", error);
    }
  }

  render(): any {
    if (this.state.hasError) {
      return (
        <Error/>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = ErrorBoundaryComponent;
