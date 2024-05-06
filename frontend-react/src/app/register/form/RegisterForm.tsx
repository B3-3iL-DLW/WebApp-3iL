// src/app/register/form/RegisterForm.tsx

import React from 'react';
import InputField from '../../components/inputs';
import Button from '../../components/buttons';
import Select from '../../components/selects';
import useRegisterForm from '../hooks/useRegisterForm';

interface RegisterFormProps {
    onSubmit: (data: { nom: string, prenom: string, classe: string, motDePasse: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onSubmit}) => {
    const {
        nom,
        prenom,
        classe,
        motDePasse,
        confirmationMotDePasse,
        nomError,
        prenomError,
        classeError,
        motDePasseError,
        confirmationMotDePasseError,
        handleSubmit,
        setNom,
        setPrenom,
        setClasse,
        setMotDePasse,
        setConfirmationMotDePasse,
    } = useRegisterForm(onSubmit);

    const classOptions = {
        classe1: 'Classe 1',
        classe2: 'Classe 2',
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl p-5 text-black">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Bienvenue !</h1>
            <p className="text-sm font-normal text-gray-600 mb-8">Inscris-toi pour accéder à ton emploi du temps</p>

            <InputField
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                placeholder="Nom"
                error={nomError}
            />
            <InputField
                type="text"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                placeholder="Prénom"
                error={prenomError}
            />

            <Select
                options={classOptions}
                value={classe}
                onChange={setClasse}
                placeholder="Sélectionnez une classe"
                error={classeError}
            />
            <InputField
                type="password"
                value={motDePasse}
                onChange={e => setMotDePasse(e.target.value)}
                placeholder="Mot de passe"
                error={motDePasseError}
            />
            <InputField
                type="password"
                value={confirmationMotDePasse}
                onChange={e => {
                    setConfirmationMotDePasse(e.target.value);
                }}
                placeholder="Confirmez le mot de passe"
                error={confirmationMotDePasseError}
            />

            <Button type="submit"
                    className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                S'inscrire
            </Button>

        </form>
    );
};

export default RegisterForm;