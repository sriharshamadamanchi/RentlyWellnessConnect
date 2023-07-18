import { action } from "../../common/store/typeSafe";

export const loginAction = (): any => action('src/Home/redux/loginAction');

export const logoutAction = (): any => action('src/Home/redux/logoutAction');

export const storeLoginDetailsAction = (payload: any): any => action('src/Home/redux/storeLoginDetailsAction', payload);

export const clearLoginDetailsAction = (): any => action('src/Home/redux/clearLoginDetailsAction');

export const storeUsersListAction = (payload: any): any => action('src/Home/redux/storeUsersListAction', payload);

export const sendMessageAction = (payload: any): any => action('src/Home/redux/sendMessageAction', payload);

export const storeChatsAction = (payload: any): any => action('src/Home/redux/storeChatsAction', payload);

export const storeGroupChatsAction = (payload: any): any => action('src/Home/redux/storeGroupChatsAction', payload);

export const fetchRemoteConfigAction = (payload: any): any => action('src/Home/redux/fetchRemoteConfigAction', payload);

export const storeRemoteConfigAction = (payload: any): any => action('src/Home/redux/storeRemoteConfigAction', payload);

export const readMessageAction = (payload: any): any => action('src/Home/redux/readMessageAction', payload);

export const readGroupMessageAction = (payload: any): any => action('src/Home/redux/readGroupMessageAction', payload);

export const resetReducersAction = (): any => action('src/Home/redux/resetReducersAction');