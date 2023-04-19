import * as actionTypes from './actionTypes';
import { AuthSuccessType, AuthState, AuthDataType, AuthFailType, CheckAuthType, ClearAuthType, AuthType, AuthStartType, LogoutType, DismissAuthErrorType} from '../types/auth.module';

export const auth: (authData: AuthDataType, extension: 'register' | 'login') => AuthType = (authData, extension) => {
    return{
        type: actionTypes.AUTH,
        authData,
        extension
    }
}

export const authStart: () => AuthStartType = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess: (authData: AuthState) => AuthSuccessType = (authData) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
}

export const authFail: (error: string) => AuthFailType = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const checkAuth: () => CheckAuthType = () => {
    return{
        type: actionTypes.CHECK_AUTH
    }
}

export const clearAuth: () => ClearAuthType = () => {
    return{
        type: actionTypes.CLEAR_AUTH
    }
}

export const logout: (token: string) => LogoutType = (token) => {
    return{
        type: actionTypes.LOGOUT,
        token,
    }
}

export const dismissAuthError: () => DismissAuthErrorType = () => {
    return{
        type: actionTypes.DISMISS_AUTH_ERROR
    }
}
