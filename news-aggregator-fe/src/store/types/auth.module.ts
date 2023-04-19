import * as actionTypes from '../actions/actionTypes';
export interface AuthState{
    token: string | null;
    name?: string;
    email?: string;
    error?: string;
    loading?: boolean;
}

// singularize coding style (i.e make all camel case)
export interface RegisterData{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export type AuthDataType = RegisterData | LoginData;

export interface AuthType{
    type: typeof actionTypes.AUTH;
    authData: AuthDataType;
    extension: 'register' | 'login';
}

export interface AuthStartType{
    type: typeof actionTypes.AUTH_START;
}

export interface AuthSuccessType{
    type: typeof actionTypes.AUTH_SUCCESS;
    authData: AuthState;
}

export interface AuthFailType{
    type: typeof actionTypes.AUTH_FAIL;
    error: string;
}

export interface CheckAuthType{
    type: typeof actionTypes.CHECK_AUTH;
}

export interface ClearAuthType{
    type: typeof actionTypes.CLEAR_AUTH;
}

export interface LogoutType{
    type: typeof actionTypes.LOGOUT
    token: string
}

export interface AuthResponseType{
    data: {
        user: {
            id: string;
            name: string;
            email: string;
        },
        token: string;
    }
}

export interface GetUserDataResponseType {
    data: {
        user: {
            id: string;
            name: string;
            email: string;
        }
    }
}

export interface DismissAuthErrorType{
    type: typeof actionTypes.DISMISS_AUTH_ERROR
}

export type authAction =  AuthStartType | AuthFailType | AuthSuccessType | ClearAuthType | DismissAuthErrorType;
