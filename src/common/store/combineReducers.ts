// @flow Copyright © 2019 Rently Softwares, All Rights Reserved

import { combineReducers } from 'redux';
import { homeReducer } from '../../Home/redux/reducer';
import { loaderReducer } from '../loaderRedux/reducer';

export const reducers: any = combineReducers({
  home: homeReducer,
  loader:loaderReducer,
});
