import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Label } from "../common/components";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import LottieView from 'lottie-react-native';
import { AnimatedCircularProgress } from "react-native-circular-progress";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        zIndex: -10
    },
    headerStyle: {

    },
    lottieStyle: {
        alignSelf: 'center',
        height: moderateScale(200)
    },
})


export const Info = () => {
    const GOAL = 504461942
    const navigation: any = useNavigation();
    const usersList = useSelector((store: any) => store.home.usersList ?? {})
    const keys = Object.keys(usersList)

    const rankingList: any = [
        { name: "A", steps: 0 },
        { name: "B", steps: 0 },
        { name: "C", steps: 0 }
    ]

    for (let i = 0; i < keys.length; i++) {
        const userDetails = usersList[keys[i]]
        let totalSteps = 0;
        const steps = userDetails?.steps ?? []
        for (let j = 0; j < steps.length; j++) {
            totalSteps = totalSteps + parseInt((steps[j]?.count ?? 0))
        }
        if (rankingList[0].name === userDetails.team) {
            rankingList[0].steps += totalSteps
        } else if (rankingList[1].name === userDetails.team) {
            rankingList[1].steps += totalSteps
        } else if (rankingList[2].name === userDetails.team) {
            rankingList[2].steps += totalSteps
        }
    }

    rankingList.sort((a: any, b: any) => b.steps - a.steps)

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
            <SafeAreaView />
            <View style={styles.headerStyle}>
                <HeaderBackButton
                    style={{ width: moderateScale(50) }}
                    tintColor="#FFFFFF"
                    onPress={() => {
                        navigation.goBack()
                    }}
                />
            </View>
            <View>
                <Label white bold xxxl34 title="GOAL" center />
                <Label white bold xxxl title={`${GOAL} Steps`} center />
            </View>

            <LottieView
                speed={0.6}
                style={[styles.lottieStyle]}
                source={require('../../res/lottie/moonwalk.json')}
                autoPlay
                loop
            />
            <View style={{ flex: 1 }}>
                {
                    rankingList.map((team: any, index: number) => {
                        return (
                            <View style={{ margin: moderateScale(20) }} key={index}>
                                <View style={{ width: "70%", flexDirection: 'row' }}>
                                    <Label center xl primary title={`Team ${team.name} is ${GOAL - team.steps} steps away from reaching the goal`} style={{ width: "90%", paddingRight: moderateScale(0) }} />
                                    <AnimatedCircularProgress
                                        size={120}
                                        width={15}
                                        fill={100}
                                        duration={3000}
                                        tintColor="#00e0ff"
                                        onAnimationComplete={() => console.log('onAnimationComplete')}
                                        backgroundColor="#3d5875" />
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </LinearGradient>
    )
}