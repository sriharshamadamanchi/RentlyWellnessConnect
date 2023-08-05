import React from "react"
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { GradientButton, InputField } from "../../common/components"
import { moderateScale } from "react-native-size-matters"
import { LoadingIndicator } from "../../common/components/LoadingIndicator/LoadingIndicator"
import { Alert } from "react-native"
import { StatusBar } from "react-native"
import { Platform } from "react-native"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from "react-redux"
import { storeLoginDetailsAction, storeUsersListAction } from "../redux/actions"

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

export const EditProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector((store: any) => store.home.user)
    const usersList = useSelector((store: any) => store.home.usersList ?? {})

    const details = usersList[user.id] ?? {}
    const id = details.id
    const [name, setName] = React.useState(details.name ?? "")
    const [loading, setLoading] = React.useState(false)

    const update = async () => {
        try {
            if (!id) {
                throw new Error("Invalid user id")
            }
            setLoading(true)
            await auth().currentUser?.updateProfile({ displayName: name.trim() })
            await firestore().collection('users').doc('activity')
                .update({
                    [id]: JSON.stringify({ ...details, name: name.trim() })
                })
            dispatch((storeUsersListAction({ usersList: { ...usersList, [id]: { ...details, name: name.trim() } } })))
            dispatch(storeLoginDetailsAction({ user: { ...details, name: name.trim() } }))
            setName(name.trim())
            Alert.alert("Success", "Profile updated successfully")
        } catch (err: any) {
            if (err.message) {
                Alert.alert("Error", err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.mainContainer}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <LoadingIndicator loading={loading} />
            <KeyboardAvoidingView style={styles.mainContainer}
                keyboardVerticalOffset={Platform.select({ ios: moderateScale(100), android: 0 })}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView automaticallyAdjustKeyboardInsets={Platform.OS === 'android'} keyboardShouldPersistTaps="handled" style={styles.mainContainer}>
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
                        <View style={styles.registerButtonContainer}>
                            <GradientButton
                                colors={['#bdc3c7', '#2c3e50']}
                                title="UPDATE"
                                bold
                                m
                                buttonStyle={styles.registerButtonStyle}
                                onPress={() => {
                                    Keyboard.dismiss()
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
                                    update()
                                }} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}