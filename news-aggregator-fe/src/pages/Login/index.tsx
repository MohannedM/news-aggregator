import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import Redux from 'redux';
import * as authActionTypes from '../../store/types/auth.module'
import { Link, Navigate } from 'react-router-dom';
import { auth, dismissAuthError } from '../../store/actions/auth';
import BaseModal from '../../components/BaseModal';
import { ConnectState } from '../../store/types';
// import CustomModal from '../../components/CustomModal/CutsomModal';
interface ValidationFormType{
    [inputType: string]: {
        value: string;
        minLength: number;
        maxLength: number;
        valid: boolean;
        touched: boolean;
        error: string | null;
    }
}

interface LoginProps{
    isAuth: boolean;
    onLogin: (authData: authActionTypes.LoginData) => authActionTypes.AuthType;
    error?: string | null;
    onDismissError: () => authActionTypes.DismissAuthErrorType;
    loading?: boolean;
}


const Login: React.FC<LoginProps> = props => {


    const [registerForm, setRegisterForm] = useState<ValidationFormType>({
    email: {
        value: '',
        valid: false,
        minLength: 7,
        maxLength: 30,
        touched: false,
        error: null
    },
    password: {
        value: '',
        valid: false,
        minLength: 6,
        maxLength: 20,
        touched: false,
        error: null
    },  
    });

    const loginHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        props.onLogin({
            email,
            password
        });
    }

    const setInputHandler = (event: React.SyntheticEvent, property: 'email' | 'password' ) => {
        event.persist();
        if((event.target as HTMLInputElement).value.length < registerForm[property].minLength || (event.target as HTMLInputElement).value.length > registerForm[property].maxLength){
            setRegisterForm((prevValue: ValidationFormType) => {
                return{
                    ...prevValue,
                    [property]:{
                        ...prevValue[property],
                        value: (event.target as HTMLInputElement).value,
                        touched: true,
                        error: 'Please enter a ' + property.split('_').join(' ') + ' of more than ' + prevValue[property].minLength + ' and less than ' + prevValue[property].maxLength + ' characters.'
                    }
                }
            });
        }else{
            setRegisterForm((prevValue: ValidationFormType) => {
                return{
                    ...prevValue,
                    [property]:{
                        ...prevValue[property],
                        value: (event.target as HTMLInputElement).value,
                        touched: true,
                        error: null
                    }
                }
            });
        }
    }
    let allValid = false;
    for(let inputObj in registerForm){
        if(!registerForm[inputObj].error && registerForm[inputObj].touched){
            allValid = true;
        }else{
            allValid = false;
            break;
        }
    }


    return(

        <Row className="py-5">
            <BaseModal error={props.error} handleCloseModal={props.onDismissError} />
            {props.isAuth ? <Navigate to="/" /> : null}
            <Col xs={6} className="primary-light p-5 mx-auto shadow-lg p-3 mb-5 rounded-extra">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="text-white">Email address</Form.Label>
                        <Form.Control type="email" onChange={(event: React.SyntheticEvent)=>setInputHandler(event, 'email')} placeholder="Enter email" />
                        <p className="text-muted"><small>{registerForm.email.error}</small></p>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className="text-white">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  onChange={(event: React.SyntheticEvent)=>setInputHandler(event, 'password')} />
                        <p className="text-muted"><small>{registerForm.password.error}</small></p>
                    </Form.Group>
                    <Row className="my-3">
                        <Col xs={12} md={6}>
                            <Button variant="light" className="text-primary" type="submit" style={{ zIndex: 999 }} onClick={loginHandler} disabled={!allValid || props.loading}>
                                Login 
                                {props.loading ? <> &nbsp; <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </> : null} 
                            </Button>

                        </Col>
                        <Col xs={12} md={6}>
                            <p className="text-white">Don't have an account? <Link to="/register">Register</Link></p>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
}
const mapStateToProps = (state: ConnectState) => {
    return{
        isAuth: state.auth.token !== null,
        error: state.auth.error,
        loading: state.auth.loading
    }
}
const mapDispatchToProps = (dispatch: Redux.Dispatch) => {
    return{
        onLogin: (authData: authActionTypes.LoginData) => dispatch(auth(authData, 'login')),
        onDismissError: () => dispatch(dismissAuthError())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);