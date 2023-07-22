import React from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { theme } from "../../theme"
import { Label } from "../Label/Label"
import EntypoIcon from 'react-native-vector-icons/Entypo'

const styles = StyleSheet.create({
    container: {
        margin: moderateScale(10)
    },
    inputStyle: {
        width: moderateScale(200),
        borderRadius: moderateScale(45),
        backgroundColor: '#FFFFFF',
        color: '#454545',
        fontSize: theme.fontSizes.l,
        fontFamily: theme.fonts.bold,
        height: moderateScale(45),
        paddingHorizontal: moderateScale(20)
    },
    labelStyle: {
        marginLeft: moderateScale(10),
        marginBottom: moderateScale(5)
    }
})

export const InputField = ({ title = "", placeholder = "", icon, onPressIcon = () => { }, value, inputStyle = {}, labelStyle = {}, onChangeText = () => { }, keyboardType, secureTextEntry = false, maxLength, editable, reference }: { title?: string, placeholder?: string, value: string, icon?: string, onPressIcon?: any, inputStyle?: any, labelStyle?: any, onChangeText: (text: string) => void, keyboardType?: any, secureTextEntry?: boolean, maxLength?: number, editable?: boolean, reference?: any }) => {
    return (
        <View style={styles.container}>
            <Label m primary bold title={title} style={{ ...styles.labelStyle, ...labelStyle }} />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    ref={reference}
                    placeholder={placeholder}
                    placeholderTextColor={"grey"}
                    selectionColor="#000000"
                    value={value}
                    style={{ ...styles.inputStyle, ...inputStyle }}
                    maxFontSizeMultiplier={1.2}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    editable={editable}
                    autoCapitalize="none"
                    maxLength={maxLength}
                    secureTextEntry={secureTextEntry}
                    spellCheck={false}
                    autoCorrect={false}
                />
                {
                    icon &&
                    <View style={{ position: 'absolute', right: 0, alignSelf: 'center', padding: moderateScale(10) }}>
                        <EntypoIcon
                            style={{}}
                            name={icon}
                            color={theme.colors.font.primary}
                            size={moderateScale(20)}
                            onPress={onPressIcon} />
                    </View>
                }
            </View>

        </View>
    )
}