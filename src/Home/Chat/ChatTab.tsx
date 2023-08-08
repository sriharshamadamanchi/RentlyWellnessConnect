import React from "react"
import { StyleSheet } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import LinearGradient from "react-native-linear-gradient"
import { ChatList } from "./ChatList"
import { Groups } from "./Groups"
import { Label } from "../../common/components"
import { StatusBar } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})

const TopTab = createMaterialTopTabNavigator();

export const ChatTab = () => {

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
            <StatusBar backgroundColor={"#FFFFFF"} barStyle="dark-content" />
            <TopTab.Navigator
                screenOptions={{
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
                    name={"CHATS"}
                    children={() => <ChatList />} />
                <TopTab.Screen
                    name={"Groups"}
                    children={() => <Groups />} />
            </TopTab.Navigator>
        </LinearGradient>
    )
}