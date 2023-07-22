import React from "react"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { GradientButton, InputField, Label } from "../common/components"
import { moderateScale } from "react-native-size-matters"
import { ScrollView } from "react-native"
import { Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { forgotPasswordAction } from "../Home/redux/actions"
import { loaderSelector } from "../common/loaderRedux/selectors"
import { LoadingIndicator } from "../common/components/LoadingIndicator/LoadingIndicator"
import { StatusBar } from "react-native"
import { Keyboard } from "react-native"

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        marginTop: moderateScale(100),
        justifyContent: 'center',
        alignItems: "center"
    },
    inputStyle: {
        width: moderateScale(250),
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: moderateScale(200),
        height: moderateScale(45),
        marginVertical: moderateScale(50)
    },
    labelStyle: {
        width: "80%",
        marginBottom: moderateScale(10)
    }
})

export const ForgotPassword = () => {
    const [email, setEmail] = React.useState("")
    const dispatch = useDispatch()
    const { loading }: any = useSelector(loaderSelector("ForgotPassword"))

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.mainContainer}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <LoadingIndicator loading={loading} />
            <ScrollView keyboardShouldPersistTaps="always" style={styles.mainContainer}>
                <View style={styles.container}>
                    <Label center bold white title="Please enter the email address you'd like your password reset information sent to" style={styles.labelStyle} />
                    <InputField
                        title="Enter email address"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text.trim().toLowerCase())
                        }}
                        inputStyle={styles.inputStyle}
                    />
                    <View style={styles.buttonContainer}>
                        <GradientButton
                            colors={['#bdc3c7', '#2c3e50']}
                            title="REQUEST LINK"
                            bold
                            buttonStyle={styles.buttonStyle}
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
                                dispatch(forgotPasswordAction({ email: email.trim().toLowerCase() }))
                            }} />
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
}