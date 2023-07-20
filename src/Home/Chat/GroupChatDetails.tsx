import React from "react"
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from "react-native"
import { moderateScale } from "react-native-size-matters"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import { Card, Label, PrimaryView } from "../../common/components"
import { readGroupMessageAction, sendMessageAction } from "../redux/actions"
import { HeaderBackButton } from "@react-navigation/elements"
import { useNavigation } from "@react-navigation/native"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"
import { StatusBar } from "react-native"
import { groupImage } from "../../common/constants"

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
        marginVertical: moderateScale(20)
    },
    myCardViewContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft: moderateScale(10)
    },
    cardViewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: moderateScale(10)
    },
    cardContainer: {
        borderRadius: moderateScale(5),
        padding: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        maxWidth: "80%",
        marginLeft: moderateScale(5)
    },
    imageStyle: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(30)
    },
    userImageStyle: {
        width: moderateScale(30),
        height: moderateScale(30),
        borderRadius: moderateScale(30)
    }
})

const SendMessage = ({ from, to, value, setMessage }: { from: string, to: string, value: string, setMessage: any }) => {

    const dispatch = useDispatch();

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ ios: moderateScale(50), android: 0 })}
            behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Type..."
                    placeholderTextColor={"grey"}
                    selectionColor="#000000"
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
                        dispatch(sendMessageAction({ group: true, from, to, message, timestamp: moment().valueOf() }))
                    }} />
            </View>
        </KeyboardAvoidingView>
    )
}

const Header = ({ title, photo }: { title: string, photo: any }) => {
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
                            source={photo}
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

export const GroupChatDetails = ({ navigation, route: { params = {} } }: any) => {

    const dispatch = useDispatch();
    const group = params.group
    const user = useSelector((store: any) => store.home.user) ?? {}
    const groupChats = useSelector((store: any) => store.home.groupChats ?? {})
    const usersList = useSelector((store: any) => store.home.usersList ?? {})

    const flatListRef: any = React.useRef(null);
    const [message, setMessage] = React.useState("")

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: group
        })
    }, [])

    const groupMessages = groupChats[group] ?? []
    const messageIds = (groupMessages?.filter((msg: any) => !msg.read) ?? [])?.map((msg: any) => msg.t) ?? []

    React.useEffect(() => {
        dispatch(readGroupMessageAction({ group, messageIds }))
    }, [dispatch, messageIds.length])

    return (
        <PrimaryView>
            <View style={styles.container}>
                <StatusBar backgroundColor={"#F2F2F2"} barStyle="dark-content" />
                <Header title={group} photo={groupImage[group]} />
                <View
                    style={{ flex: 1 }}>
                    <FlatList
                        inverted
                        ref={flatListRef}
                        data={[...groupMessages].reverse()}
                        onContentSizeChange={() =>
                            flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
                        }
                        renderItem={({ item }) => {
                            const byMe = item.f === user.id;
                            return (
                                <View style={byMe ? styles.myCardViewContainer : styles.cardViewContainer}>
                                    {!byMe &&
                                        <>
                                            {
                                                usersList[item.f]?.photo ?
                                                    <Image
                                                        source={{ uri: usersList[item.f]?.photo }}
                                                        style={styles.userImageStyle}
                                                    />
                                                    :
                                                    <EmptyImageView name={usersList[item.f]?.name} style={styles.userImageStyle} />
                                            }
                                        </>
                                    }
                                    <Card disabled style={styles.cardContainer}>
                                        <Label bold xs primary title={byMe ? "You" : usersList[item.f]?.name} />
                                        <Label m primary title={item.m} />
                                        {item.t &&
                                            <Label xs right primary title={moment(parseInt(item.t, 10)).format("h:mm A")} style={{ paddingLeft: moderateScale(30) }} />
                                        }
                                    </Card>
                                    {byMe &&
                                        <>
                                            {
                                                usersList[item.f]?.photo ?
                                                    <Image
                                                        source={{ uri: usersList[item.f]?.photo }}
                                                        style={styles.userImageStyle}
                                                    />
                                                    :
                                                    <EmptyImageView name={user.name} style={styles.userImageStyle} />
                                            }
                                        </>
                                    }
                                </View>
                            )
                        }}
                    />
                </View>
                <SendMessage from={user.id} to={group} value={message} setMessage={setMessage} />
            </View>
        </PrimaryView>
    )
}