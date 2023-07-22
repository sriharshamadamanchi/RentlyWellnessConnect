import React from "react"
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { AnchorButton, GradientButton, InputField } from "../common/components"
import { moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from "react-redux"
import { loaderSelector } from "../common/loaderRedux/selectors"
import { LoadingIndicator } from "../common/components/LoadingIndicator/LoadingIndicator"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { StatusBar } from "react-native"
import { registerAction } from "../Home/redux/actions"
import { eyeIcon, eyeWithLineIcon } from "../common/constants"
import { Platform } from "react-native"

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
        marginVertical: moderateScale(5),
        paddingRight: moderateScale(40)
    },
    registerButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerButtonStyle: {
        width: moderateScale(200),
        height: moderateScale(45),
        marginVertical: moderateScale(50)
    }
})

const formatName = (name: string) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const Register = () => {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const [showPassword, setShowPassword] = React.useState(eyeIcon)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(eyeIcon)

    const dispatch = useDispatch()
    const { loading }: any = useSelector(loaderSelector("Register"))
    const navigation: any = useNavigation();

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.mainContainer}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <LoadingIndicator loading={loading} />
            <KeyboardAvoidingView style={styles.mainContainer}
                keyboardVerticalOffset={Platform.select({ ios: moderateScale(100), android: 0 })}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.mainContainer}>
                    <View style={styles.container}>
                        <InputField
                            maxLength={30}
                            title="NAME"
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                            }}
                            inputStyle={styles.inputStyle}
                        />

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

                        <InputField
                            secureTextEntry={showConfirmPassword === eyeIcon}
                            title="CONFIRM PASSWORD"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text)
                            }}
                            inputStyle={styles.inputStyle}
                            icon={showConfirmPassword}
                            onPressIcon={() => {
                                if (showConfirmPassword !== eyeIcon) {
                                    setShowConfirmPassword(eyeIcon)
                                } else {
                                    setShowConfirmPassword(eyeWithLineIcon)
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
                        <View style={styles.registerButtonContainer}>
                            <GradientButton
                                colors={['#bdc3c7', '#2c3e50']}
                                title="REGISTER"
                                bold
                                buttonStyle={styles.registerButtonStyle}
                                onPress={() => {
                                    if (name.trim() === "") {
                                        Alert.alert("Alert", "Name can't be blank")
                                        return
                                    }
                                    if (name.trim().length < 8) {
                                        Alert.alert("Alert", "Name should contain minimum of 8 characters")
                                        return
                                    }
                                    if (!(/^[a-zA-Z\s]+$/.test(name.trim()))) {
                                        Alert.alert("Alert", "Name should not contain other than alphabets")
                                        return
                                    }
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
                                    if (password.trim().length < 8) {
                                        Alert.alert("Alert", "Password should be of minimum length 8")
                                        return
                                    }
                                    if (password.trim() !== confirmPassword.trim()) {
                                        Alert.alert("Alert", "Passwords dosen't match")
                                        return
                                    }
                                    dispatch(registerAction({ name: formatName(name.trim()), email: email.trim().toLowerCase(), password: password.trim() }))
                                }} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}