import React from "react"
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native"
import { GradientButton, Label, PrimaryView } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from "react-redux"
import { logoutAction } from "../redux/actions"
import { LoadingIndicator } from "../../common/components/LoadingIndicator/LoadingIndicator"
import { loaderSelector } from "../../common/loaderRedux/selectors"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"
import { theme } from "../../common/theme"
import { version } from "../../../package.json"
import { useIsFocused, useNavigation } from "@react-navigation/native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: moderateScale(10)
    },
    logoutButtonGradientView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: moderateScale(30)
    },
    logoutButtonGradientStyle: {
        width: moderateScale(200),
        height: moderateScale(50),
        marginVertical: moderateScale(15),
        borderRadius: moderateScale(10)
    },
    topCircleStyle: {
        alignSelf: 'center',
        width: moderateScale(400),
        height: moderateScale(400),
        borderRadius: moderateScale(400),
        backgroundColor: "white",
        position: 'absolute',
        top: moderateScale(-200)
    },
    bottomCircleStyle: {
        alignSelf: 'center',
        width: moderateScale(400),
        height: moderateScale(400),
        borderRadius: moderateScale(400),
        backgroundColor: "white",
        position: 'absolute',
        bottom: moderateScale(-200)
    },
    imageStyle: {
        width: moderateScale(125),
        height: moderateScale(125),
        borderRadius: moderateScale(125),
        alignSelf: 'center',
    },
    detailsView: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: moderateScale(250)
    },
    detailsContainer: {
        alignItems: 'center',
        marginTop: moderateScale(30)
    }
})

const DetailsView = ({ title, value }: { title: string, value: string }) => {
    return (
        <View style={styles.detailsContainer}>
            <Label center bold primary title={title} style={{ marginBottom: moderateScale(5) }} />
            <Label center underLine bold white title={value} />
        </View>
    )
}

export const ProfileTab = () => {

    const dispatch = useDispatch()
    const navigation: any = useNavigation();
    const isFocused = useIsFocused()
    const scrollRef: any = React.useRef()
    const admin = useSelector((store: any) => store.home.remoteConfig?.admin?.keys) ?? []
    const user = useSelector((store: any) => store.home.user)
    const isUserAdmin = admin.includes(user.email)
    const { loading }: { loading: boolean } = useSelector(loaderSelector("Logout"));

    React.useEffect(() => {
        if (isFocused) {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ animated: true, y: 0 });
            }
        }
    }, [isFocused])

    return (
        <PrimaryView style={{ backgroundColor: '#43C6AC' }}>
            <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} style={styles.container}>
                    <LoadingIndicator loading={loading} />
                    <View style={{ marginTop: moderateScale(15) }}>
                        {
                            user.photo ?
                                <Image
                                    source={{ uri: user.photo }}
                                    style={styles.imageStyle}
                                />
                                :
                                <EmptyImageView name={user.name} style={styles.imageStyle} labelStyle={{ fontSize: theme.fontSizes.xl5 }} />
                        }
                    </View>
                    <View style={styles.detailsView}>
                        <DetailsView title="NAME" value={user.name} />
                        <DetailsView title="EMAIL" value={user.email} />
                    </View>
                    <View style={styles.logoutButtonGradientView}>

                        <GradientButton
                            colors={['#bdc3c7', '#2c3e50']}
                            title="EDIT PROFILE"
                            bold
                            m
                            buttonStyle={styles.logoutButtonGradientStyle}
                            onPress={() => {
                                navigation.navigate("EditProfile")
                            }} />

                        <GradientButton
                            colors={['#bdc3c7', '#2c3e50']}
                            title="CHANGE PASSWORD"
                            bold
                            m
                            buttonStyle={styles.logoutButtonGradientStyle}
                            onPress={() => {
                                navigation.navigate("ChangePassword")
                            }} />

                        <GradientButton
                            colors={['#bdc3c7', '#2c3e50']}
                            title="DELETE ACCOUNT"
                            bold
                            m
                            buttonStyle={styles.logoutButtonGradientStyle}
                            onPress={() => {
                                Alert.alert('Delete Account', 'Are you sure you want to delete account ?', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Yes', onPress: async () => {
                                            dispatch(logoutAction({ deleteAccount: true }))
                                        }
                                    },
                                ]);
                            }}
                        />

                        <GradientButton
                            colors={['#bdc3c7', '#2c3e50']}
                            title="LOGOUT"
                            bold
                            m
                            buttonStyle={styles.logoutButtonGradientStyle}
                            onPress={() => {
                                Alert.alert('Logout', 'Are you sure you want to logout ?', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Yes', onPress: async () => {
                                            dispatch(logoutAction())
                                        }
                                    },
                                ]);
                            }}
                        />
                    </View>
                    {
                        isUserAdmin &&
                        <Label bold center title="You are an admin" style={{ color: 'red' }} />
                    }
                    <Label m bold primary center title={`Version ${version}`} style={{ marginBottom: moderateScale(10) }} />
                </ScrollView>
            </LinearGradient>
        </PrimaryView>
    )
}