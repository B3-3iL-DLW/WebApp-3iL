// src/app/register/hooks/useRegisterForm.ts

import React, {useState} from 'react';
import {validateEmail, validateRequired} from "@/app/utils/validators";

const useRegisterForm = (onSubmit: (data: {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    classGroupId: number,
}) => void) => {
    const [email, setEmail] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [classGroupId, setClassGroupId] = useState<number>(0);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [classError, setClassError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newEmailError = validateEmail(email);
        const newNomError = validateRequired(lastname);
        const newPrenomError = validateRequired(firstname);
        const newClassError = validateRequired(classGroupId);
        const newPasswordError = validateRequired(password);
        const newConfirmPasswordError = validateRequired(confirmPassword) ||
            (password !== confirmPassword ? 'Les mots de passe ne correspondent pas.' : '');


        setEmailError(newEmailError);
        setLastNameError(newNomError);
        setFirstNameError(newPrenomError);
        setClassError(newClassError);
        setPasswordError(newPasswordError);
        setConfirmPasswordError(newConfirmPasswordError);

        if (!newNomError && !newPrenomError && !newClassError && !newPasswordError && !newConfirmPasswordError && !newEmailError) {
            const user = {
                email,
                password,
                firstname,
                lastname,
                classGroupId
            };
            try {
                onSubmit(user);
            } catch (error) {

            }
        }
    };

    return {
        email,
        lastname,
        firstname,
        classGroupId,
        password,
        confirmPassword,
        emailError,
        lastNameError,
        firstNameError,
        classError,
        passwordError,
        confirmPasswordError,
        handleSubmit,
        setEmail,
        setLastname,
        setFirstname,
        setClassGroupId,
        setMotDePasse: setPassword,
        setConfirmationMotDePasse: setConfirmPassword
    };
};

export default useRegisterForm;
