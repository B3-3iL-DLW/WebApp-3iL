// src/app/login/hooks/useLoginForm.ts

import React, {useState} from 'react';
import {validateEmail, validateRequired} from "@/app/utils/validators";

const useLoginForm = (onSubmit: (credentials: { email: string; password: string }) => void) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log('email', email);

        const newEmailError = validateEmail(email);
        const newPasswordError = validateRequired(password);

        setEmailError(newEmailError);
        setPasswordError(newPasswordError);

        if (!newEmailError && !newPasswordError) {
            onSubmit({email, password});
        }
    };

    return {email, password, emailError, passwordError, handleSubmit, setEmail, setPassword};
};

export default useLoginForm;