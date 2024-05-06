// src/app/register/hooks/useRegisterForm.ts

import React, {useState} from 'react';
import {validateRequired} from "@/app/utils/validators";

const useRegisterForm = (onSubmit: (data: {
    nom: string,
    prenom: string,
    classe: string,
    motDePasse: string
}) => void) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [classe, setClasse] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [nomError, setNomError] = useState('');
    const [prenomError, setPrenomError] = useState('');
    const [classeError, setClasseError] = useState('');
    const [motDePasseError, setMotDePasseError] = useState('');
    const [confirmationMotDePasseError, setConfirmationMotDePasseError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const newNomError = validateRequired(nom);
        const newPrenomError = validateRequired(prenom);
        const newClasseError = validateRequired(classe);
        const newMotDePasseError = validateRequired(motDePasse);
        const newConfirmationMotDePasseError = validateRequired(confirmationMotDePasse) ||
            (motDePasse !== confirmationMotDePasse ? 'Les mots de passe ne correspondent pas.' : '');


        setNomError(newNomError);
        setPrenomError(newPrenomError);
        setClasseError(newClasseError);
        setMotDePasseError(newMotDePasseError);
        setConfirmationMotDePasseError(newConfirmationMotDePasseError);

        if (!newNomError && !newPrenomError && !newClasseError && !newMotDePasseError && !newConfirmationMotDePasseError) {
            onSubmit({nom, prenom, classe, motDePasse});
        }
    };

    return {
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
        setConfirmationMotDePasse
    };
};

export default useRegisterForm;