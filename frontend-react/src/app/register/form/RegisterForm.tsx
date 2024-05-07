import React, {useEffect, useState} from 'react';
import InputField from '../../components/inputs';
import Button from '../../components/buttons';
import Select from '../../components/selects';
import useRegisterForm from '../hooks/useRegisterForm';
import {getClassGroups} from '../services/classgroupService';
import {Classgroup} from "@/app/models/classgroup";
import {register} from "@/app/register/services/registerService";


const RegisterForm: React.FC = () => {
    const {fields, setFieldValue, handleSubmit} = useRegisterForm((user) => {
        return register(user);
    });

    const [classOptions, setClassOptions] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchClassGroups = async () => {
            const classGroups = await getClassGroups();
            const classOptions = classGroups.data.reduce((options: { [key: string]: string }, group: Classgroup) => {
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
                value={fields.email.value}
                onChange={e => setFieldValue('email', e.target.value)}
                placeholder="Email"
                error={fields.email.error}
            />

            <InputField
                type="text"
                value={fields.lastname.value}
                onChange={e => setFieldValue('lastname', e.target.value)}
                placeholder="Nom"
                error={fields.lastname.error}
            />
            <InputField
                type="text"
                value={fields.firstname.value}
                onChange={e => setFieldValue('firstname', e.target.value)}
                placeholder="Prénom"
                error={fields.firstname.error}
            />

            <Select
                options={classOptions}
                value={fields.classGroupId.value}
                onChange={(value) => {
                    setFieldValue('classGroupId', value);
                }}
                placeholder="Sélectionnez une classe"
                error={fields.classGroupId.error}
            />

            <InputField
                type="password"
                value={fields.password.value}
                onChange={e => setFieldValue('password', e.target.value)}
                placeholder="Mot de passe"
                error={fields.password.error}
            />
            <InputField
                type="password"
                value={fields.confirmPassword.value}
                onChange={e => setFieldValue('confirmPassword', e.target.value)}
                placeholder="Confirmez le mot de passe"
                error={fields.confirmPassword.error}
            />

            <Button type="submit"
                    className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                S'inscrire
            </Button>

        </form>
    );
};

export default RegisterForm;