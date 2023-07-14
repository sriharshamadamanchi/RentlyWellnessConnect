import { action } from "../store/typeSafe";

export const showLoaderAction = (): any => action('src/common/appLevelRedux/showLoaderAction');
export const hideLoaderAction = (): any => action('src/common/appLevelRedux/hideLoaderAction');

export interface startLoadingActionType {
    name: string,
    msg?: string
};
export const startLoadingAction = (payload: startLoadingActionType): any => action('src/common/LoaderRedux/startLoadingAction', payload);

export interface successLoadingActionType {
    name: string,
    msg: string
};
export const successLoadingAction = (payload: successLoadingActionType): any => action('src/common/LoaderRedux/successLoadingAction', payload);

export interface failedLoadingActionType {
    name: string,
    msg: string,
    id?: string
};

export const failedLoadingAction = (payload: failedLoadingActionType): any => action('src/common/LoaderRedux/failedLoadingAction', payload);

export interface removeLoaderActionType {
    name: string
};

export const removeLoaderAction = (payload: removeLoaderActionType): any => action('src/common/LoaderRedux/removeLoaderAction', payload);

export const resetAllLoadersAction = (): any => action('src/common/LoaderRedux/resetAllLoadersAction');
