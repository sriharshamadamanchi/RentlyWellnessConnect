import React from "react"
import { Image, StatusBar, StyleSheet, View } from "react-native"
import { CurvedButton, Label, PrimaryView } from "../../common/components"
import LinearGradient from "react-native-linear-gradient"
import { moderateScale } from "react-native-size-matters"
import { useDispatch, useSelector } from "react-redux"
import { logoutAction } from "../redux/actions"
import { LoadingIndicator } from "../../common/components/LoadingIndicator/LoadingIndicator"
import { loaderSelector } from "../../common/loaderRedux/selectors"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoutButtonGradientView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: moderateScale(50)
    },
    logoutButtonGradientStyle: {
        width: moderateScale(200),
        height: moderateScale(50),
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
            <Label bold primary title={title} style={{ marginBottom: moderateScale(5) }} />
            <Label underLine bold white title={value} />
        </View>
    )
}

export const AccountTab = () => {

    const dispatch = useDispatch()

    const user = useSelector((store: any) => store.home.user)
    const { loading }: { loading: boolean } = useSelector(loaderSelector("Logout"));

    return (
        <PrimaryView style={{ flex: 1, backgroundColor: '#9FE3AD' }}>
            <StatusBar backgroundColor={"#A0E3A9"} barStyle="dark-content" />
            <View style={styles.container}>
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
                                <EmptyImageView name={user.name} style={styles.imageStyle} />
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
                                title="LOGOUT"
                                bold
                                buttonStyle={{ flex: 1, width: "100%", alignSelf: "center", backgroundColor: "transparent" }}
                                onPress={() => {
                                    dispatch(logoutAction())
                                }}
                            />
                        </LinearGradient>
                    </View>
                </LinearGradient>
            </View>
        </PrimaryView>
    )
}