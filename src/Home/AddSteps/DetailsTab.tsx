import React from "react"
import { StyleSheet } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Activity } from "./Activity"
import { Label } from "../../common/components"
import { AddSteps } from "./AddSteps"
import LinearGradient from "react-native-linear-gradient"
import { Header } from ".."
import { SafeAreaView } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const TopTab = createMaterialTopTabNavigator();

export const DetailsTab = () => {

    return (
        <>
                        <SafeAreaView style={{ backgroundColor: '#43C6AC' }} />
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <Header name = {"Details"}/>

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
                        name={"ADD"}
                        children={() => <AddSteps />} />
                    <TopTab.Screen
                        name={"ACTIVITY"}
                        children={() => <Activity />} />
                </TopTab.Navigator>
            </LinearGradient>
        </>
    )
}