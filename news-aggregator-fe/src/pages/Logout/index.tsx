import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import {logout} from '../../store/actions';
import { LogoutType } from '../../store/types/auth.module';
import { ConnectState } from '../../store/types';

export interface LogoutProps{
    onLogout: (token: string) => LogoutType;
    token: string | null;
}

const Logout: React.FC<LogoutProps> = ({ onLogout, token }) => {
    useEffect(()=>{
        if (token) {
            onLogout(token);
        }
    }, []);
    return (
        <>
            {!token ? <Navigate to="/" /> : <></>}
            
        </>
    )
}

const mapStateToProps = (state: ConnectState) => {
    return {
        token: state.auth.token,
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return{
        onLogout: (token: string) => dispatch(logout(token))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Logout);