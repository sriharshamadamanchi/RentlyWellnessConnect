import React from "react"
import { FlatList, Image, StyleSheet, TextInput, View } from "react-native"
import { moderateScale } from "react-native-size-matters"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { Card, Label, PrimaryView } from "../../common/components"
import { readMessageAction, sendMessageAction } from "../redux/actions"
import { HeaderBackButton } from "@react-navigation/elements"
import { useNavigation } from "@react-navigation/native"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"
import { StatusBar } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: moderateScale(10)
    },
    textInputStyle: {
        backgroundColor: 'white',
        borderRadius: moderateScale(50),
        width: "80%",
        height: moderateScale(45),
        paddingHorizontal: moderateScale(20),
        fontSize: moderateScale(16),
        fontWeight: "400",
        marginHorizontal: moderateScale(10),
        color: '#454545',
    },
    inputContainer: {
        justifyContent: 'flex-start',
        alignItems: "center",
        flexDirection: 'row',
    },
    myCardViewContainer: {
        flexDirection: 'row-reverse',
        marginLeft: moderateScale(10)
    },
    cardViewContainer: {
        flexDirection: 'row',
        marginLeft: moderateScale(10)
    },
    cardContainer: {
        borderRadius: moderateScale(5),
        padding: moderateScale(5),
        paddingHorizontal: moderateScale(10)
    },
    imageStyle: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(30)
    }

})

const SendMessage = ({ from, to, token, value, setMessage }: { from: string, to: string, token: string, value: string, setMessage: any }) => {

    const dispatch = useDispatch();

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Type..."
                placeholderTextColor={"grey"}
                value={value}
                style={styles.textInputStyle}
                onChangeText={(text: string) => {
                    setMessage(text)
                }}
            />
            <Ionicons
                name={"send"}
                color="#000000"
                style={{ position: 'absolute', right: 0, padding: moderateScale(20) }}
                size={moderateScale(30)}
                onPress={() => {
                    const message = String(value).trim()
                    if (message === "") {
                        return
                    }
                    setMessage("")
                    dispatch(sendMessageAction({ token, from, to, message, timestamp: moment().valueOf() }))
                }} />
        </View>
    )
}

const Header = ({ title, photo }: { title: string, photo: string }) => {
    const navigation = useNavigation()

    return (
        <View style={styles.headerContainer}>
            <HeaderBackButton
                tintColor="#000000"
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <View style={{ marginRight: moderateScale(10) }}>
                {
                    photo ?
                        <Image
                            source={{ uri: photo }}
                            style={styles.imageStyle}
                        />
                        :
                        <EmptyImageView name={title} style={styles.imageStyle} />
                }
            </View>
            <Label xl bold primary title={title} style={{ width: moderateScale(250) }} />
        </View>
    )
}

export const ChatDetails = ({ navigation, route: { params = {} } }: any) => {

    const dispatch = useDispatch();
    const user = params.user ?? {}
    const token = user.token
    const { id } = useSelector((store: any) => store.home.user)
    const chats = useSelector((store: any) => store.home.chats ?? {})

    const flatListRef: any = React.useRef(null);
    const [message, setMessage] = React.useState("")

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: user?.name ?? "Chat"
        })
    }, [])

    const userMessages = chats[user.id] ?? []
    const messageIds = (userMessages?.filter((msg: any) => !msg.read) ?? [])?.map((msg: any) => msg.t) ?? []

    React.useEffect(() => {
        dispatch(readMessageAction({ messageIds }))
    }, [dispatch, messageIds.length])

    return (
        <PrimaryView>
            <View style={styles.container}>
                <StatusBar backgroundColor={"#F2F2F2"} barStyle="dark-content" />
                <Header title={user.name} photo={user.photo} />
                <View
                    style={{ flex: 0.9 }}>
                    <FlatList
                        inverted
                        ref={flatListRef}
                        data={[...userMessages].reverse()}
                        onContentSizeChange={() =>
                            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
                        }
                        renderItem={({ item }) => {
                            const byMe = item.f === id;
                            return (
                                <View style={byMe ? styles.myCardViewContainer : styles.cardViewContainer}>
                                    <Card disabled style={styles.cardContainer}>
                                        <Label primary title={item.m} />
                                        {item.t &&
                                            <Label xs right primary title={moment(parseInt(item.t, 10)).format("h:mm A")} style={{ paddingLeft: moderateScale(30) }} />
                                        }
                                    </Card>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={{ flex: 0.1, justifyContent: 'center' }}>
                    <SendMessage from={id} to={user.id} token={token} value={message} setMessage={setMessage} />
                </View>
            </View>
        </PrimaryView>
    )
}