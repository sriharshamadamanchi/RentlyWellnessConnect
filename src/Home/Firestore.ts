import firestore from '@react-native-firebase/firestore';
import { store } from '../common/store';
import { storeUsersListAction } from './redux/actions';
import { hideLoaderAction, showLoaderAction } from '../common/loaderRedux/actions';

interface detailsType {
    id: string,
    email: string,
    name: string,
    photo: string,
    steps?: Array<{ count: number, date: string }>
}

const addUser: any = async ({ id, details }: { id: string, details: detailsType }) => {
    try {
        await firestore().collection('users').doc('activity')
            .set({
                [id]: JSON.stringify(details)
            })
        await getUsersList()
    } catch (err) {
        console.log("Error in addUser", err)
    }
}

const updateUser: any = async ({ id, details }: { id: string, details: detailsType }) => {
    try {
        store.dispatch(showLoaderAction())
        await firestore().collection('users').doc('activity')
            .update({
                [id]: JSON.stringify(details)
            })
        await getUsersList()
    } catch (err) {
        console.log("Error in addUser", err)
    } finally {
        store.dispatch(hideLoaderAction())
    }
}

const storeFCMToken = async ({ id, token }: { id: string, token: string }) => {
    if (!id || !token) {
        return
    }
    const path = `${id}.token`

    try {
        await firestore().collection('users').doc('activity')
            .update({
                [path]: token
            })
    } catch (err) {
        console.log("Error in storeFCMToken", err)
    }
}

const getUsersList = async () => {
    try {
        const rawUsersList: any = (await firestore().collection('users').doc('activity').get()).data()
        const usersList: any = {}
        Object.keys(rawUsersList ?? {}).map((id: any) => {
            usersList[id] = JSON.parse(rawUsersList[id] ?? "{}")
        })
        store.dispatch(storeUsersListAction({ usersList }))

        return usersList
    } catch (err) {
        console.log("Error in addUser", err)
    }
}

const sendMessage = async ({ from, to, message, timestamp }: { from: string, to: string, message: string, timestamp: number }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const senderDocRef = firestore().collection("users").doc(from)
            const receiverDocRef = firestore().collection("users").doc(to)

            const senderDoc = await senderDocRef.get();
            if (senderDoc.exists) {
                const data = senderDoc.data() ?? {}
                if (data[to]) {
                    const rawMessages = data[to] ?? "[]"
                    const messages = JSON.parse(rawMessages) ?? []
                    await senderDocRef.update({
                        [to]: JSON.stringify([...messages, { f: from, m: message, t: timestamp }])
                    })
                } else {
                    await senderDocRef.update({
                        [to]: JSON.stringify([{ f: from, m: message, t: timestamp }])
                    })
                }
            } else {
                await senderDocRef.set({ [to]: JSON.stringify([{ f: from, m: message, t: timestamp }]) })
            }


            const receiverDoc = await receiverDocRef.get();
            if (receiverDoc.exists) {
                const data = receiverDoc.data() ?? {}
                if (data[from]) {
                    const rawMessages = data[from] ?? "[]"
                    const messages = JSON.parse(rawMessages) ?? []
                    await receiverDocRef.update({
                        [from]: JSON.stringify([...messages, { f: from, m: message, t: timestamp }])
                    })
                } else {
                    await receiverDocRef.update({
                        [from]: JSON.stringify([{ f: from, m: message, t: timestamp }])
                    })
                }
            } else {
                await receiverDocRef.set({ [from]: JSON.stringify([{ f: from, m: message, t: timestamp }]) })
            }

            resolve(true)
        } catch (err) {
            console.log("Error in sendMessage", err)
            reject(true)
        }
    })
}

const sendGroupMessage = async ({ from, to, message, timestamp }: { from: string, to: string, message: string, timestamp: number }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const groupDocRef = firestore().collection("users").doc("groupChats")
            const groupDoc = await groupDocRef.get();

            if (groupDoc.exists) {
                const data = groupDoc.data() ?? {}
                if (data[to]) {
                    const rawMessages = data[to] ?? "[]"
                    const messages = JSON.parse(rawMessages) ?? []
                    await groupDocRef.update({
                        [to]: JSON.stringify([...messages, { f: from, m: message, t: timestamp }])
                    })
                } else {
                    await groupDocRef.update({
                        [to]: JSON.stringify([{ f: from, m: message, t: timestamp }])
                    })
                }
            } else {
                await groupDocRef.set({ [to]: JSON.stringify([{ f: from, m: message, t: timestamp }]) })
            }
            resolve(true)
        } catch (err) {
            console.log("Error in sendGroupMessage", err)
            reject(true)
        }
    })
}

export const Firestore = {
    addUser,
    updateUser,
    getUsersList,
    storeFCMToken,
    sendMessage,
    sendGroupMessage
}