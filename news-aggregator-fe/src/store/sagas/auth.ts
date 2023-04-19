import {put} from 'redux-saga/effects';
import { authSuccess, authFail} from '../actions';
import { CheckAuthType, AuthType, LogoutType, AuthResponseType, GetUserDataResponseType} from '../types/auth.module';
import axios from 'axios';
import { clearAuth, authStart } from '../actions/auth';

export function* authSaga(action: AuthType){
    yield put(authStart());
    try{
        const response: AuthResponseType = yield axios.post("http://127.0.0.1:8000/api/" + action.extension,{
            ...action.authData
        }, {
            'headers': {
                'Accept': 'application/json',
            },
        })
        yield localStorage.setItem("token", response.data.token);
        
        yield put(authSuccess({
            token: response.data.token,
            name: response.data.user.name,
            email: response.data.user.email
        }));

    } catch(err: any){
        yield put(authFail(err.response.data.message));
    }
}

export function* checkAuthSaga(action: CheckAuthType){
    const token = localStorage.getItem("token");
    if(!token){
        return;
    }
    yield put(authStart());
    try {
        const response: GetUserDataResponseType = yield axios.post("http://127.0.0.1:8000/api/get-user-data" ,{}, {
            'headers': {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
    
        yield put(authSuccess({
            token,
            name: response.data.user.name,
            email: response.data.user.email,
        }));
    } catch(err: any) {
        yield put(authFail(err.response.data.message));
    }
}

export function* logoutSaga(action: LogoutType) {
    yield axios.post("http://127.0.0.1:8000/api/logout" ,{}, {
        'headers': {
            'Accept': 'application/json',
            'Authorization': `Bearer ${action.token}`,
        },
    })
    yield localStorage.removeItem("token");
    yield put(clearAuth());
}