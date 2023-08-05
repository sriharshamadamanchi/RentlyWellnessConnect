import React from "react";
import { Label, PrimaryView } from "../common/components";
import { moderateScale } from "react-native-size-matters";
import { Platform, StyleSheet, View } from "react-native";
import { theme } from "../common/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountTab } from "./Tabs/AccountTab";
import { useDispatch, useSelector } from "react-redux";
import { Welcome } from "../Authentication/Welcome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeTab } from "./Tabs/HomeTab";
import { ActivityTab } from "./Tabs/ActivityTab";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Details } from "./Details";
import { Firestore } from "./Firestore";
import { LeaderTab } from "./LeaderBoard/LeaderTab";
import SplashScreen from "react-native-splash-screen";
import { ChatList } from "./Chat/ChatList";
import { ChatDetails } from "./Chat/ChatDetails";
import { ChatTab } from "./Chat/ChatTab";
import { reloadUserAction, storeChatsAction, storeGroupChatsAction } from "./redux/actions";
import firebase from "@react-native-firebase/firestore";
import { GroupChatDetails } from "./Chat/GroupChatDetails";
import { store } from "../common/store";
import { Login } from "../Authentication/Login";
import { Register } from "../Authentication/Register";
import { ForgotPassword } from "../Authentication/ForgotPassword";
import { EditProfile } from "../Authentication/EditProfile";
import { ChangePassword } from "../Authentication/ChangePassword";
import { UserActivityTab } from "./Tabs/UserActivityTab";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabsStyle: { flex: 1, backgroundColor: theme.colors.background.default },
    icon: {
        height: moderateScale(36),
        width: moderateScale(36)
    },
    welcomeLabelStyle: {
        margin: moderateScale(15)
    },
    teamNameStyle: {
        marginBottom: moderateScale(20)
    },
    infoIconStyle: {
        position: 'absolute',
        padding: moderateScale(10),
        right: moderateScale(90),
        bottom: moderateScale(12)
    }
});

export const HomeTabbar = () => {

    return (
        <View style={styles.tabsStyle}>
            <Tab.Navigator
                backBehavior={"initialRoute"}
                screenOptions={{
                    headerShown: false,
                    tabBarHideOnKeyboard: Platform.OS === "android",
                    tabBarActiveTintColor: "green",
                    tabBarStyle: {
                        height: Platform.OS === 'android' ? moderateScale(65) : moderateScale(90),
                        paddingTop: moderateScale(5)
                    },
                    tabBarLabel: ({ color, children }) => {
                        return (
                            <Label s bold title={children} style={{ color, paddingBottom: moderateScale(10) }} />
                        )
                    }
                }}>
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => <Icon name="home" color={focused ? "green" : "grey"} size={moderateScale(30)} />
                    }}
                    name={"DASHBOARD"}
                    component={HomeTopTabbar} />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => <MaterialIcon name="leaderboard" color={focused ? "green" : "grey"} size={moderateScale(30)} />
                    }}
                    name={"LEADERBOARD"}
                    component={LeaderTab} />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused }) => <Icon name="profile" color={focused ? "green" : "grey"} size={moderateScale(30)} />
                    }}
                    name={"PROFILE"}
                    component={AccountTab} />
            </Tab.Navigator>
        </View>
    );
}

const TopTab = createMaterialTopTabNavigator();

export const HomeTopTabbar = () => {
    const { name, id } = useSelector((store: any) => store.home.user) ?? {}
    const usersList = useSelector((store: any) => store.home.usersList ?? {})
    const user = usersList[id] ?? {}

    return (
        <PrimaryView style={{ backgroundColor: '#43C6AC' }}>
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.tabsStyle}>
                <Label bold xxl center white title={`Welcome, ${name ?? ""}`} style={styles.welcomeLabelStyle} />
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                    <Label bold xxl center white title={`Team ${user?.team ?? ""}`} style={styles.teamNameStyle} />
                </View>
                <TopTab.Navigator
                    screenOptions={{
                        swipeEnabled: false,
                        tabBarPressColor: "#CBF5DD",
                        tabBarActiveTintColor: "#0f9b0f",
                        tabBarInactiveTintColor: "black",
                        tabBarIndicatorStyle: {
                            borderBottomWidth: moderateScale(2),
                            borderBottomColor: "#0f9b0f"
                        },
                        tabBarLabel: ({ color, children }) => {
                            return (
                                <Label m bold title={children} style={{ color: color }} />
                            )
                        }
                    }}
                >
                    <TopTab.Screen
                        name={"HOME"}
                        children={() => <HomeTab />} />
                    <TopTab.Screen
                        name={"CHART"}
                        children={() => <ActivityTab />} />
                </TopTab.Navigator>
            </LinearGradient>
        </PrimaryView>
    );
}

const Stack = createStackNavigator();

export const Home = () => {

    const dispatch = useDispatch()
    const { id } = useSelector((store: any) => store.home.user) ?? {}

    const isLoggedIn = useSelector((store: any) => store.home.isLoggedIn)
    let initialRouteName = "Welcome"

    React.useEffect(() => {
        if (isLoggedIn) {
            dispatch(reloadUserAction())
        }
    }, [isLoggedIn]);

    React.useEffect(() => {
        if (isLoggedIn) {
            initialRouteName = "HomeTabbar"
        }
    }, [isLoggedIn])

    React.useEffect(() => {
        if (isLoggedIn) {
            Firestore.getUsersList()
        }
    }, [isLoggedIn])

    React.useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }, []);

    React.useEffect(() => {
        if (isLoggedIn) {
            firebase().collection("users").doc(id).onSnapshot((snapshot) => {
                try {
                    const data = snapshot.data() ?? {}
                    const keys = Object.keys(data) ?? []
                    const chats: any = {}
                    keys.map((key) => {
                        const userChats = store.getState().home?.chats ?? {}
                        const persistedChats = userChats[key] ?? []
                        const readMessages: any = {}
                        persistedChats.map((m: any) => {
                            if (m.read) {
                                readMessages[m.t] = true
                            }
                        })
                        const chat = data[key] ?? "[]"
                        chats[key] = JSON.parse(chat)
                        chats[key] = chats[key].map((message: any) => {
                            if (readMessages[message.t]) {
                                return { ...message, read: true }
                            }
                            return message;
                        })
                    })

                    console.log("snapshot updated!!")

                    dispatch(storeChatsAction({ chats }))
                } catch (err) {
                    console.log("error in user chat", err)
                }
            })
        }
    }, [id, isLoggedIn])

    React.useEffect(() => {
        if (isLoggedIn) {
            firebase().collection("users").doc("groupChats").onSnapshot((snapshot) => {
                try {
                    const data = snapshot.data() ?? {}
                    const keys = Object.keys(data) ?? []
                    const chats: any = {}
                    keys.map((key) => {
                        const userChats = store.getState().home?.groupChats ?? {}
                        const persistedChats = userChats[key] ?? []
                        const readMessages: any = {}
                        persistedChats.map((m: any) => {
                            if (m.read) {
                                readMessages[m.t] = true
                            }
                        })
                        const chat = data[key] ?? "[]"
                        chats[key] = JSON.parse(chat)
                        chats[key] = chats[key].map((message: any) => {
                            if (readMessages[message.t]) {
                                return { ...message, read: true }
                            }
                            return message;
                        })
                    })

                    console.log("snapshot updated!!")

                    dispatch(storeGroupChatsAction({ chats }))
                } catch (err) {
                    console.log("error in group chat", err)
                }
            })
        }
    }, [id, isLoggedIn])

    return (
        <Stack.Navigator key={initialRouteName} initialRouteName={initialRouteName}
            screenOptions={{
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerTintColor: theme.colors.font.primary,
                headerStyle: {
                    backgroundColor: theme.colors.background.default,
                    height: Platform.OS === 'android' ? moderateScale(50) : (Platform.isTV ? 80 : undefined)
                },
                headerTitleStyle: {
                    fontSize: theme.fontSizes.xl20,
                    color: theme.colors.font.primary,
                    fontFamily: theme.fonts.bold,
                    marginHorizontal: moderateScale(20),
                },
                headerTitle: ({ children }: { children: string }) => {
                    return (
                        <Label primary bold xl20 title={children} ellipsizeMode={"tail"} numberOfLines={1} style={{ marginHorizontal: moderateScale(25) }} />
                    );
                },
            }}
        >
            {
                isLoggedIn ?
                    <>
                        <Stack.Screen
                            options={{
                                headerShown: false
                            }}
                            name="HomeTabbar"
                            component={HomeTabbar}
                        />
                        <Stack.Screen
                            options={{
                                title: "Details",
                                headerStyle: {
                                    borderBottomWidth: 0,
                                    elevation: 0,
                                    shadowOpacity: 0
                                }
                            }}
                            name="Details"
                            component={Details}
                        />
                        <Stack.Screen
                            options={{
                                title: "Chat",
                                headerStyle: {
                                    borderBottomWidth: 0,
                                    elevation: 0,
                                    shadowOpacity: 0
                                }
                            }}
                            name="ChatTab"
                            component={ChatTab}
                        />
                        <Stack.Screen
                            name="Chats"
                            component={ChatList}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false
                            }}
                            name="ChatDetails"
                            component={ChatDetails}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false
                            }}
                            name="GroupChatDetails"
                            component={GroupChatDetails}
                        />
                        <Stack.Screen
                            options={{
                                title: "",
                                headerStyle: {
                                    borderBottomWidth: 0,
                                    elevation: 0,
                                    shadowOpacity: 0
                                }
                            }}
                            name="UserActivityTab"
                            component={UserActivityTab}
                        />
                        <Stack.Screen
                            options={{
                                title: "Edit Profile"
                            }}
                            name="EditProfile"
                            component={EditProfile}
                        />
                        <Stack.Screen
                            options={{
                                title: "Change Password"
                            }}
                            name="ChangePassword"
                            component={ChangePassword}
                        />
                    </>
                    :
                    <>
                        <Stack.Screen
                            options={{
                                headerShown: false
                            }}
                            name="Welcome"
                            component={Welcome}
                        />
                        <Stack.Screen
                            options={{
                                title: "Login"
                            }}
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            options={{
                                title: "Register"
                            }}
                            name="Register"
                            component={Register}
                        />
                        <Stack.Screen
                            options={{
                                title: "Forgot Password"
                            }}
                            name="ForgotPassword"
                            component={ForgotPassword}
                        />
                    </>
            }
        </Stack.Navigator>
    )
}