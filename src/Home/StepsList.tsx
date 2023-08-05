import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Divider, Label, Ripple } from "../common/components"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import moment from "moment"
import Icon from "react-native-vector-icons/AntDesign"
import { theme } from "../common/theme"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: moderateScale(10)
    },
    historyContainer: {
        flexDirection: 'row',
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginVertical: moderateScale(5),
        overflow: 'hidden'
    },
    textInputStyle: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: moderateScale(0),
        width: moderateScale(200),
        height: moderateScale(45),
        fontSize: moderateScale(18),
        fontFamily: theme.fonts.bold,
        color: theme.colors.font.primary
    },
    dateViewContainer: {
        padding: moderateScale(5),
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        width: moderateScale(120),
        height: moderateScale(45)
    },
    horizontalLineStyle: {
        alignSelf: 'center',
        backgroundColor: "white",
        borderColor: "white",
        width: moderateScale(20),
        height: moderateScale(2),
        marginTop: moderateScale(2),
        marginHorizontal: moderateScale(3)
    },
    historyCardStyle: {
        borderRadius: 0,
        marginTop: 0,
        alignSelf: 'center',
        width: moderateScale(320)
    }
})

const DateView = ({ date }: { date: string }) => {

    const date_n = moment(date, "DD/MM/YYYY").format("DD");
    const day = moment(date, "DD/MM/YYYY").format("ddd");
    const month = moment(date, "DD/MM/YYYY").format("MMM");

    return (
        <LinearGradient colors={["#000000", '#434343']} style={styles.dateViewContainer}>
            <Label xl bold white center title={date_n} />
            <Label white center title={month} />
            <View style={styles.horizontalLineStyle} />
            <Label white center title={day} />
        </LinearGradient>

    )
}

const InputField = ({ value, index, showDropdown }: { value: string, index: number, showDropdown: any }) => {
    return (
        <View style={styles.textInputStyle}>
            <View
                style={{ justifyContent: 'center', flexDirection: 'row' }}
            >
                <Label center primary bold title={value} style={{ width: "70%" }} />
                <Icon
                    name={showDropdown === index ? "upcircle" : "downcircle"}
                    color="black"
                    size={moderateScale(24)}
                    style={{ padding: moderateScale(10), alignSelf: 'center' }} />
            </View>
        </View>
    )
}

export const StepsList = (params: any = {}) => {

    const user = useSelector((store: any) => store.home.user)
    const usersList = useSelector((store: any) => store.home.usersList)
    const [showDropdown, setShowDropDown]: any = React.useState(null)

    const id = params.user ? params.user.id : user.id;
    const userActivity = usersList[id] ?? {}
    const steps = [...(userActivity.steps ?? [])]
    steps.sort((a: any, b: any) => {
        return moment(b.date, "DD/MM/YYYY").valueOf() - moment(a.date, "DD/MM/YYYY").toDate().valueOf()
    });


    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
            <View style={styles.container}>
                {steps.length === 0 &&
                    <View style={{ height: "80%", justifyContent: 'center', alignItems: 'center' }}>
                        <Label xxl bold white center title={"No Activity"} />
                    </View>
                }
                <FlatList
                    data={steps}
                    renderItem={({ item, index }: { item: any, index: number }) => {
                        return (
                            <View >
                                <Ripple style={styles.itemContainer}
                                    onPress={() => {
                                        if (showDropdown === index) {
                                            setShowDropDown(null)
                                        } else {
                                            setShowDropDown(index)
                                        }
                                    }}>
                                    <DateView date={item.date} />
                                    <InputField value={`${item.count} steps`} index={index} showDropdown={showDropdown} />
                                </Ripple>
                                {showDropdown === index &&
                                    <Card disabled style={styles.historyCardStyle}>
                                        <FlatList
                                            data={item.history}
                                            renderItem={({ item = {} }: { item: any }) => {
                                                return (
                                                    <>
                                                        <View style={styles.historyContainer}>
                                                            <Label m bold primary title={moment(item.time).format("hh:mm A")} />
                                                            <Label center style={{ flex: 0.8 }} ellipsizeMode="end" numberOfLines={2} m bold primary title={`${item.count} steps`} />
                                                            <Label m bold primary title={item.type} />
                                                        </View>
                                                        <Divider />
                                                    </>
                                                )
                                            }}
                                            keyExtractor={item => item.time}
                                        />
                                    </Card>
                                }
                            </View>

                        )
                    }}
                    keyExtractor={item => item.date}
                />

            </View>
        </LinearGradient>
    )
}