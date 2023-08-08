import React from "react"
import { Alert, FlatList, StyleSheet, View } from "react-native"
import { Card, Divider, Label, LoadingIndicator, Ripple } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import Icon from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { theme } from "../../common/theme"
import { hideLoaderAction, showLoaderAction } from "../../common/loaderRedux/actions"
import { Firestore } from "../Firestore"
import { FlashList } from "@shopify/flash-list"

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
        width: "95%",
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

export const Activity = (params: any = {}) => {

    const admin = useSelector((store: any) => store.home.remoteConfig?.admin?.keys) ?? []
    const user = useSelector((store: any) => store.home.user)
    const usersList = useSelector((store: any) => store.home.usersList)
    const loading = useSelector((store: any) => store.loader.loading)

    const [showDropdown, setShowDropDown]: any = React.useState(null)

    const id = params.user ? params.user.id : user.id;
    const userActivity = usersList[id] ?? {}
    const steps = [...(userActivity.steps ?? [])]
    steps.sort((a: any, b: any) => {
        return moment(b.date, "DD/MM/YYYY").valueOf() - moment(a.date, "DD/MM/YYYY").toDate().valueOf()
    });

    const dispatch = useDispatch()

    const deleteRecord = async (record: any, deleteRecord: any) => {
        try {
            dispatch(showLoaderAction())
            const index = steps.findIndex((step) => step.date === record.date)
            if (index !== -1) {
                steps[index] = { ...steps[index], count: parseInt(record?.count ?? 0, 10) - parseInt(deleteRecord?.count ?? 0, 10), history: (record?.history.filter((history: any) => history.time !== deleteRecord.time) ?? []) }
            }

            const updatedSteps = (steps?.filter((step) => step.history?.length !== 0)) ?? []

            await Firestore.updateUser({ id, details: { ...userActivity, steps: updatedSteps } })
        } catch (err: any) {
            console.log("err in deleteRecord", err)
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
            <View style={styles.container}>
                {steps.length === 0 &&
                    <View style={{ height: "80%", justifyContent: 'center', alignItems: 'center' }}>
                        <Label xxl bold white center title={"No Activity"} />
                    </View>
                }
                <FlashList
                    estimatedItemSize={200}
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
                                            renderItem={({ item: history = {} }: { item: any }) => {
                                                return (
                                                    <>
                                                        <View style={styles.historyContainer}>
                                                            <Label m bold primary title={moment(history.time).format("hh:mm A")} />
                                                            <Label m bold primary title={`${history.count} steps`} />
                                                            <Label m bold primary title={history.type} />
                                                            {
                                                                (user.id === id || admin.includes(user.email)) &&
                                                                <MaterialCommunityIcons
                                                                    name={"delete"}
                                                                    color="red"
                                                                    size={moderateScale(20)}
                                                                    style={{ padding: moderateScale(5), bottom: moderateScale(3) }}
                                                                    onPress={() => {
                                                                        Alert.alert('Delete record', `Are you sure you want to delete the record of ${history.count} steps ?`, [
                                                                            {
                                                                                text: 'Cancel',
                                                                                onPress: () => console.log('Cancel Pressed'),
                                                                                style: 'cancel',
                                                                            },
                                                                            {
                                                                                text: 'Delete', onPress: async () => {
                                                                                    try {
                                                                                        deleteRecord(item, history)
                                                                                    } catch (err: any) {
                                                                                    }
                                                                                }
                                                                            },
                                                                        ]);
                                                                    }} />
                                                            }
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