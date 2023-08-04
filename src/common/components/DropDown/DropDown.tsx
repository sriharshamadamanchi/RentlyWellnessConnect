import React from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Label } from "../Label/Label";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: 'white',
        borderRadius: moderateScale(0),
        width: moderateScale(225),
        height: moderateScale(45),
        paddingLeft: moderateScale(10),
        fontSize: moderateScale(18),
        fontWeight: "600",
        marginVertical: moderateScale(10),
        color: '#454545'
    },
    selectedTextStyle: {
        fontSize: moderateScale(16),
        fontWeight: "500",
        color: '#454545'
    },
    itemTextStyle: {
        fontSize: moderateScale(16),
        color: '#454545'
    }
})

interface dropdownType {
    style?: any,
    placeholderStyle?: any,
    selectedTextStyle?: any,
    inputSearchStyle?: any,
    iconStyle?: any,
    viewStyle?: any,
    data: Array<{ label: string, value: string }>,
    placeholder?: string,
    value: string,
    onFocus?: () => void,
    onBlur?: () => void,
    onChange: (data: any) => void,
    title?: string
}

export const DropDown = ({
    style = {},
    viewStyle = {},
    data = [],
    value,
    onFocus = () => { },
    onBlur = () => { },
    onChange = () => { },
    title
}: dropdownType) => {
    return (
        <View style={{ marginVertical: moderateScale(5), ...viewStyle }}>
            {title &&
                <Label m white bold title={title} />
            }
            <Dropdown
                style={[styles.inputContainer, style]}
                itemTextStyle={styles.itemTextStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                autoScroll={false}
                maxHeight={moderateScale(300)}
                labelField="label"
                valueField="value"
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
            />
        </View>
    )
}