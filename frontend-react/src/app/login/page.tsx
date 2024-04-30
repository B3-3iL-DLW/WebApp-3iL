// src/app/login/page.tsx

"use client";
// src/app/login/page.tsx

import React, {useState} from 'react';
import LoginForm from './form/LoginForm';
import {Credentials, InvalidCredentialsError, login} from './services/loginService';
import Toast from '../../app/components/toasts';

const LoginPage = () => {
    const [loginState, setIsLoggedIn] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [connectionError, setConnectionError] = useState<boolean>(false); // Nouvel état pour l'erreur de connexion

    const handleLogin = async (credentials: Credentials) => {
        try {
            const token = await login(credentials);

            document.cookie = `jwt=${token}; path=/`;

            setIsLoggedIn(true);
            setToastMessage('Connexion réussie !');
            setToastType('success');
            setShowToast(true);
            setConnectionError(false); // Pas d'erreur de connexion
        } catch (err) {
            setIsLoggedIn(false);
            setToastMessage('Échec de la connexion');
            setToastType('error');
            setShowToast(true);
            if (err instanceof InvalidCredentialsError) {
                setConnectionError(true); // Erreur de connexion uniquement pour les identifiants incorrects
            }
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
    }

    return (
        <>
            <div className="flex absolute justify-end py-4 px-4 w-auto"> {showToast &&
                <Toast message={toastMessage} type={toastType} onClose={handleCloseToast}/>}</div>
            <div className="h-screen flex">
                <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center">
                    <div className="bg-black opacity-20 inset-0 z-0"></div>
                    <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
                        <h1 className="text-white font-bold text-4xl font-sans">My3il</h1>
                        <p className="text-white mt-1">Un empoi du temps simpliste rien que pour toi</p>
                        <div className="flex justify-center lg:justify-start mt-6">
                            <a href="#"
                               className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">Qui
                                sommes-nous ?</a>
                        </div>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <LoginForm onSubmit={handleLogin} connectionError={connectionError}/> {/* Passer connectionError à LoginForm */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;