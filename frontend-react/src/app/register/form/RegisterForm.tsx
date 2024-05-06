// src/app/register/form/RegisterForm.tsx

import React, {useEffect, useState} from 'react';
import InputField from '../../components/inputs';
import Button from '../../components/buttons';
import Select from '../../components/selects';
import useRegisterForm from '../hooks/useRegisterForm';
import {getClassGroups} from '../services/classgroupService';
import {Classgroup} from "@/app/models/classgroup";
import {register} from "@/app/register/services/registerService";
import {User} from "@/app/models/user";

interface RegisterFormProps {
    onSubmit: (data: User) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onSubmit}) => {
    const {
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
        setEmail,
        setNom,
        setPrenom,
        setClassGroupId,
        setMotDePasse,
        setConfirmationMotDePasse,
        handleSubmit,
    } = useRegisterForm(async (user) => {
        try {
            console.log(user);
            await register(user);
        } catch (error) {
            // Gérer l'erreur lors de l'envoi des données
        }
    });

    const [classOptions, setClassOptions] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchClassGroups = async () => {
            const classGroups = await getClassGroups();
            const classOptions = classGroups.reduce((options: { [key: string]: string }, group: Classgroup) => {
                options[group.id.toString()] = group.name;
                return options;
            }, {});
            setClassOptions(classOptions);
        };

        fetchClassGroups().then(r => console.log(r));
    }, []);

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-5 text-black">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Bienvenue !</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Inscris-toi pour accéder à ton emploi du temps</p>

            <InputField
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                error={emailError}
            />

            <InputField
                type="text"
                value={lastname}
                onChange={e => setNom(e.target.value)}
                placeholder="Nom"
                error={lastNameError}
            />
            <InputField
                type="text"
                value={firstname}
                onChange={e => setPrenom(e.target.value)}
                placeholder="Prénom"
                error={firstNameError}
            />

            <Select
                options={classOptions}
                value={classGroupId.toString()}
                onChange={(value) => {
                    setClassGroupId(Number(value));
                }}
                placeholder="Sélectionnez une classe"
                error={classError}
            />

            <InputField
                type="password"
                value={password}
                onChange={e => setMotDePasse(e.target.value)}
                placeholder="Mot de passe"
                error={passwordError}
            />
            <InputField
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmationMotDePasse(e.target.value)}
                placeholder="Confirmez le mot de passe"
                error={confirmPasswordError}
            />

            <Button type="submit"
                    className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                S'inscrire
            </Button>

        </form>
    );
};

export default RegisterForm;
