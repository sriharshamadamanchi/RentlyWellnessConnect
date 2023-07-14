import { call, put, takeLatest } from "redux-saga/effects";
import { getActionType } from "../../common/store/typeSafe";
import { clearLoginDetailsAction, loginAction, logoutAction, sendMessageAction, storeLoginDetailsAction, storeUsersListAction } from "./actions";
import { failedLoadingAction, startLoadingAction, successLoadingAction } from "../../common/loaderRedux/actions";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { Firestore } from "../Firestore";

export function* loginSaga(): any {
  try {
    yield call(GoogleSignin.hasPlayServices);
    const userInfo = yield call(GoogleSignin.signIn);
    yield put(startLoadingAction({ name: "Login" }))
    // if(!(userInfo?.user?.email?.includes("@rently.com"))){
    //   Alert.alert("Alert", "Please use your rently account to sign in")
    //   yield call(logoutSaga)
    // }else{
    //   yield put(storeLoginDetailsAction({ user: userInfo?.user ?? {} }))
    // }
    const usersList = yield call(Firestore.getUsersList)
    const { id, email, name, photo } = userInfo?.user ?? {}
    if (!usersList[id]) {
      yield call(Firestore.addUser, { id, details: { id, email, name, photo, steps: [] } })
      yield put((storeUsersListAction({ usersList: { ...usersList, [id]: { id, email, name, photo, steps: [] } } })))
    }
    yield put(storeLoginDetailsAction({ user: userInfo?.user ?? {} }))
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
    const { from, to, message, timestamp } = action.payload
    yield call(Firestore.sendMessage, {from, to, message, timestamp})
  } catch (error: any) {
    console.log("error in sendMessageSaga", error)
  }
}

export const homeSagas: any = [
  takeLatest(getActionType(loginAction), loginSaga),
  takeLatest(getActionType(logoutAction), logoutSaga),
  takeLatest(getActionType(sendMessageAction), sendMessageSaga),
];
