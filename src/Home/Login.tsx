import React from "react"
import { Image, StatusBar, StyleSheet, View } from "react-native"
import { CurvedButton, Label } from "../common/components"
import { moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from "react-redux"
import { loginAction } from "./redux/actions"
import LinearGradient from "react-native-linear-gradient"
import { loaderSelector } from "../common/loaderRedux/selectors"
import { LoadingIndicator } from "../common/components/LoadingIndicator/LoadingIndicator"

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
    loginButtonGradientView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: moderateScale(50)
    },
    loginButtonGradientStyle: {
        width: moderateScale(200),
        height: moderateScale(45),
        borderRadius: moderateScale(0)
    },
    imageStyle: {
        width: moderateScale(45),
        height: moderateScale(45),
        marginRight: moderateScale(1)
    }
})

export const Login = () => {

    const dispatch = useDispatch()
    const { loading }: any = useSelector(loaderSelector("Login"))

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#5EE8F9"} barStyle="dark-content" />
            <LoadingIndicator loading={loading} />
            <LinearGradient colors={["#B2FEFA", '#0ED2F7']} style={styles.container}>
                <LinearGradient colors={["#B2FEFA", '#0ED2F7']} style={styles.topCircleStyle}>
                    <Label xxl white bold center title="Welcome!" style={{ marginTop: moderateScale(300) }} />
                </LinearGradient>

                <LinearGradient colors={["#B2FEFA", '#0ED2F7']} style={styles.bottomCircleStyle}>
                </LinearGradient>
                <View style={styles.loginButtonGradientView}>
                    <Image
                        style={styles.imageStyle}
                        source={require("../../res/assets/google.png")} />
                    <LinearGradient
                        colors={['#00c6ff', '#0072ff']}
                        style={styles.loginButtonGradientStyle}>

                        <CurvedButton
                            rippleOpacity={0}
                            title="Sign in with Google"
                            buttonStyle={{ flex: 1, borderRadius: 0, width: "100%", alignSelf: "center", backgroundColor: "transparent" }}
                            onPress={() => {
                                dispatch(loginAction())
                            }}
                        />
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    )
}