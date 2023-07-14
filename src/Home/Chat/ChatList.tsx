import React from "react"
import { FlatList, Image } from "react-native"
import { StyleSheet, View } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import { Label, Ripple } from "../../common/components"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"
import { useNavigation } from "@react-navigation/native"
import moment from "moment"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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
        width: "95%",
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

export const ChatList = () => {

    const navigation: any = useNavigation()
    const { id } = useSelector((store: any) => store.home.user)

    const usersList = useSelector((store: any) => store.home.usersList ?? {})
    const keys = Object.keys(usersList)

    const chats = useSelector((store: any) => store.home.chats ?? {})

    return (
        <View style={styles.container}>
            <View style={styles.container}>

                <FlatList
                    data={keys}
                    renderItem={({ item, index }) => {
                        if (item === id) {
                            return null
                        }
                        const user = usersList[item]
                        const userMessages = chats[`${user.id}`] ?? []
                        let unreadCount = 0
                        userMessages.map((m: any) => {
                            if (!m.read) {
                                unreadCount++
                            }
                        })
                        const lastMessage = userMessages[userMessages.length - 1] ?? {}

                        return (
                            <View style={{ flex: 0.9, marginHorizontal: moderateScale(20), flexDirection: 'row' }}>
                                <Ripple
                                    style={styles.cardStyle}
                                    onPress={() => {
                                        navigation.navigate("ChatDetails", { user })
                                    }}>
                                    {
                                        user.photo ?
                                            <Image
                                                source={{ uri: user.photo }}
                                                style={styles.cardImageStyle}
                                            />
                                            :
                                            <EmptyImageView name={user.name} style={styles.cardImageStyle} />
                                    }
                                    <View style={{ justifyContent: 'center' }}>
                                        <Label bold m primary title={user.name?.charAt(0).toUpperCase() + user.name?.slice(1)} style={{ marginLeft: moderateScale(10) }} />
                                        {
                                            lastMessage?.m &&
                                            <Label bold m primary title={lastMessage?.m.length > 20 ? lastMessage?.m.slice(0, 20) + "..." : lastMessage?.m} style={{ marginLeft: moderateScale(10), color: 'grey' }} />
                                        }
                                    </View>
                                    {lastMessage.t &&
                                        <View style={{ flex: 1, marginRight: moderateScale(20), justifyContent: 'center' }}>
                                            <Label bold right xs primary title={moment(parseInt(lastMessage.t, 10)).format("MM/DD/YY")} style={{}} />
                                            <Label bold right xs primary title={moment(parseInt(lastMessage.t, 10)).format("h:mm A")} style={{}} />
                                        </View>
                                    }

                                </Ripple>
                                {unreadCount > 0 &&
                                    <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(10) }}>
                                        <View style={{ backgroundColor: 'lightgreen', width: moderateScale(25), height: moderateScale(25), borderRadius: moderateScale(25), justifyContent: 'center', alignItems: 'center' }}>
                                            <Label bold right xs primary title={`${unreadCount}`} style={{}} />
                                        </View>
                                    </View>
                                }
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    )
}