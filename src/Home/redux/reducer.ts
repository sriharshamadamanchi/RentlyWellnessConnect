import { createReducer, resetState } from '../../common/store/typeSafe';
import { clearLoginDetailsAction, readGroupMessageAction, readMessageAction, resetReducersAction, storeChatsAction, storeGroupChatsAction, storeLoginDetailsAction, storeRemoteConfigAction, storeUsersListAction } from './actions';

const initialState = {
    isLoggedIn: false,
    user: {},
    usersList: {},
    chats: {},
    groupChats: {},
    remoteConfig: {}
};


export const homeReducer = createReducer(initialState)
    .handleAction(
        storeLoginDetailsAction,
        (state: any, action: any) => {
            state.isLoggedIn = true
            state.user = action.payload.user
        }
    )
    .handleAction(
        clearLoginDetailsAction,
        (state: any, action: any) => {
            state.isLoggedIn = false
            state.user = {}
            state.usersList = {}
        }
    )
    .handleAction(
        storeUsersListAction,
        (state: any, action: any) => {
            state.usersList = action.payload.usersList
        }
    )
    .handleAction(
        storeChatsAction,
        (state: any, action: any) => {
            const chats = action.payload?.chats ?? {}
            state.chats = chats
        }
    )
    .handleAction(
        storeGroupChatsAction,
        (state: any, action: any) => {
            const chats = action.payload?.chats ?? {}
            state.groupChats = chats
        }
    )
    .handleAction(
        storeRemoteConfigAction,
        (state: any, action: any) => {
            state.remoteConfig = action.payload ?? {}
        }
    )
    .handleAction(
        readMessageAction,
        (state: any, action: any) => {
            const id = action.payload?.id
            const messageIds = action.payload?.messageIds ?? []
            if (state.chats[id] && state.chats[id].length > 0) {
                state.chats[id] = state.chats[id].map((message: any) => {
                    if (messageIds.includes(message.t)) {
                        return { ...message, read: true }
                    }
                    return message;
                })
            }
        }
    )
    .handleAction(
        readGroupMessageAction,
        (state: any, action: any) => {
            const group = action.payload?.group
            const messageIds = action.payload?.messageIds ?? []
            if (state.groupChats[group] && state.groupChats[group].length > 0) {
                state.groupChats[group] = state.groupChats[group].map((message: any) => {
                    if (messageIds.includes(message.t)) {
                        return { ...message, read: true }
                    }
                    return message;
                })
            }
        }
    )
    .handleAction(resetReducersAction, resetState(initialState));
