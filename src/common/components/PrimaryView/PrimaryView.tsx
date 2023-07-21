import { SafeAreaView, StyleSheet } from "react-native"
import { OfflineBanner } from './OfflineBanner'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export const PrimaryView = ({ children, style = {} }: any) => {
    return (
        <SafeAreaView style={{ ...styles.container, ...style }}>
            <OfflineBanner/>
            {children}
        </SafeAreaView>
    )
}