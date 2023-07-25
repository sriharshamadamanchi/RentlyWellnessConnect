import { call, put, takeLatest } from "redux-saga/effects";
import { getActionType } from "../../common/store/typeSafe";
import { clearLoginDetailsAction, fetchRemoteConfigAction, forgotPasswordAction, loginAction, logoutAction, registerAction, reloadUserAction, sendMessageAction, storeLoginDetailsAction, storeRemoteConfigAction, storeUsersListAction } from "./actions";
import { failedLoadingAction, startLoadingAction, successLoadingAction } from "../../common/loaderRedux/actions";
import { Firestore } from "../Firestore";
import remoteConfig from '@react-native-firebase/remote-config';
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import { navigate } from "../../common/navigation/navigationService";

export function* loginSaga(action: { payload: { email: string, password: string } }): any {
  const { email, password } = action.payload
  try {
    yield put(startLoadingAction({ name: "Login" }))
    yield call([auth(), auth().signInWithEmailAndPassword], email, password)
    const userInfo = auth().currentUser
    console.log("userInfo", userInfo)
    if (!userInfo?.emailVerified) {
      throw { message: "Email is not verified" }
    }
    const { moon_landing_teams = {} } = yield call(fetchRemotConfigSaga)
    const lunaTeam = moon_landing_teams.Luna ?? [];
    const apolloTeam = moon_landing_teams.Apollo ?? [];
    const rangerTeam = moon_landing_teams.Ranger ?? [];

    const usersList = yield call(Firestore.getUsersList)
    const id = email.replace(/\./g, "#")
    const { displayName: name, photoURL: photo } = userInfo ?? {}
    let team = "-"
    lunaTeam.map((emailId: string) => {
      if (emailId === email) {
        team = "Luna"
      }
    })
    apolloTeam.map((emailId: string) => {
      if (emailId === email) {
        team = "Apollo"
      }
    })
    rangerTeam.map((emailId: string) => {
      if (emailId === email) {
        team = "Ranger"
      }
    })
    if (Object.keys(usersList).length < 1) {
      yield call(Firestore.addUser, { id, details: { id, email, name, photo, steps: [], team } })
    } else {
      const details = usersList[id] ?? { id, email, name, photo, steps: [], team }
      yield call(Firestore.updateUser, { id, details: { ...details, name, photo: photo ?? details.photo, team } })
    }
    yield put((storeUsersListAction({ usersList: { ...usersList, [id]: { id, email, name, photo, steps: [], team } } })))
    yield put(storeLoginDetailsAction({ user: { id, email, name: userInfo?.displayName, photo: userInfo?.photoURL } }))
    yield put(successLoadingAction({ name: "Login", msg: "" }))
  } catch (error: any) {
    console.log("error in loginSaga", error.message)
    if (error.code === "auth/user-not-found") {
      Alert.alert("User not found", "There is no user record corresponding to this identifier. The user may have been deleted.")
    } else if (error.code === "auth/wrong-password") {
      Alert.alert("Invalid password", "The password is invalid or the user does not have a password.")
    } else if (error.code === "auth/invalid-email") {
      Alert.alert("Alert", "Invalid email")
    } else if (error.message === "Email is not verified") {
      Alert.alert('Email is not verified', 'Do you want to get verification link ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: async () => {
            try {
              await auth().currentUser?.sendEmailVerification()
              Alert.alert("Success", "A verification link has been sent to your email acount. Please verify your email to continue")
            } catch (err: any) {
              if (err.code === "auth/too-many-requests") {
                Alert.alert("Too many requests", "We have blocked all requests from this device due to unusual activity. Try again later.")
              }
            }
          }
        },
      ]);
    }
    yield put(failedLoadingAction({ name: "Login", msg: "" }))
  }
}

const updateProfile = ({ displayName }: { displayName: string }) => new Promise(async (resolve, reject) => {
  await auth().currentUser?.updateProfile({ displayName })
  await auth().currentUser?.sendEmailVerification()
  resolve(true)
})

export function* registerSaga(action: { payload: { name: string, email: string, password: string } }): any {
  const { name, email, password } = action.payload
  try {
    yield put(startLoadingAction({ name: "Register" }))
    yield call(checkAppAccessSaga, { email })
    yield call([auth(), auth().createUserWithEmailAndPassword], email, password)
    yield call(updateProfile, { displayName: name })
    yield put(successLoadingAction({ name: "Register", msg: "" }))
    Alert.alert("Verification Pending", "A verification link has been sent to your email acount. Please verify your email to continue")
    navigate("Welcome")
    navigate("Login", { email, password })
  } catch (error: any) {
    console.log("error in registerSaga", error.message)
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("Alert", "Email is already in use")
    } else if (error.message) {
      Alert.alert("Alert", error.message)
    }
    yield put(failedLoadingAction({ name: "Register", msg: "" }))
  }
}

export function* checkAppAccessSaga(payload: { email: string }): any {
  const { email } = payload
  const { moon_landing_teams = {} } = yield call(fetchRemotConfigSaga)
  const lunaTeam = moon_landing_teams.Luna ?? [];
  const apolloTeam = moon_landing_teams.Apollo ?? [];
  const rangerTeam = moon_landing_teams.Ranger ?? [];
  const users = [...lunaTeam, ...apolloTeam, ...rangerTeam];
  if (!(users.includes(email))) {
    throw { message: "You dont have access to this app. Please contact your admin for support." }
  }
}

export function* forgotPasswordSaga(action: { payload: { email: string } }): any {
  const { email } = action.payload
  try {
    yield put(startLoadingAction({ name: "ForgotPassword" }))
    yield call([auth(), auth().sendPasswordResetEmail], email)
    Alert.alert("Success", "A reset link has been sent to your email acount.")
    yield put(successLoadingAction({ name: "ForgotPassword", msg: "" }))
  } catch (error: any) {
    console.log("error in forgotPasswordSaga", error.message)
    if (error.code === "auth/user-not-found") {
      Alert.alert("User not found", "There is no user record corresponding to this identifier. The user may have been deleted.")
    } else if (error.code === "auth/too-many-requests") {
      Alert.alert("Too many requests", "We have blocked all requests from this device due to unusual activity. Try again later.")
    } else if (error.message) {
      Alert.alert("Alert", error.message)
    }
    yield put(failedLoadingAction({ name: "ForgotPassword", msg: "" }))
  }
}

const deleteUserAccount = () => new Promise(async (resolve, reject) => {
  try {
    await auth().currentUser?.delete()
    resolve(true)
  } catch (err: any) {
    if (err.code === "auth/requires-recent-login") {
      Alert.alert("Requires recent login", "This operation is sensitive and requires recent authentication. Log in again before retrying this request.")
    }
    reject(err)
  }
})


export function* logoutSaga(action: { payload: { deleteAccount: boolean } }): any {
  const { deleteAccount = false } = action?.payload ?? {}
  try {
    yield put(startLoadingAction({ name: "Logout" }))
    if (deleteAccount) {
      yield call(deleteUserAccount)
      Alert.alert("Success", "Your account has been deleted successfully!!")
    } else {
      yield call([auth(), auth().signOut])
    }
    yield put(clearLoginDetailsAction())
    yield put(successLoadingAction({ name: "Logout", msg: "" }))
  } catch (error: any) {
    console.log("error in logoutSaga", error)
    if (!deleteAccount) {
      yield put(clearLoginDetailsAction())
    }
    yield put(failedLoadingAction({ name: "Logout", msg: "" }))
  }
}

export function* sendMessageSaga(action: { payload: any }): any {
  try {
    const { from, to, message, timestamp, group = false } = action.payload
    if (group) {
      yield call(Firestore.sendGroupMessage, { from, to, message, timestamp })
    } else {
      yield call(Firestore.sendMessage, { from, to, message, timestamp })
    }
  } catch (error: any) {
    console.log("error in sendMessageSaga", error)
  }
}

export function* fetchRemotConfigSaga(): any {
  try {
    yield remoteConfig().fetch(6 * 60 * 60); // minimum fetch interval 6 hours (in sec)
    yield remoteConfig().activate();
    const data = yield remoteConfig().getAll();
    const config: any = {}
    Object.entries(data).forEach($ => {
      const [key, entry]: any = $;
      try {
        const parsedEntries = JSON.parse(entry.asString())
        if (parsedEntries) {
          Object.keys(parsedEntries).map((team: string) => {
            if (parsedEntries[team] && parsedEntries[team]?.length > 0) {
              parsedEntries[team] = parsedEntries[team].map((id: string) => id.toLowerCase())
            }
          })
        }
        config[key] = parsedEntries
      } catch (e) {
        console.log("error in parsing remote config", e)
      }
    })
    yield put(storeRemoteConfigAction(config))
    return config ?? {}
  } catch (error: any) {
    console.log("error in fetchRemotConfigSaga", error)
  }
}

const validateUser = () => new Promise(async (resolve, reject) => {
  if (auth().currentUser) {
    try {
      await auth().currentUser?.reload()
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        reject({ title: "User not found", message: "There is no user record corresponding to this identifier. The user may have been deleted." })
      }
    }
  }
  if (!(auth().currentUser)) {
    reject({ title: "Session expired", message: "Please login again" })
  }
  resolve(true)
})

export function* reloadUserSaga(action: { payload: any }): any {
  try {
    yield call(validateUser)
  } catch (error: any) {
    if (error?.title && error?.message) {
      Alert.alert(error.title, error.message)
      yield put(logoutAction())
    } else if (error?.message) {
      Alert.alert("Alert", error.message)
    }
    console.log("error in reloadUserSaga", error)
  }
}

export const homeSagas: any = [
  takeLatest(getActionType(loginAction), loginSaga),
  takeLatest(getActionType(registerAction), registerSaga),
  takeLatest(getActionType(forgotPasswordAction), forgotPasswordSaga),
  takeLatest(getActionType(logoutAction), logoutSaga),
  takeLatest(getActionType(sendMessageAction), sendMessageSaga),
  takeLatest(getActionType(fetchRemoteConfigAction), fetchRemotConfigSaga),
  takeLatest(getActionType(reloadUserAction), reloadUserSaga)
];
