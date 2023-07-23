import React from "react"
import { Alert, Image, ScrollView, StatusBar, StyleSheet, View } from "react-native"
import { CurvedButton, Label, PrimaryView } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from "react-redux"
import { logoutAction } from "../redux/actions"
import { LoadingIndicator } from "../../common/components/LoadingIndicator/LoadingIndicator"
import { loaderSelector } from "../../common/loaderRedux/selectors"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"
import { theme } from "../../common/theme"
import { version } from "../../../package.json"

const styles = StyleSheet.create({
    container: {
        flex: 1
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

export const AccountTab = () => {

    const dispatch = useDispatch()

    const user = useSelector((store: any) => store.home.user)
    const { loading }: { loading: boolean } = useSelector(loaderSelector("Logout"));

    return (
        <PrimaryView style={{ flex: 1, backgroundColor: '#9FE3AD' }}>
            <StatusBar backgroundColor={"#43C6AC"} barStyle="dark-content" />
            <ScrollView style={styles.container}>
                <LoadingIndicator loading={loading} />
                <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.container}>
                    <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.topCircleStyle}>
                    </LinearGradient>
                    <View style={{ marginTop: moderateScale(125) }}>
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
                    <LinearGradient colors={["#43C6AC", '#F8FFAE']} style={styles.bottomCircleStyle}>
                    </LinearGradient>
                    <View style={styles.detailsView}>
                        <DetailsView title="NAME" value={user.name} />
                        <DetailsView title="EMAIL" value={user.email} />
                    </View>
                    <View style={styles.logoutButtonGradientView}>
                        <LinearGradient
                            colors={['#bdc3c7', '#2c3e50']}
                            style={styles.logoutButtonGradientStyle}>
                            <CurvedButton
                                title="DELETE ACCOUNT"
                                bold
                                buttonStyle={{ flex: 1, width: "100%", alignSelf: "center", backgroundColor: "transparent" }}
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
                        </LinearGradient>
                        <LinearGradient
                            colors={['#bdc3c7', '#2c3e50']}
                            style={styles.logoutButtonGradientStyle}>
                            <CurvedButton
                                title="LOGOUT"
                                bold
                                buttonStyle={{ flex: 1, width: "100%", alignSelf: "center", backgroundColor: "transparent" }}
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
                        </LinearGradient>
                    </View>
                    <Label m bold white center title={`Version ${version}`} style={{ marginBottom: moderateScale(10) }} />
                </LinearGradient>
            </ScrollView>
        </PrimaryView>
    )
}