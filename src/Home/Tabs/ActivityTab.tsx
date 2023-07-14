import React from "react"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSelector } from "react-redux"
import { Chart } from "../Chart"
import moment from "moment"
import Swiper from "react-native-swiper"
import { CurvedButton, Label } from "../../common/components"
import { moderateScale } from "react-native-size-matters"
import { useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonGradientView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: moderateScale(30)
    },
    buttonGradientStyle: {
        width: moderateScale(200),
        height: moderateScale(50),
        borderRadius: moderateScale(10)
    }

})

export const ActivityTab = () => {

    const navigation: any = useNavigation()
    const user = useSelector((store: any) => store.home.user)
    const usersList = useSelector((store: any) => store.home.usersList)

    const id = user.id;
    const userActivity = usersList[id] ?? {}
    const steps = [...(userActivity.steps ?? [])]
    steps.sort((a: any, b: any) => {
        return moment(b.date, "DD/MM/YYYY").valueOf() - moment(a.date, "DD/MM/YYYY").toDate().valueOf()
    });

    const data: any = {}

    for (let i = 0; i < steps.length; i++) {
        const start = moment(steps[i].date, "DD/MM/YYYY").startOf("week").format("DD MMM")
        const end = moment(steps[i].date, "DD/MM/YYYY").endOf("week").format("DD MMM")
        const name = start + " - " + end
        if (!data[name]) {
            const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            for (let j = 0; j < labels.length; j++) {
                labels[j] = moment(steps[i].date, "DD/MM/YYYY").startOf("week").add(j, 'day').format("DD ddd")
            }
            data[name] = {
                steps: [0, 0, 0, 0, 0, 0, 0],
                labels
            }
        }
        const index = moment(steps[i].date, "DD/MM/YYYY").format("d")
        const label = moment(steps[i].date, "DD/MM/YYYY").format("DD ddd")

        data[name].steps[index] = steps[i].count
    }

    const keys = Object.keys(data)

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <View style={styles.container}>

                    {
                        keys.length === 0 &&
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <Label xxl center white bold title={"No Activity"} />
                        </View>

                    }

                    <Swiper loop={false} showsPagination={true} activeDotColor={"red"}>

                        {keys.map((label, index) => {
                            return (
                                <View key={index}>
                                    <Label center white bold title={label} style={{ marginTop: moderateScale(20), marginBottom: moderateScale(10) }} />
                                    <Chart type={"week"} data={data[label]?.steps ?? []} labels={data[label]?.labels ?? []} />
                                </View>
                            )
                        })}
                    </Swiper>
                </View>

                <View style={styles.buttonGradientView}>
                    <LinearGradient
                        colors={['#bdc3c7', '#2c3e50']}
                        style={styles.buttonGradientStyle}>
                        <CurvedButton
                            title="EDIT DETAILS"
                            bold
                            buttonStyle={{ flex: 1, width: "100%", alignSelf: "center", backgroundColor: "transparent" }}
                            onPress={() => {
                                navigation.navigate("Details")
                            }}
                        />
                    </LinearGradient>
                </View>

            </LinearGradient>
        </View>
    )
}