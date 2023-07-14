import React from "react"
import { FlatList } from "react-native"
import { StyleSheet, View } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import { Label, Ripple } from "../../common/components"
import { useNavigation } from "@react-navigation/native"
import moment from "moment"
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
        width: "90%",
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
    const { id } = useSelector((store: any) => store.home.user)

    const teams: any = [{ name: "Team A" }, { name: "Team B" }, { name: "Team C" }]
    const keys = Object.keys(teams)

    return (
        <View style={styles.container}>
                <View style={styles.container}>

                    <FlatList
                        data={keys}
                        renderItem={({ item }) => {
                            if (item === id) {
                                return null
                            }
                            const user = teams[item]
                            const userMessages = teams.filter((msg: any) => msg.to === user.id || (msg.from === user.id)) ?? []
                            const lastMessage = userMessages[userMessages.length - 1] ?? {}

                            return (
                                <Ripple
                                    style={styles.cardStyle}
                                    onPress={() => {
                                        navigation.navigate("ChatDetails", { user })
                                    }}>

                                    <EmptyImageView name={user.name} style={styles.cardImageStyle} />
                                    <View style={{ justifyContent: 'center' }}>
                                        <Label bold primary title={user.name} style={{ marginLeft: moderateScale(10) }} />
                                        {
                                            lastMessage?.message &&
                                            <Label bold m primary title={lastMessage?.message.length > 20 ? lastMessage?.message.slice(0, 20) + "..." : lastMessage?.message} style={{ marginLeft: moderateScale(10), color: 'grey' }} />
                                        }
                                    </View>
                                    {lastMessage.timestamp &&
                                        <View style={{ flex: 1, marginRight: moderateScale(20), justifyContent: 'center' }}>
                                            <Label bold right s primary title={moment(parseInt(lastMessage.timestamp, 10)).format("MM/DD/YY")} style={{}} />
                                            <Label bold right xs primary title={moment(parseInt(lastMessage.timestamp, 10)).format("h:mm A")} style={{}} />
                                        </View>
                                    }
                                </Ripple>
                            )
                        }}
                        keyExtractor={(item) => item}
                    />
                </View>
        </View>
    )
}