import React, { useState } from 'react';

export const AuthPage = () => {
    const [form, state] = useState({
        email: '',
        password: ''
    });

    


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
                            />
                            <label htmlFor="password">Password</label>
                        </div>


                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{ marginRight: 10 }}>Login</button>
                        <button className="btn grey lighten-1 black-text">Register</button>
                    </div>
                </div>

            </div>
        </div>
    );
}