// src/app/login/page.tsx

import React, {useState} from 'react';
import LoginForm from './components/LoginForm';
import {Credentials, login} from './services/loginService';

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (credentials: Credentials) => {
        try {
            const token = await login(credentials);
            // Stockez le token dans les cookies pour qu'il soit accessible par le middleware
            document.cookie = `jwt=${token}; path=/`;
            // Redirigez l'utilisateur vers la page d'accueil ou une autre page
            window.location.href = '/';
        } catch (err) {
            // Gérez les erreurs de connexion ici
            setError('Failed to log in');
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <LoginForm onSubmit={handleLogin}/>
        </div>
    );
};

export default LoginPage;