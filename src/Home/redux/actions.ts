import { action } from "../../common/store/typeSafe";

export const loginAction = (): any => action('src/Home/redux/loginAction');

export const logoutAction = (): any => action('src/Home/redux/logoutAction');

export const storeLoginDetailsAction = (payload: any): any => action('src/Home/redux/storeLoginDetailsAction', payload);

export const clearLoginDetailsAction = (): any => action('src/Home/redux/clearLoginDetailsAction');

export const storeUsersListAction = (payload: any): any => action('src/Home/redux/storeUsersListAction', payload);

export const sendMessageAction = (payload: any): any => action('src/Home/redux/sendMessageAction', payload);

export const storeMessageAction = (payload: any): any => action('src/Home/redux/storeMessageAction', payload);

export const storeChatsAction = (payload: any): any => action('src/Home/redux/storeChatsAction', payload);

export const readMessageAction = (payload: any): any => action('src/Home/redux/readMessageAction', payload);

export const resetReducersAction = (): any => action('src/Home/redux/resetReducersAction');