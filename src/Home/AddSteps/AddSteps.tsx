import moment from "moment"
import React, { useState } from "react"
import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from "react-redux"
import { CurvedButton, Label } from "../../common/components"
import { LoadingIndicator } from "../../common/components/LoadingIndicator/LoadingIndicator"
import { Firestore } from "../Firestore"
import { DropDown } from "../../common/components/DropDown/DropDown"
import { Platform } from "react-native"
import { getDateTime } from "../../common/constants"
import { Alert } from "react-native"
import { hideLoaderAction, showLoaderAction } from "../../common/loaderRedux/actions"
import { theme } from "../../common/theme"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    calendarStyle: {
        marginTop: moderateScale(5),
        width: Dimensions.get('window').width * 0.95,
        alignSelf: 'center',
    },
    inputContainer: {
        margin: moderateScale(10),
        marginTop: moderateScale(20),
        alignSelf: 'center'
    },
    textInputStyle: {
        backgroundColor: 'white',
        borderRadius: moderateScale(0),
        width: moderateScale(225),
        height: moderateScale(45),
        paddingLeft: moderateScale(10),
        fontSize: moderateScale(18),
        fontFamily: theme.fonts.bold,
        marginVertical: moderateScale(10),
        color: theme.colors.font.primary
    },
    saveButtonGradientView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: moderateScale(30)
    },
    saveButtonGradientStyle: {
        width: moderateScale(200),
        height: moderateScale(50),
        borderRadius: moderateScale(10)
    },
    radioButtonContainer: {
        width: moderateScale(225),
        marginVertical: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

const InputField = ({ title, value, setText, keyboardType = "default", editable = true, maxLength = 20, style = {} }: { title: string, value: string, setText?: any, keyboardType?: any, editable?: boolean, maxLength?: number, style?: any }) => {
    return (
        <View style={{ marginVertical: moderateScale(5) }}>
            <Label m white bold title={title} />
            <TextInput
                maxLength={maxLength}
                placeholder="0"
                placeholderTextColor={"grey"}
                keyboardType={keyboardType}
                maxFontSizeMultiplier={1.2}
                editable={editable}
                value={value}
                style={{ ...styles.textInputStyle, ...style }}
                onChangeText={(text: string) => {
                    setText(text)
                }}
            />
        </View>
    )
}

const data = [
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Hiking', value: 'Hiking' },
    { label: 'Jogging', value: 'Jogging' },
    { label: 'Stair Climbing', value: 'Stair Climbing' },
    { label: 'Daily Activities', value: 'Daily Activities' }
];

export const AddSteps = () => {
    const dispatch = useDispatch()
    const { id } = useSelector((store: any) => store.home.user)
    const usersList = useSelector((store: any) => store.home.usersList)
    const user = usersList[id] ?? {}

    const [count, setCount] = useState("")
    const [km, setKm] = useState("")
    const [pedoType, setPedoType] = useState(data[0].label)
    const [date] = useState(moment().format("YYYY-MM-DD"))
    const loading = useSelector((store: any) => store.loader.loading)

    const stepDetails = user?.steps?.find((step: any) => step.date === moment(date, "YYYY-MM-DD").format("DD/MM/YYYY"))

    const save = async () => {
        try {
            dispatch(showLoaderAction())
            const globalDateTime = await getDateTime();
            const globalDate = globalDateTime.date ?? moment().format("MM/DD/YYYY");
            const formattedGlobalDate = moment(globalDate, "MM/DD/YYYY").format("DD/MM/YYYY")
            const formattedDate = moment().format("DD/MM/YYYY")
            if (formattedDate !== formattedGlobalDate) {
                Alert.alert("Alert", "You can only add steps for today")
                return
            }
            const steps = [...(user?.steps ?? [])]
            const index = steps.findIndex((step) => step.date === formattedDate)
            if (index !== -1) {
                const step = steps[index]
                steps[index] = {
                    ...step,
                    date: formattedDate,
                    count: `${parseInt(step.count, 10) + parseInt(count, 10)}`,
                    history: [...(step.history ?? []), { type: pedoType, count, time: Date.now() }]
                }
            } else {
                steps.push({
                    date: formattedDate,
                    count,
                    history: [{ type: pedoType, count, time: Date.now() }]
                })
            }

            await Firestore.updateUser({ id, details: { ...user, steps } })
            setCount("")
            setKm("")
        } catch (err: any) {
            console.log("err in updateSteps", err)
            if (err.message) {
                Alert.alert("Error", err.message)
            }
        } finally {
            dispatch(hideLoaderAction())
        }
    }

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
            <LoadingIndicator loading={loading} />
            <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.select({ ios: moderateScale(120), android: 0 })}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
                    <View style={styles.container}>

                        <View style={styles.inputContainer}>
                            <View style={{ width: moderateScale(225) }}>
                                <Label center bold title={`STEPS COUNT ON ${moment(date, "YYYY-MM-DD").format("DD MMM, ddd").toUpperCase()}`} white />
                                <Label center bold title={`${stepDetails?.count ?? "0"}`} style={{ fontSize: moderateScale(30), alignSelf: 'center', color: 'white' }} />
                            </View>

                            <DropDown
                                title="TYPE"
                                data={data}
                                value={pedoType}
                                onChange={({ value }) => {
                                    setPedoType(value)
                                }}
                            />
                            <InputField
                                style={{ width: moderateScale(225) }}
                                title={"ENTER STEPS"}
                                value={count}
                                setText={(text: string) => {
                                    setCount(text)
                                    if (/^\d+$/.test(text)) {
                                        setKm(`${Math.round((parseInt(text, 10) * 100) / 1313) / 100}`)
                                    }
                                    if (text === "") {
                                        setKm("")
                                    }
                                }}
                                keyboardType="numeric" />
                            <Label bold primary center title="(or)" style={{ marginHorizontal: moderateScale(5) }} />
                            <InputField
                                style={{ width: moderateScale(225) }}
                                title={"ENTER KILOMETERS"}
                                value={km}
                                setText={(text: string) => {
                                    setKm(text)
                                    if (/^\d+(\.\d+)?$/.test(text)) {
                                        setCount(`${parseInt(`${1313 * parseFloat(text)}`, 10)}`)
                                    }
                                    if (text === "") {
                                        setCount("")
                                    }
                                }}
                                keyboardType="numeric" />
                            <InputField
                                title={"DATE"}
                                value={moment(date, "YYYY-MM-DD").format("DD MMM, dddd")}
                                editable={false}
                                style={{ opacity: 0.75 }} />
                        </View>
                    </View>

                    <View style={styles.saveButtonGradientView}>
                        <LinearGradient
                            colors={['#bdc3c7', '#2c3e50']}
                            style={styles.saveButtonGradientStyle}>
                            <CurvedButton
                                disableButton={loading || !(/^\d+$/.test(count))}
                                title="SAVE"
                                bold
                                buttonStyle={{ flex: 1, width: "100%", alignSelf: "center", backgroundColor: "transparent" }}
                                onPress={() => {
                                    save()
                                }}
                            />
                        </LinearGradient>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}