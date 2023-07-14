import { SafeAreaView, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export const PrimaryView = ({ children, style = {} }: any) => {
    return (
        <SafeAreaView style={{ ...styles.container, ...style }}>
            {children}
        </SafeAreaView>
    )
}