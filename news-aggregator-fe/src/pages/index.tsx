import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import LandingPage from './LandingPage';
import MainNavbar from '../components/MainNavbar';
import {connect} from 'react-redux';
import { checkAuth } from '../store/actions';
import { CheckAuthType } from '../store/types/auth.module';
import Redux from 'redux';
import NewsFeed from './NewsFeed';
import Loading from './Loading';
import Logout from './Logout';
import { ConnectState } from '../store/types';

export interface PageProps{
    isAuth: boolean;
    name?: string;
    authLoading?: boolean
    onCheckAuth: () => CheckAuthType;
}

const Pages: React.FC<PageProps> = ({ onCheckAuth, isAuth, name, authLoading }) => {
    useEffect(() => {
        onCheckAuth();
    }, [])

    const HomePage = () => {
        if (authLoading) return <Loading />
        if (isAuth) return <NewsFeed />
        return <LandingPage />
    }

    return (
        <>
            <MainNavbar isAuth={isAuth} name={name} />
            <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={HomePage()} />
            </Routes>
        </>
    )
}



const mapStateToProps = (state: ConnectState) => {
    return {
        isAuth: state.auth.token !== null,
        name: state.auth.name,
        authLoading: state.auth.loading,
    }
}
const mapDispatchToProps = (dispatch: Redux.Dispatch) => {
    return{
        onCheckAuth: () => dispatch(checkAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);