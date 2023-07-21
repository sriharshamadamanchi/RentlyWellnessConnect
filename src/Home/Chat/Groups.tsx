import React from "react"
import { FlatList, Image } from "react-native"
import { StyleSheet, View } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import { Label, Ripple, PrimaryView } from "../../common/components"
import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import { groupImage, teams } from "../../common/constants"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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
    cardStyle: {
        alignSelf: 'center',
        width: "100%",
        marginVertical: moderateScale(10),
        flexDirection: 'row'
    },
    emptyImageView: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
})

export const Groups = () => {

    const navigation: any = useNavigation()
    const groupChats = useSelector((store: any) => store.home.groupChats ?? {})


    return (
        <PrimaryView>
        <View style={styles.container}>
            <View style={styles.container}>

                <FlatList
                    data={teams}
                    renderItem={({ item }) => {
                        const groupMessages = groupChats[item] ?? []
                        const lastMessage = groupMessages[groupMessages.length - 1] ?? {}
                        let unreadCount = 0
                        groupMessages.map((m: any) => {
                            if (!m.read) {
                                unreadCount++
                            }
                        })

                        return (
                            <View style={{ marginHorizontal: moderateScale(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Ripple
                                    style={styles.cardStyle}
                                    onPress={() => {
                                        navigation.navigate("GroupChatDetails", { group: item })
                                    }}>
                                    <View style={{ width: "15%", marginHorizontal: moderateScale(5), alignSelf: 'center', }}>
                                        {
                                            groupImage[item] ?
                                                <Image
                                                    source={groupImage[item]}
                                                    style={styles.cardImageStyle}
                                                />
                                                :
                                                <EmptyImageView name={item} style={styles.cardImageStyle} />
                                        }
                                    </View>
                                    <View style={{ width: "55%", justifyContent: 'center' }}>
                                        <Label bold m primary title={item} style={{ marginLeft: moderateScale(10) }} />
                                        {
                                            lastMessage?.m &&
                                            <Label ellipsizeMode="end" numberOfLines={1} bold m primary title={lastMessage?.m} style={{ marginLeft: moderateScale(10), color: 'grey' }} />
                                        }
                                    </View>
                                    <View style={{ width: "20%" }}>
                                        {lastMessage.t &&
                                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <Label bold right xs primary title={moment(parseInt(lastMessage.t, 10)).format("MM/DD/YY")} style={{}} />
                                                <Label bold right xs primary title={moment(parseInt(lastMessage.t, 10)).format("h:mm A")} style={{}} />
                                            </View>
                                        }
                                    </View>
                                    <View style={{ width: '10%', alignSelf: 'center' }}>
                                        {unreadCount > 0 &&
                                            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(10) }}>
                                                <View style={{ backgroundColor: 'lightgreen', width: moderateScale(25), height: moderateScale(25), borderRadius: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                                                    <Label bold right xs primary title={`${unreadCount}`} style={{}} />
                                                </View>
                                            </View>
                                        }
                                    </View>
                                </Ripple>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
        </PrimaryView>
    )
}