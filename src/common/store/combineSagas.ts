import { all } from 'redux-saga/effects';
import { homeSagas } from '../../Home/redux/sagas';

export function *sagas (): any {
    yield all([
      ...homeSagas,
    ]);
}
