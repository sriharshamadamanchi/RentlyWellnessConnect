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

export const Login = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const navigation: any = useNavigation();
    const dispatch = useDispatch()
    const { loading }: any = useSelector(loaderSelector("Login"))

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.mainContainer}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <LoadingIndicator loading={loading} />
            <ScrollView keyboardShouldPersistTaps="always" style={styles.mainContainer}>
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
                        secureTextEntry
                        title="PASSWORD"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text)
                        }}
                        inputStyle={styles.inputStyle}
                    />
                    <AnchorButton
                        bold
                        s
                        title="FORGOT PASSWORD ?"
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.navigate("ForgotPassword")
                        }}
                    />
                    <View style={styles.loginButtonContainer}>
                        <GradientButton
                            colors={['#bdc3c7', '#2c3e50']}
                            title="LOGIN"
                            bold
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

                <View style={{ marginTop: moderateScale(50) }}>
                    <Label white primary center title="Don't have an account ?" />
                    <AnchorButton
                        buttonStyle={{ alignSelf: "center" }}
                        bold
                        m
                        title="Register Here"
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.navigate("Register")
                        }}
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    )
}