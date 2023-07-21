import * as React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Label } from '../../components';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from "react-redux"

const styles = StyleSheet.create({
  container: {
    zIndex:100,
    flexDirection: 'row',
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  "white",
    borderBlockEndColor: "black",
    borderBlockStartColor: "white",
    borderWidth: 0.5,
    opacity: 0.9,
  },
  iconStyle: {
    marginRight: moderateScale(10)
  },
  labelStyle: {
    color: 'black',
  }
});

export const OfflineBanner = () => {

  const online: boolean = useSelector((store: any) => store.home.online);

  if (online === true) {
    return null;
  }

  return (
    <View style = {styles.container}>

      <Label m bold title = 'No Internet' style = {styles.labelStyle} />
    </View>
  );
};
