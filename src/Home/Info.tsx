import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


export const Info = () => {

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
            <SafeAreaView />
        </LinearGradient>
    )
}