import React from "react"
import { FlatList, Image, Keyboard } from "react-native"
import { StyleSheet, View } from "react-native"
import { moderateScale } from "react-native-size-matters"
import { useSelector } from "react-redux"
import { Label, Ripple } from "../../common/components"
import { EmptyImageView } from "../LeaderBoard/IndividualRank"
import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import { KeyboardAvoidingView } from "react-native"
import { Platform } from "react-native"
import { TextInput } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from "../../common/theme"

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
    width: "100%",
    marginVertical: moderateScale(10),
    flexDirection: 'row'
  },
  emptyImageView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  inputContainer: {
    alignSelf: 'center',
    alignItems: "center",
    flexDirection: 'row',
    marginVertical: moderateScale(20),
    borderWidth: 1,
    borderColor: "#000000",
    width: "75%",
    height: moderateScale(45),
    borderRadius: moderateScale(50)
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
    fontWeight: "400",
    marginHorizontal: moderateScale(10),
    color: '#454545',
  }
})

const Search = ({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: any }) => {

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: moderateScale(50), android: 0 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"} >
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
          name={"search"}
          color="#000000"
          style={{ position: 'absolute', right: 0, padding: moderateScale(10) }}
          size={moderateScale(20)}
          onPress={() => {
            Keyboard.dismiss()
          }} />
      </View>
    </KeyboardAvoidingView>
  )
}

export const ChatList = () => {

  const navigation: any = useNavigation()
  const { id } = useSelector((store: any) => store.home.user)

  const usersList = useSelector((store: any) => store.home.usersList ?? {})
  const [filteredChats, setFilteredChats] = React.useState(usersList)
  const keys = Object.keys(filteredChats)

  const chats = useSelector((store: any) => store.home.chats ?? {})
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {

    const filter: any = {}
    Object.keys(usersList).map((id: any) => {
      const name = (usersList[id]?.name ?? "").toLowerCase()
      if (name.includes(searchQuery.toLowerCase())) {
        filter[id] = usersList[id]
      }
    })

    setFilteredChats(filter)
  }, [searchQuery])

  return (
    <View style={styles.container}>
      <View style={styles.container}>

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {
          keys.length === 0 ?
            <View style={{ flex: 0.75, justifyContent: 'center' }}>
              <Label primary bold center title="No Users!" />
            </View>
            :
            <FlatList
              data={keys}
              renderItem={({ item }) => {
                if (item === id) {
                  return null
                }
                const user = filteredChats[item]
                const userMessages = chats[`${user.id}`] ?? []
                let unreadCount = 0
                userMessages.map((m: any) => {
                  if (!m.read) {
                    unreadCount++
                  }
                })
                const lastMessage = userMessages[userMessages.length - 1] ?? {}

                return (
                  <View style={{ marginHorizontal: moderateScale(20), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Ripple
                      style={styles.cardStyle}
                      onPress={() => {
                        navigation.navigate("ChatDetails", { user })
                      }}
                    >
                      <View style={{ width: "15%", marginHorizontal: moderateScale(5), alignSelf: 'center', }}>
                        {
                          user.photo ?
                            <Image
                              source={{ uri: user.photo }}
                              style={styles.cardImageStyle}
                            />
                            :
                            <EmptyImageView name={user.name} style={styles.cardImageStyle} labelStyle={{ fontSize: theme.fontSizes.xxl }} />
                        }
                      </View>
                      <View style={[{ width: "55%", justifyContent: 'center' }]}>
                        <Label ellipsizeMode="end" numberOfLines={1} bold m primary title={user.name?.charAt(0).toUpperCase() + user.name?.slice(1)} style={{ marginLeft: moderateScale(10) }} />
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
        }
      </View>
    </View>
  )
}