import { call, put, takeLatest } from "redux-saga/effects";
import { getActionType } from "../../common/store/typeSafe";
import { clearLoginDetailsAction, fetchRemoteConfigAction, loginAction, logoutAction, sendMessageAction, storeLoginDetailsAction, storeRemoteConfigAction, storeUsersListAction } from "./actions";
import { failedLoadingAction, startLoadingAction, successLoadingAction } from "../../common/loaderRedux/actions";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { Firestore } from "../Firestore";
import remoteConfig from '@react-native-firebase/remote-config';

export function* loginSaga(): any {
  try {
    yield call(GoogleSignin.hasPlayServices);
    const userInfo = yield call(GoogleSignin.signIn);
    yield put(startLoadingAction({ name: "Login" }))
    if (!(userInfo?.user?.email?.includes("@rently.com"))) {
      Alert.alert("Invalid User", "Please use your rently account to sign in")
      yield call(logoutSaga)
    } else {
      const { moon_landing_teams = {} } = yield call(fetchRemotConfigSaga)
      const lunaTeam = moon_landing_teams.Luna ?? [];
      const apolloTeam = moon_landing_teams.Apollo ?? [];
      const rangerTeam = moon_landing_teams.Ranger ?? [];

      const usersList = yield call(Firestore.getUsersList)
      const { id, email, name, photo } = userInfo?.user ?? {}
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
        yield call(Firestore.updateUser, { id, details })
      }
      yield put((storeUsersListAction({ usersList: { ...usersList, [id]: { id, email, name, photo, steps: [], team } } })))
      yield put(storeLoginDetailsAction({ user: userInfo?.user ?? {} }))
    }
    yield put(successLoadingAction({ name: "Login", msg: "" }))
  } catch (error: any) {
    console.log("error in loginSaga", error)
    let msg = ""
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      msg = "Sign in cancelled"
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      msg = "Play services not available"
    }
    if (msg != "") {
      Alert.alert("Alert", msg)
    }
    yield put(failedLoadingAction({ name: "Login", msg }))
  }
}

export function* logoutSaga(): any {
  try {
    yield put(startLoadingAction({ name: "Logout" }))
    yield call(GoogleSignin.revokeAccess);
    yield call(GoogleSignin.signOut);
    yield put(clearLoginDetailsAction())
    yield put(successLoadingAction({ name: "Logout", msg: "" }))
  } catch (error: any) {
    yield put(clearLoginDetailsAction())
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
        if(parsedEntries){
          Object.keys(parsedEntries).map((team: string) => {
            if(parsedEntries[team] && parsedEntries[team]?.length > 0){
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

export const homeSagas: any = [
  takeLatest(getActionType(loginAction), loginSaga),
  takeLatest(getActionType(logoutAction), logoutSaga),
  takeLatest(getActionType(sendMessageAction), sendMessageSaga),
  takeLatest(getActionType(fetchRemoteConfigAction), fetchRemotConfigSaga),
];
