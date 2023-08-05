import React from "react"
import { StatusBar, StyleSheet } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { Label } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"
import { ActivityTab } from "./ActivityTab"
import { StepsList } from "../StepsList"
import { View } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const TopTab = createMaterialTopTabNavigator();

export const UserActivityTab = ({ navigation, route: { params = {} } }: any) => {

    const user = params.user ?? {}

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: user.name ?? "User Activity"
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
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
                        name={"ACTIVITY"}
                        children={() => <StepsList user={user} />} />
                    <TopTab.Screen
                        name={"CHART"}
                        children={() => <ActivityTab user={user} />} />
                </TopTab.Navigator>
            </LinearGradient>
        </View>
    )
}