// @flow Copyright © 2019 Rently Softwares, All Rights Reserved

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
  viewStyle: {
    position:"absolute",
    zIndex:100,
    elevation: 100,
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  }
});

export const LoadingIndicator = ({ loading, color }: {loading: boolean, color?: string}) => {
  if (loading){
    return (
      <View style = {styles.viewStyle}>
        <ActivityIndicator  size = "large" animating = {loading} color = {color} />
      </View>
    );
  }

  return null;
};

LoadingIndicator.defaultProps={
  color: "#373B44"
};
