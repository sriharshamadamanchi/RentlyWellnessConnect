import React from "react"
import { Alert, Keyboard, ScrollView, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { AnchorButton, GradientButton, InputField, Label } from "../common/components"
import { moderateScale } from "react-native-size-matters"
import { useNavigation } from "@react-navigation/native"
import { loginAction } from "../Home/redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { loaderSelector } from "../common/loaderRedux/selectors"
import { LoadingIndicator } from "../common/components/LoadingIndicator/LoadingIndicator"
import { StatusBar } from "react-native"
import { eyeIcon, eyeWithLineIcon } from "../common/constants"
import { Platform } from "react-native"
import { KeyboardAvoidingView } from "react-native"

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        marginTop: moderateScale(50),
        justifyContent: 'center',
        alignItems: "center"
    },
    inputStyle: {
        width: moderateScale(250),
        paddingRight: moderateScale(40),
        marginVertical: moderateScale(5)
    },
    loginButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonStyle: {
        width: moderateScale(200),
        height: moderateScale(45),
        marginVertical: moderateScale(50)
    }
})

export const Login = ({ route: { params = {} } }: any) => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigation: any = useNavigation();
    const dispatch = useDispatch()
    const { loading }: any = useSelector(loaderSelector("Login"))
    const [showPassword, setShowPassword] = React.useState(eyeIcon)

    React.useEffect(() => {
        if (params.email && params.password) {
            setEmail(params.email)
            setPassword(params.password)
        }
    }, [])

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.mainContainer}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <LoadingIndicator loading={loading} />
            <KeyboardAvoidingView style={styles.mainContainer}
                keyboardVerticalOffset={Platform.select({ ios: moderateScale(120), android: 0 })}
                behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.mainContainer}>
                    <View style={styles.container}>
                        <InputField
                            title="EMAIL"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                            inputStyle={styles.inputStyle}
                        />

                        <InputField
                            secureTextEntry={showPassword === eyeIcon}
                            title="PASSWORD"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            inputStyle={styles.inputStyle}
                            icon={showPassword}
                            onPressIcon={() => {
                                if (showPassword !== eyeIcon) {
                                    setShowPassword(eyeIcon)
                                } else {
                                    setShowPassword(eyeWithLineIcon)
                                }
                            }}
                        />
                        <AnchorButton
                            bold
                            s
                            title="FORGOT PASSWORD ?"
                            onPress={() => {
                                navigation.navigate("ForgotPassword")
                            }}
                        />
                        <View style={styles.loginButtonContainer}>
                            <GradientButton
                                colors={['#bdc3c7', '#2c3e50']}
                                title="LOGIN"
                                bold
                                m
                                buttonStyle={styles.loginButtonStyle}
                                onPress={() => {
                                    Keyboard.dismiss()
                                    if (email.trim() === "") {
                                        Alert.alert("Alert", "Email can't be blank")
                                        return
                                    }
                                    if (!(/^\S+@\S+\.\S+$/.test(email.trim()))) {
                                        Alert.alert("Alert", "Invalid Email")
                                        return
                                    }
                                    if (password.trim() === "") {
                                        Alert.alert("Alert", "Password can't be blank")
                                        return
                                    }
                                    dispatch(loginAction({ email: email.trim().toLowerCase(), password: password.trim() }))
                                }} />
                        </View>
                    </View>

                    <View style={{ marginTop: moderateScale(30) }}>
                        <Label white primary center title="Don't have an account ?" />
                        <AnchorButton
                            buttonStyle={{ alignSelf: "center" }}
                            bold
                            m
                            title="Register Here"
                            onPress={() => {
                                navigation.navigate("Register")
                            }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}