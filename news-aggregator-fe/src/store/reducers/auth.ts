import * as actionTypes from '../actions/actionTypes';
import {AuthState, authAction} from '../types/auth.module';
const initialState: AuthState  = {
    token: null,
    loading: false
}

const authReducer: (state: AuthState, action: authAction) => AuthState = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                token: action.authData.token,
                name: action.authData.name,
                email: action.authData.email,
                loading: false 
            };
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.CLEAR_AUTH:
            return{
                token: null,
                loading: false
            }
        case actionTypes.DISMISS_AUTH_ERROR:
            return{
                ...state,
                error: undefined
            }
        default:
            return state;
    }
}

export default authReducer