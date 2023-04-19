import {takeEvery} from 'redux-saga/effects';
import {authSaga, checkAuthSaga, logoutSaga} from './auth';
import * as actionTypes from '../actions/actionTypes';
import { getNewsFeedSaga, getSearchDetailsSaga } from './news';

export function* authSagas(){
    yield takeEvery(actionTypes.AUTH, authSaga);
    yield takeEvery(actionTypes.CHECK_AUTH, checkAuthSaga);
    yield takeEvery(actionTypes.LOGOUT, logoutSaga);
}

export function* newsSagas(){
    yield takeEvery(actionTypes.GET_SEARCH_DETAILS, getSearchDetailsSaga);
    yield takeEvery(actionTypes.GET_NEWS_FEED, getNewsFeedSaga);
}
