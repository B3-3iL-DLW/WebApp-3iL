// src/app/login/page.tsx

"use client";
import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
import {Credentials, login} from './services/loginService';

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Add this line

    const handleLogin = async (credentials: Credentials) => {
        try {
            const token = await login(credentials);

            document.cookie = `jwt=${token}; path=/`;

            setIsLoggedIn(true); // Update the state when login is successful
        } catch (err) {
            setError('Failed to log in');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            {isLoggedIn && <p>Vous êtes connecté !</p>}
            <LoginForm onSubmit={handleLogin}/>
        </div>
    );
};

export default LoginPage;