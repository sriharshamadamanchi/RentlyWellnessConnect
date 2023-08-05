import React from "react"
import { ScrollView, StatusBar, StyleSheet, View } from "react-native"
import { Card, Label, Ripple } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import LottieView from 'lottie-react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { Image } from "react-native"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"
import { theme } from "../../common/theme"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContainer: {
        marginTop: moderateScale(20),
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: moderateScale(300),
        width: moderateScale(300),
        height: moderateScale(300)
    },
    innerContainer: {
        marginTop: moderateScale(10),
        alignSelf: 'center',
        borderRadius: moderateScale(280),
        width: moderateScale(280),
        height: moderateScale(280)
    },
    lottieStyle: {
        alignSelf: 'center',
        height: moderateScale(100)
    },
    kmView: {
        marginVertical: moderateScale(20)
    },
    rankLottieStyle: {
        alignSelf: 'center',
        width: moderateScale(70)
    },
    rankContainer: {
        alignSelf: 'center',
        marginTop: moderateScale(30)
    },
    editContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    editIconStyle: {
        position: 'absolute',
        right: moderateScale(20),
        padding: moderateScale(10)
    },
    cardImageStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(50)
    },
    cardStyle: {
        alignSelf: 'center',
        height: moderateScale(60),
        borderRadius: moderateScale(50),
        width: moderateScale(300),
        padding: 0,
        margin: 0,
        flexDirection: 'row'
    },
    rankNumberViewInCard: {
        position: 'absolute',
        right: moderateScale(5),
        justifyContent: 'center',
        alignItems: "center",
        alignSelf: 'center',
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: moderateScale(50)
    },
    chatButtonView: {
        position: 'absolute',
        right: moderateScale(20),
        bottom: moderateScale(20),
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeStyle: {
        position: 'absolute',
        justifyContent: 'center',
        right: moderateScale(15),
        bottom: moderateScale(55),
        backgroundColor: "#0b9c17",
        zIndex: 1, width: moderateScale(25),
        height: moderateScale(25),
        borderRadius: moderateScale(25)
    }

})

export const HomeTab = () => {
    const navigation: any = useNavigation()
    const isFocused = useIsFocused()
    const scrollRef: any = React.useRef()

    const user = useSelector((store: any) => store.home.user) ?? {}
    const usersList = useSelector((store: any) => store.home.usersList ?? {})
    const chats = useSelector((store: any) => store.home.chats ?? {})
    const groupChats = useSelector((store: any) => store.home.groupChats ?? {})

    const keys = Object.keys(usersList)

    const rankingList = []

    for (let i = 0; i < keys.length; i++) {
        const userDetails = usersList[keys[i]]
        let totalSteps = 0;
        const steps = userDetails?.steps ?? []
        for (let j = 0; j < steps.length; j++) {
            totalSteps = totalSteps + parseInt((steps[j]?.count ?? 0))
        }
        rankingList.push({ ...userDetails, totalSteps })
    }

    rankingList.sort((a: any, b: any) => b.totalSteps - a.totalSteps)

    let myRank = rankingList.findIndex((list: any) => list.id === user.id)
    if (myRank === -1) {
        myRank = rankingList.length + 1
    } else {
        myRank = myRank + 1
    }

    let totalSteps = 0

    const userActivity = usersList[user.id] ?? {}
    const steps = [...(userActivity.steps ?? [])]
    steps.map((obj: any) => {
        totalSteps = totalSteps + parseInt(obj.count)
    })

    let unreadCount = 0;
    Object.keys(chats).map((id: string) => {
        const messages = chats[id] ?? []
        messages.map((m: any) => {
            if (!m.read) {
                unreadCount++
            }
        })
    })

    Object.keys(groupChats).map((id: string) => {
        const messages = groupChats[id] ?? []
        messages.map((m: any) => {
            if (!m.read) {
                unreadCount++
            }
        })
    })

    React.useEffect(() => {
        if (isFocused) {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ animated: true, y: 0 });
            }
        }
    }, [isFocused])

    return (
        <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
            <StatusBar backgroundColor={"#43C6AC"} barStyle="dark-content" />
            <ScrollView ref={scrollRef} style={styles.container}>
                <View style={styles.mainContainer}>
                    <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.innerContainer}>

                        <LottieView
                            speed={0.6}
                            style={[styles.lottieStyle]}
                            source={require('../../../res/lottie/walking.json')}
                            autoPlay
                            loop
                        />

                        <View style={styles.editContainer}>
                            <View>
                                <Label ellipsizeMode="end" numberOfLines={1} maxFontSizeMultiplier={1.1} bold xxxl center white title={`${totalSteps}`} style={{ width: moderateScale(150) }} />
                                <Label maxFontSizeMultiplier={1.1} bold m center white title={"Total steps"} />
                            </View>
                            <Icon
                                name="edit"
                                color="white"
                                size={moderateScale(30)}
                                style={styles.editIconStyle}
                                onPress={() => {
                                    navigation.navigate("Details")
                                }} />
                        </View>
                        <View style={styles.kmView}>
                            <Label style={{ width: moderateScale(200) }} ellipsizeMode="end" numberOfLines={1} maxFontSizeMultiplier={1.1} bold xxxl center white title={`${Math.round(totalSteps * 0.0008 * 100) / 100}`} />
                            <Label maxFontSizeMultiplier={1.1} bold m center white title={"Total kilometers"} />
                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.rankContainer}>
                    <Card disabled style={styles.cardStyle}>
                        <View style={{ marginLeft: moderateScale(5), justifyContent: 'center' }}>
                            {
                                user.photo ?
                                    <Image
                                        source={{ uri: user.photo }}
                                        style={styles.cardImageStyle}
                                    />
                                    :
                                    <EmptyImageView name={user.name} style={styles.cardImageStyle} labelStyle={{ fontSize: theme.fontSizes.xxl }} />
                            }
                        </View>
                        <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                            <Label center bold m primary title={"Your current rank"} />
                        </View>
                        <LinearGradient colors={["#200122", '#6f0000']} style={styles.rankNumberViewInCard}>
                            <Label center bold white title={`${myRank}`} />
                        </LinearGradient>
                    </Card>
                    <LottieView
                        speed={0.6}
                        style={[styles.rankLottieStyle]}
                        source={require('../../../res/lottie/rank.json')}
                        autoPlay
                        loop
                    />
                </View>
                {unreadCount > 0 &&
                    <View style={styles.badgeStyle}>
                        <Label white bold xs center title={`${unreadCount > 99 ? ">99" : unreadCount}`} />
                    </View>
                }
                <LinearGradient colors={["#200122", '#6f0000']} style={styles.chatButtonView}>
                    <Ripple
                        style={{ flex: 1, width: "100%", justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                            navigation.navigate("ChatTab")
                        }}>
                        <EntypoIcon
                            name="chat"
                            color="white"
                            size={moderateScale(20)} />
                    </Ripple>
                </LinearGradient>
            </ScrollView>
        </LinearGradient>
    )
}