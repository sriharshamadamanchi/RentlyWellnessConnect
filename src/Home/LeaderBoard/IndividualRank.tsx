import React from "react"
import { Dimensions, Image, Keyboard, RefreshControl, TextInput } from "react-native"
import { StyleSheet, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import { Card, Divider, Label } from "../../common/components"
import { KeyboardAvoidingView } from "react-native"
import { Platform } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from "../../common/constants"
import { theme } from "../../common/theme"
import { DropDown } from "../../common/components/DropDown/DropDown"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rankSuperContainer: {
        margin: moderateScale(10),
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
    smallImageStyle: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(50),
        alignSelf: 'center'
    },
    cardStyle: {
        alignSelf: 'center',
        borderRadius: moderateScale(60),
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
    emptyImageView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    },
    inputContainer: {
        alignSelf: 'center',
        alignItems: "center",
        flexDirection: 'row',
        margin: moderateScale(20),
        width: moderateScale(200),
        height: moderateScale(45),
        borderRadius: moderateScale(50),
        backgroundColor: "#FFFFFF"
    },
    textInputStyle: {
        backgroundColor: '#FFFFFF',
        borderRadius: moderateScale(50),
        width: "80%",
        height: moderateScale(40),
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        marginVertical: moderateScale(5),
        fontSize: moderateScale(16),
        fontFamily: theme.fonts.medium,
        marginHorizontal: moderateScale(10),
        color: theme.colors.font.primary
    },
    filterContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(20)
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

    const fontSize = rank === "1" ? theme.fontSizes.xxxl34 : theme.fontSizes.xxl

    return (
        <View style={styles.rankMainContainer}>
            <View style={{ ...styles.rankContainer, ...style }}>
                {
                    userDetails.photo ?
                        <Image
                            source={{ uri: userDetails.photo }}
                            style={rank === "1" ? styles.imageStyle : styles.smallImageStyle}
                        />
                        :
                        <EmptyImageView name={userDetails.name} style={imageStyle} labelStyle={{ fontSize }} />
                }
            </View>
            <View style={{ ...styles.rankView, ...style }}>
                <Label s bold primary center title={rank} />
            </View>
            <Label s bold primary center title={userDetails.name} style={{ width: moderateScale(100), bottom: moderateScale(12) }} />
        </View>
    )
}

export const EmptyImageView = ({ name = "", style = {}, labelStyle = {} }: { name: string, style: any, labelStyle: any }) => {

    const nameSplit = name?.split(" ") ?? []
    let formattedName = ""
    if (nameSplit.length > 0) {
        formattedName = formattedName + nameSplit[0]?.charAt(0)?.toUpperCase()
    }
    if (nameSplit.length > 1) {
        formattedName = formattedName + nameSplit[1]?.charAt(0)?.toUpperCase()
    }
    return (
        <View style={[styles.emptyImageView, style, { backgroundColor: colors[name?.charAt(0)?.toUpperCase()] }]}>
            <Label white center title={name?.charAt(0)?.toUpperCase() ?? ""} bold style={{ ...labelStyle, marginBottom: moderateScale(Platform.OS === "android" ? 3 : 0) }} />
        </View>
    )
}

const Search = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: any }) => {

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ ios: moderateScale(50), android: 0 })}
            behavior={Platform.OS === "ios" ? "padding" : undefined} >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={"grey"}
                    value={searchQuery}
                    selectionColor="#000000"
                    autoCapitalize="none"
                    maxFontSizeMultiplier={1.2}
                    style={styles.textInputStyle}
                    onChangeText={(text: string) => {
                        setSearchQuery(text)
                    }}
                />
                <Ionicons
                    name={searchQuery.trim() !== "" ? "close" : "search"}
                    color="#000000"
                    style={{ position: 'absolute', right: 0, padding: moderateScale(10) }}
                    size={moderateScale(20)}
                    onPress={() => {
                        if (searchQuery.trim() !== "") {
                            setSearchQuery("")
                        } else {
                            Keyboard.dismiss()
                        }
                    }} />
            </View>
        </KeyboardAvoidingView>
    )
}

const data = [
    { label: 'All', value: 'All' },
    { label: 'Luna', value: 'Luna' },
    { label: 'Apollo', value: 'Apollo' },
    { label: 'Ranger', value: 'Ranger' }
];

export const IndividualRank = () => {

    const navigation: any = useNavigation()
    const isFocused = useIsFocused()
    const user = useSelector((store: any) => store.home.user) ?? {}
    const usersList = useSelector((store: any) => store.home.usersList ?? {})
    const [searchQuery, setSearchQuery] = React.useState("")
    const keys = Object.keys(usersList)
    const [team, setTeam] = React.useState(data[0].value)

    const [rankingList, setRankingList] = React.useState([])

    React.useEffect(() => {
        const list: any = []
        for (let i = 0; i < keys.length; i++) {
            const userDetails = usersList[keys[i]] ?? {}
            let totalSteps = 0;
            const steps = userDetails?.steps ?? []
            for (let j = 0; j < steps.length; j++) {
                totalSteps = totalSteps + parseInt((steps[j]?.count ?? 0))
            }
            list.push({ ...userDetails, totalSteps })
        }

        list.sort((a: any, b: any) => b.totalSteps - a.totalSteps)
        if (team === "All") {
            setRankingList(list)
        } else {
            setRankingList(list.filter((data: any) => data.team === team))
        }
    }, [team, user.name])


    const isFirstRankPresent = rankingList.length > 0
    const isSecondRankPresent = rankingList.length > 1
    const isThirdRankPresent = rankingList.length > 2

    let myRank = rankingList.findIndex((list: any) => list.id === user.id)
    if (myRank === -1) {
        myRank = rankingList.length + 1
    } else {
        myRank = myRank + 1
    }

    const [filteredRanks, setFilteredRanks]: any = React.useState([])

    React.useEffect(() => {

        const filter: any = []
        Object.keys(usersList).map((id: any) => {
            const name = (usersList[id]?.name ?? "").toLowerCase()
            if (name.includes(searchQuery.toLowerCase()) && (usersList[id]?.team === team || team === "All")) {
                filter.push(id)
            }
        })

        setFilteredRanks(filter)

    }, [searchQuery, team])

    React.useEffect(() => {
        if (isFocused) {
            setSearchQuery("")
            setTeam(data[0].value)
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.filterContainer}>
                        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        <DropDown
                            data={data}
                            value={team}
                            onChange={({ value }) => {
                                setTeam(value)
                            }}
                            viewStyle={{ alignSelf: "center" }}
                            style={{ width: moderateScale(110) }}
                        />
                    </View>
                    {searchQuery && filteredRanks.length === 0 &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Label xl bold white title="No Users Found!!" />
                        </View>
                    }
                    <FlashList
                        estimatedItemSize={200}
                        data={[...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList, ...rankingList,...rankingList,...rankingList,...rankingList,...rankingList]}
                        refreshControl={<RefreshControl refreshing={false} onRefresh={() => {
                            const list: any = []
                            for (let i = 0; i < keys.length; i++) {
                                const userDetails = usersList[keys[i]] ?? {}
                                let totalSteps = 0;
                                const steps = userDetails?.steps ?? []
                                for (let j = 0; j < steps.length; j++) {
                                    totalSteps = totalSteps + parseInt((steps[j]?.count ?? 0))
                                }
                                list.push({ ...userDetails, totalSteps })
                            }

                            list.sort((a: any, b: any) => b.totalSteps - a.totalSteps)
                            if (team === "All") {
                                setRankingList(list)
                            } else {
                                setRankingList(list.filter((data: any) => data.team === team))
                            }
                        }} />}
                        ListHeaderComponent={() => {
                            if (searchQuery) {
                                return null
                            }
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

                                    <Divider style={{ backgroundColor: 'white', marginBottom: moderateScale(20), alignSelf: 'center', width: Dimensions.get("window").width * 0.8 }} />
                                </>
                            )
                        }}
                        renderItem={({ item, index }: any) => {
                            if (!(filteredRanks.includes(item.id))) {
                                return null
                            }
                            return (
                                <Card style={styles.cardStyle}
                                    onPress={() => {
                                        navigation.navigate("UserActivityTab", { user: item })
                                    }}>
                                    <View style={{ marginLeft: moderateScale(5), justifyContent: 'center' }}>
                                        {
                                            item.photo ?
                                                <Image
                                                    source={{ uri: item.photo }}
                                                    style={styles.cardImageStyle}
                                                />
                                                :
                                                <EmptyImageView name={item.name} style={styles.cardImageStyle} labelStyle={{ fontSize: theme.fontSizes.xxl }} />
                                        }
                                    </View>

                                    <View style={{ flex: 0.8, padding: moderateScale(5), justifyContent: 'center', alignItems: 'center' }}>
                                        <Label center bold m primary title={item.name} />
                                        <Label style={{ width: "90%" }} center bold s primary title={`${item.totalSteps} steps`} />
                                        {item.team &&
                                            <Label center bold m primary title={`Team: ${item.team}`} />
                                        }
                                    </View>
                                    <LinearGradient colors={["#200122", '#6f0000']} style={styles.rankNumberViewInCard}>
                                        <Label center bold white title={`${index + 1}`} />
                                    </LinearGradient>
                                </Card>
                            )
                        }}
                        keyExtractor={(item: any, index: number) => `${index}.${item.id}`}
                    />
                </View>
            </LinearGradient>
        </View>
    )
}