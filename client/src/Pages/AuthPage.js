import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/auth.context';
//import { set } from 'mongoose';

export const AuthPage = () => {

    const auth = useContext(AuthContext);

    const {loading, request, error, clearError} = useHttp();
    const message = useMessage();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});

    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 
                'POST',
                {...form});
            message(data.message);
        } catch (e) {
            
        }
    };


    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 
                'POST',
                {...form});
            auth.login(data.tocken, data.userId);
        } catch (e) {
            
        }
    };


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Welcome</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Please enter your credentials</span>
                        <div className="input-field">
                            <input 
                                placeholder="email" 
                                id="email" 
                                name="email"
                                type="text"
                                className="yellow-input" 
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Your email</label>
                        </div>
                        <div className="input-field">
                            <input 
                                placeholder="Password" 
                                id="password" 
                                name="password"
                                type="password" 
                                className="yellow-input" 
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>


                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
                            onClick={loginHandler}
                            disabled={loading}>
                            Login
                        </button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick = {registerHandler}
                            disabled={loading}>
                            Register
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}