import React from "react"
import { Dimensions, FlatList } from "react-native"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import { Card, Divider, Label } from "../../common/components"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { groupImage, teams } from "../../common/constants"
import { Image } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rankSuperContainer: {
        margin: moderateScale(10),
        marginTop: moderateScale(30),
        height: moderateScale(200)
    },
    rankMainContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rankContainer: {
        borderRadius: moderateScale(150),
        borderWidth: moderateScale(4),
        borderColor: 'yellow',
        backgroundColor: 'yellow'
    },
    firstRankBackground: {
        borderColor: 'yellow',
        backgroundColor: 'yellow'
    },
    secondRankBackground: {
        borderColor: 'cyan',
        backgroundColor: 'cyan'
    },
    thirdRankBackground: {
        borderColor: 'pink',
        backgroundColor: 'pink'
    },
    rankView: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        bottom: moderateScale(10)
    },
    secondRankStyle: {
        position: 'absolute',
        top: moderateScale(100),
        marginLeft: moderateScale(5)
    },
    thirdRankStyle: {
        position: 'absolute',
        right: 0,
        top: moderateScale(100),
        marginRight: moderateScale(5)
    },
    imageStyle: {
        width: moderateScale(80),
        height: moderateScale(80),
        borderRadius: moderateScale(80),
        alignSelf: 'center'
    },
    cardImageStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(50)
    },
    teamNameViewStyle: {
        position: 'absolute',
        left: 0,
        width: moderateScale(60),
        height: moderateScale(60),
        borderBottomRightRadius: moderateScale(60)
    },
    cardStyle: {
        alignSelf: 'center',
        height: moderateScale(200),
        borderRadius: moderateScale(10),
        width: moderateScale(300),
        padding: 0,
        margin: 0
    },
    rankNumberViewInCard: {
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: "center",
        width: moderateScale(60),
        height: moderateScale(60),
        borderBottomLeftRadius: moderateScale(60)
    },
    emptyImageView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
})

const RankView = ({ rank, userDetails }: { rank: string, userDetails: any }) => {
    let style = {}
    let imageStyle = {}
    if (rank === "1") {
        style = styles.firstRankBackground
        imageStyle = styles.imageStyle
    } else if (rank === "2") {
        style = styles.secondRankBackground
        imageStyle = styles.cardImageStyle
    } else {
        style = styles.thirdRankBackground
        imageStyle = styles.cardImageStyle
    }

    return (
        <View style={styles.rankMainContainer}>
            <View style={{ ...styles.rankContainer, ...style }}>
                <Image source={groupImage[userDetails.name]} style={imageStyle} />
            </View>
            <View style={{ ...styles.rankView, ...style }}>
                <Label s bold primary center title={rank} />
            </View>
            <Label s bold white center title={`Team ${userDetails.name}`} style={{ width: moderateScale(100), bottom: moderateScale(12) }} />
        </View>
    )
}

const EmptyImageView = ({ name = "", style = {}, labelStyle = {} }: { name: string, style: any, labelStyle?: any }) => {

    const nameSplit = name.split(" ")
    let formattedName = ""
    if (nameSplit.length > 0) {
        formattedName = formattedName + nameSplit[0].charAt(0).toUpperCase()
    }
    if (nameSplit.length > 1) {
        formattedName = formattedName + nameSplit[1].charAt(0).toUpperCase()
    }
    return (
        <LinearGradient colors={["#200122", '#6f0000']} style={{ ...styles.emptyImageView, ...style }}>
            <Label xl bold white center title={formattedName} style={labelStyle} />
        </LinearGradient>
    )
}


export const TeamRank = () => {
    const GOAL = 504461942
    const usersList = useSelector((store: any) => store.home.usersList ?? {})
    const keys = Object.keys(usersList)

    const rankingList: any = teams.map((team) => {
        return { name: team, steps: 0 }
    })

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
    const isFirstRankPresent = rankingList.length > 0
    const isSecondRankPresent = rankingList.length > 1
    const isThirdRankPresent = rankingList.length > 2


    return (
        <View style={styles.container}>
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <View style={styles.container}>

                    <FlatList
                        data={rankingList}
                        ListHeaderComponent={() => {
                            return (
                                <>
                                    <View style={styles.rankSuperContainer}>

                                        {isFirstRankPresent &&
                                            <RankView rank="1" userDetails={rankingList[0]} />
                                        }
                                        {isSecondRankPresent && isThirdRankPresent &&
                                            <>
                                                <View style={styles.secondRankStyle}>
                                                    <RankView rank="2" userDetails={rankingList[1]} />
                                                </View>

                                                <View style={styles.thirdRankStyle}>
                                                    <RankView rank="3" userDetails={rankingList[2]} />
                                                </View>
                                            </>
                                        }
                                    </View>

                                    <Divider style={{ backgroundColor: 'white', marginTop: moderateScale(10), marginBottom: moderateScale(30), alignSelf: 'center', width: Dimensions.get("window").width * 0.8 }} />
                                    <Label underLine white bold xl title={`GOAL: ${GOAL} Steps`} center style={{ marginBottom: moderateScale(20) }} />
                                </>
                            )
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <Card disabled style={styles.cardStyle}>
                                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                                        <Label underLine center bold primary title={`Team ${item.name}`} />
                                        <Label center bold s primary title={`Total steps: ${item.steps}`} />
                                        <Label center bold s primary title={`Remaining steps: ${GOAL - item.steps}`} />
                                    </View>
                                    <LinearGradient colors={["#200122", '#6f0000']} style={styles.rankNumberViewInCard}>
                                        <Label center bold white title={`${index + 1}`} style={{ paddingLeft: moderateScale(10), paddingBottom: moderateScale(10) }} />
                                    </LinearGradient>
                                    <View style={{ alignSelf: 'center', width: moderateScale(100) }}>
                                        <AnimatedCircularProgress
                                            size={moderateScale(100)}
                                            width={moderateScale(15)}
                                            fill={((item.steps / GOAL) * 100)}
                                            duration={3000}
                                            tintColor="cyan"
                                            style={{ alignSelf: 'center' }}
                                            onAnimationComplete={() => console.log('onAnimationComplete')}
                                            backgroundColor="black" />
                                        <Label primary center title={`${((item.steps / GOAL) * 100).toFixed(1)}%`} style={{ position: "absolute", top: moderateScale(40) }} />
                                    </View>
                                </Card>
                            )
                        }}
                        keyExtractor={(item, index) => `${index}.${item.name}`}
                    />
                </View>
            </LinearGradient>
        </View>
    )
}