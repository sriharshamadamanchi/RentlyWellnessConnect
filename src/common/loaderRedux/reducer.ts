import { failedLoadingAction, type failedLoadingActionType, hideLoaderAction, removeLoaderAction, type removeLoaderActionType, resetAllLoadersAction, showLoaderAction, startLoadingAction, type startLoadingActionType, successLoadingAction, type successLoadingActionType } from './actions';
import { createReducer, resetState } from "../store/typeSafe";
import { resetReducersAction } from '../../Home/redux/actions';

const initialState = {
  loading: false,
  loaders: {}
};

export const loaderReducer: any = createReducer(initialState)
  .handleAction(
    showLoaderAction,
    (state: any) => {
      state.loading = true;
    }
  )
  .handleAction(
    hideLoaderAction,
    (state: any) => {
      state.loading = false;
    }
  )

  .handleAction(
    startLoadingAction,
    (state: any, action: any) => {
      const { payload }: { payload: startLoadingActionType } = action;
      state.loaders[payload.name] = {
        loading: true,
        msg: payload?.msg
      };
    }
  )

  .handleAction(
    successLoadingAction,
    (state: any, action: any) => {
      const { payload }: { payload: successLoadingActionType } = action;
      state.loaders[payload.name] = {
        success: {
          status: true,
          msg: payload.msg
        },
        loading: false
      };
    }
  )

  .handleAction(
    failedLoadingAction,
    (state: any, action: any) => {
      const { payload }: { payload: failedLoadingActionType } = action;
      state.loaders[payload.name] = {
        failure: {
          status: true,
          msg: payload.msg,
          id: payload?.id
        },
        loading: false
      };
    }
  )

  .handleAction(
    removeLoaderAction,
    (state: any, action: any) => {
      const { payload }: { payload: removeLoaderActionType } = action;
      delete state.loaders[payload.name];
    }
  )
  .handleAction(resetAllLoadersAction, resetState(initialState))
  .handleAction(resetReducersAction, resetState(initialState));

