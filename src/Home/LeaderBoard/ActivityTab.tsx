import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Label } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"
import { Chart } from "../AddSteps/Chart"
import { Activity } from "../AddSteps/Activity"
import { Header } from ".."

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const TopTab = createMaterialTopTabNavigator();

export const ActivityTab = ({ route: { params = {} } }: any) => {

    const user = params.user ?? {}

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#43C6AC' }} />
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <Header name={user.name ?? "User Activity"} />
                <TopTab.Navigator
                    screenOptions={{
                        swipeEnabled: true,
                        tabBarPressColor: "#CBF5DD",
                        tabBarActiveTintColor: "#0f9b0f",
                        tabBarInactiveTintColor: "black",
                        tabBarIndicatorStyle: {
                            borderBottomWidth: moderateScale(2),
                            borderBottomColor: "#0f9b0f"
                        },
                        tabBarLabel: ({ color, children }) => {
                            return (
                                <Label m bold title={children} style={{ color: color }} />
                            )
                        }
                    }}
                >
                    <TopTab.Screen
                        name={"ACTIVITY"}
                        children={() => <Activity user={user} />} />
                    <TopTab.Screen
                        name={"CHART"}
                        children={() => <Chart user={user} />} />
                </TopTab.Navigator>
            </LinearGradient>
        </>
    )
}