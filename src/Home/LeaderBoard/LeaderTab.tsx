import React from "react"
import { StyleSheet } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { IndividualRank } from "./IndividualRank"
import { TeamRank } from "./TeamRank"
import { Label, PrimaryView } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const TopTab = createMaterialTopTabNavigator();

export const LeaderTab = () => {

    return (
        <PrimaryView style={{ backgroundColor: '#43C6AC' }}>
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <Label xxl center bold white title={"Leaderboard"} style={{ marginVertical: moderateScale(20) }} />

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
                        name={"INDIVIDUAL"}
                        children={() => <IndividualRank />} />
                    <TopTab.Screen
                        name={"TEAM"}
                        children={() => <TeamRank />} />
                </TopTab.Navigator>
            </LinearGradient>
        </PrimaryView>
    )
}