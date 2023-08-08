import React from "react"
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { GradientButton, InputField } from "../../common/components"
import { moderateScale } from "react-native-size-matters"
import { useDispatch } from "react-redux"
import { LoadingIndicator } from "../../common/components/LoadingIndicator/LoadingIndicator"
import { useNavigation } from "@react-navigation/native"
import { Alert } from "react-native"
import { eyeIcon, eyeWithLineIcon } from "../../common/constants"
import { Platform } from "react-native"
import auth from '@react-native-firebase/auth'
import { logoutAction } from "../redux/actions"
import { Keyboard } from "react-native"
import { Header } from ".."

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

export const ChangePassword = () => {
    const [loading, setLoading] = React.useState(false)
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const [showNewPassword, setShowNewPassword] = React.useState(eyeIcon)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(eyeIcon)

    const dispatch = useDispatch()
    const navigation: any = useNavigation();

    const update = async () => {
        try {
            setLoading(true)
            await auth().currentUser?.updatePassword(newPassword)
            Alert.alert("Success", "Updated successfully")
        } catch (err: any) {
            if (err.code === "auth/requires-recent-login") {
                Alert.alert("Requires recent login", "This operation is sensitive and requires recent authentication. Log in again before retrying this request.", [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Logout', onPress: async () => {
                            dispatch(logoutAction())
                        }
                    },
                ]);
            } else if (err.message) {
                Alert.alert("Error", err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#43C6AC' }} />
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.mainContainer}>
                <Header name={"Change Password"} />
                <LoadingIndicator loading={loading} />
                <KeyboardAvoidingView style={styles.mainContainer}
                    keyboardVerticalOffset={Platform.select({ ios: moderateScale(100), android: 0 })}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView automaticallyAdjustKeyboardInsets={Platform.OS === 'android'} keyboardShouldPersistTaps="handled" style={styles.mainContainer}>
                        <View style={styles.container}>

                            <InputField
                                secureTextEntry={showNewPassword === eyeIcon}
                                title="NEW PASSWORD"
                                value={newPassword}
                                onChangeText={(text) => {
                                    setNewPassword(text)
                                }}
                                inputStyle={styles.inputStyle}
                                icon={showNewPassword}
                                onPressIcon={() => {
                                    if (showNewPassword !== eyeIcon) {
                                        setShowNewPassword(eyeIcon)
                                    } else {
                                        setShowNewPassword(eyeWithLineIcon)
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
                            <View style={styles.registerButtonContainer}>
                                <GradientButton
                                    colors={['#bdc3c7', '#2c3e50']}
                                    title="UPDATE"
                                    bold
                                    m
                                    buttonStyle={styles.registerButtonStyle}
                                    onPress={() => {
                                        Keyboard.dismiss()
                                        if (newPassword.trim() === "") {
                                            Alert.alert("Alert", "Password can't be blank")
                                            return
                                        }
                                        if (newPassword.trim().length < 8) {
                                            Alert.alert("Alert", "Password should be of minimum length 8")
                                            return
                                        }
                                        if (newPassword.trim() !== confirmPassword.trim()) {
                                            Alert.alert("Alert", "Passwords dosen't match")
                                            return
                                        }
                                        update()
                                    }} />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </>
    )
}