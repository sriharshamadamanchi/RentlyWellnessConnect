import React from "react"
import { StatusBar, StyleSheet } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StepsList } from "./StepsList"
import { AddOrEditSteps } from "./AddOrEditSteps"
import { Label } from "../common/components"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const TopTab = createMaterialTopTabNavigator();

export const Details = () => {

    return (
        <>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <TopTab.Navigator
                screenOptions={{
                    swipeEnabled: false,
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
                    children={() => <AddOrEditSteps />} />
                <TopTab.Screen
                    name={"HISTORY"}
                    children={() => <StepsList />} />
            </TopTab.Navigator>
        </>
    )
}