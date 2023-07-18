import React from "react"
import { StyleSheet } from "react-native"
import { View, Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { moderateScale } from "react-native-size-matters"

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export const Chart = ({ type, data, labels = [] }: { type: string, data: any, labels: Array<string> }) => {

    return (
        <View style={styles.container}>
            <LineChart
                data={{
                    labels,
                    datasets: [
                        {
                            data: data
                        }
                    ]
                }}
                width={Dimensions.get("window").width * 0.95}
                height={moderateScale(320)}
                yAxisLabel=""
                yAxisSuffix=""
                xLabelsOffset={moderateScale(25)}
                verticalLabelRotation={270}
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#B2FEFA",
                    backgroundGradientFrom: "#232526",
                    backgroundGradientTo: "#190A05",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForLabels: {
                        fontWeight: 'bold',
                        translateX: moderateScale(2),
                        translateY: moderateScale(3)
                    },
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "green",
                    }
                }}
                bezier
                style={{
                    alignSelf: 'center',
                    marginVertical: moderateScale(0),
                    borderRadius: moderateScale(5)
                }}
            />
        </View>
    )
}