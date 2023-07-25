import React from "react"
import { StatusBar, StyleSheet, View } from "react-native"
import { GradientButton, Label } from "../common/components"
import { moderateScale } from "react-native-size-matters"
import { useDispatch } from "react-redux"
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topCircleStyle: {
        alignSelf: 'center',
        width: moderateScale(400),
        height: moderateScale(400),
        borderRadius: moderateScale(400),
        backgroundColor: "white",
        position: 'absolute',
        top: moderateScale(-200)
    },
    bottomCircleStyle: {
        alignSelf: 'center',
        width: moderateScale(400),
        height: moderateScale(400),
        borderRadius: moderateScale(400),
        backgroundColor: "white",
        position: 'absolute',
        bottom: moderateScale(-200)
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: moderateScale(220),
        height: moderateScale(45),
        marginVertical: moderateScale(20)
    }
})

export const Welcome = () => {

    const dispatch = useDispatch()
    const navigation: any = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#A0E3A9"} barStyle="dark-content" />
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.topCircleStyle}>
                    <Label xxl primary bold center title="Welcome!" style={{ marginTop: moderateScale(300) }} />
                </LinearGradient>

                <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.bottomCircleStyle}>
                </LinearGradient>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        colors={['#bdc3c7', '#2c3e50']}
                        title="LOGIN"
                        bold
                        buttonStyle={styles.buttonStyle}
                        onPress={() => {
                            navigation.navigate("Login")
                        }} />

                    <GradientButton
                        colors={['#bdc3c7', '#2c3e50']}
                        title="REGISTER"
                        bold
                        buttonStyle={styles.buttonStyle}
                        onPress={() => {
                            navigation.navigate("Register")
                        }} />
                </View>
            </LinearGradient>
        </View>
    )
}