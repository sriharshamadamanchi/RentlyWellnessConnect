import { createReducer, resetState } from '../../common/store/typeSafe';
import { clearLoginDetailsAction, readMessageAction, resetReducersAction, storeChatsAction, storeLoginDetailsAction, storeMessageAction, storeRemoteConfigAction, storeUsersListAction } from './actions';

const initialState = {
    isLoggedIn: false,
    user: {},
    usersList: {},
    messages: [],
    chats: {},
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
        storeMessageAction,
        (state: any, action: any) => {
            state.messages = [...state.messages, ...(action.payload ?? [])]
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
            const messageIds = action.payload?.messageIds ?? []
            state.messages = state.messages.map((message: any) => {
                if(messageIds.includes(message.timestamp)){
                    return {...message, read: true}
                }
                return message;
            })
        }
    )
    .handleAction(resetReducersAction, resetState(initialState));
