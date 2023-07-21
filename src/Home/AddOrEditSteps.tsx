import moment from "moment"
import React, { useState } from "react"
import { Dimensions, ScrollView, StyleSheet, TextInput, View } from "react-native"
import { Calendar } from "react-native-calendars"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import { CurvedButton, Label } from "../common/components"
import { LoadingIndicator } from "../common/components/LoadingIndicator/LoadingIndicator"
import { Firestore } from "./Firestore"
import { DropDown } from "../common/components/DropDown/DropDown"

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
        alignSelf: 'center'
    },
    textInputStyle: {
        backgroundColor: 'white',
        borderRadius: moderateScale(0),
        width: moderateScale(225),
        height: moderateScale(45),
        paddingLeft: moderateScale(10),
        fontSize: moderateScale(18),
        fontWeight: "600",
        marginVertical: moderateScale(10),
        color: '#454545'
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

export const AddOrEditSteps = () => {

    const { id } = useSelector((store: any) => store.home.user)
    const usersList = useSelector((store: any) => store.home.usersList)
    const user = usersList[id] ?? {}

    const [count, setCount] = useState("")
    const [km, setKm] = useState("")
    const [pedoType, setPedoType] = useState(data[0].label)
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const loading = useSelector((store: any) => store.loader.loading)

    const save = async () => {
        const formattedDate = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY")
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
        setDate(moment().format("YYYY-MM-DD"))
    }

    const stepDetails = user?.steps?.find((step: any) => step.date === moment(date, "YYYY-MM-DD").format("DD/MM/YYYY"))

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
            <LoadingIndicator loading={loading} />
            <ScrollView style={styles.container}>
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
                        <View style={{ flexDirection: 'row' }}>
                            <InputField
                                style={{ width: moderateScale(90) }}
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
                            <Label bold white center title="(or)" style={{ marginHorizontal: moderateScale(5) }} />
                            <InputField
                                style={{ width: moderateScale(90) }}
                                title={"ENTER KMS"}
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
                        </View>
                        <InputField
                            title={"DATE"}
                            value={moment(date, "YYYY-MM-DD").format("DD MMM, ddd")}
                            setText={setDate}
                            editable={false}
                            style={{ opacity: 0.75 }} />
                    </View>

                    <Calendar
                        style={styles.calendarStyle}
                        maxDate={moment().format("YYYY-MM-DD")}
                        markedDates={{
                            [date]: { selected: true, disableTouchEvent: true, selectedColor: 'red' }
                        }}
                        onDayPress={day => {
                            setDate(day.dateString)
                        }}
                        hideArrows
                        disableMonthChange
                    />
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
        </LinearGradient>
    )
}