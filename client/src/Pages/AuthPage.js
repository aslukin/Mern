import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';
//import { set } from 'mongoose';

export const AuthPage = () => {

    const {loading, error, request} = useHttp();

    const [form, state] = useState({
        email: '',
        password: ''
    });



    const changeHandler = event => {
        // setForm({...form, [event.target.name]: event.target.value});

    };

    const registerHandler = async () => {
        try {
            console.log('form :>> ', form);
            const data = await request('/api/auth/register', 
                'POST',
                {...form});
            console.log('data :>> ', data);
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
                                // onChange={changeHandler}
                            />
                            <label htmlFor="email">Your email</label>
                        </div>
                        <div className="input-field">
                            <input 
                                placeholder="Password" 
                                id="password" 
                                name="email"
                                type="password" 
                                className="yellow-input" 
                                // onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>


                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4"
                            style={{ marginRight: 10 }}
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