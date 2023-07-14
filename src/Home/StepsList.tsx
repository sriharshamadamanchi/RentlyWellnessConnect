import React from "react"
import { FlatList, StyleSheet, TextInput, View } from "react-native"
import { Label } from "../common/components"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import moment from "moment"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    itemContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: moderateScale(10)
    },
    textInputStyle: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: moderateScale(0),
        width: moderateScale(200),
        height: moderateScale(45),
        paddingLeft: moderateScale(20),
        fontSize: moderateScale(18),
        fontWeight: "600",
        color:'#454545'
    },
    dateViewContainer: {
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
    }
})

const DateView = ({ date }: { date: string }) => {

    const date_n = moment(date, "DD/MM/YYYY").format("DD");
    const day = moment(date, "DD/MM/YYYY").format("ddd");
    const month = moment(date, "DD/MM/YYYY").format("MMM");

    return (
        <LinearGradient colors={["#000000", '#434343']} style={styles.dateViewContainer}>
            <Label xl bold white center title={date_n} />
            <Label white center title={day} />
            <View style={styles.horizontalLineStyle} />
            <Label white center title={month} />
        </LinearGradient>

    )
}

const InputField = ({ value }: { value: string }) => {
    return (
        <TextInput
            editable={false}
            value={value}
            style={styles.textInputStyle}
        />
    )
}

export const StepsList = () => {

    const user = useSelector((store: any) => store.home.user)
    const usersList = useSelector((store: any) => store.home.usersList)

    const id = user.id;
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
                        <Label xxl bold white center title={"NO ACTIVITY"} />
                    </View>
                }
                <FlatList
                    data={steps}
                    renderItem={({ item }: { item: any }) => {
                        return (
                            <View style={styles.itemContainer}>
                                <DateView date={item.date} />
                                <InputField value={`${item.count} steps`} />
                            </View>

                        )
                    }}
                    keyExtractor={item => item.date}
                />

            </View>
        </LinearGradient>
    )
}