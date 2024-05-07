// src/app/register/hooks/useRegisterForm.ts

import React, {useState} from 'react';
import {validateEmail, validateRequired} from "@/app/utils/validators";
import {ApiResponse} from "@/app/api/apiService";

interface FieldState {
    value: string;
    error: string;
}

interface FieldsState {
    [key: string]: FieldState;

    email: FieldState;
    lastname: FieldState;
    firstname: FieldState;
    classGroupId: FieldState;
    password: FieldState;
    confirmPassword: FieldState;
}

const useRegisterForm = (onSubmit: (data: {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    classGroupId: number,
}) => Promise<ApiResponse>) => {
    const [fields, setFields] = useState<FieldsState>({
        email: {value: '', error: ''},
        lastname: {value: '', error: ''},
        firstname: {value: '', error: ''},
        classGroupId: {value: '', error: ''},
        password: {value: '', error: ''},
        confirmPassword: {value: '', error: ''},
    });

    const setFieldValue = (field: keyof FieldsState, value: string) => {
        setFields(prevFields => ({
            ...prevFields,
            [field]: {...prevFields[field], value},
        }));
    };

    const validateFields = () => {
        const newFields = {...fields};

        newFields.email.error = validateEmail(newFields.email.value);
        newFields.lastname.error = validateRequired(newFields.lastname.value);
        newFields.firstname.error = validateRequired(newFields.firstname.value);
        newFields.classGroupId.error = validateRequired(newFields.classGroupId.value);
        newFields.password.error = validateRequired(newFields.password.value);
        newFields.confirmPassword.error = validateRequired(newFields.confirmPassword.value) ||
            (newFields.password.value !== newFields.confirmPassword.value ? 'Les mots de passe ne correspondent pas.' : '');

        setFields(newFields);

        return !Object.values(newFields).some(field => field.error);
    };


    const handleErrors = (response: ApiResponse) => {
        if (!response.ok) {
            if (response.status === 409) {
                setFields(prevFields => ({
                    ...prevFields,
                    email: {...prevFields.email, error: 'Cet email est déjà utilisé.'},
                }));
            } else {
                console.log('Error:', response.data);
            }
        } else {
            console.log('Registration successful:', response.data);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (validateFields()) {
            const user = {
                email: fields.email.value,
                password: fields.password.value,
                firstname: fields.firstname.value,
                lastname: fields.lastname.value,
                classGroupId: Number(fields.classGroupId.value),
            };
            const response = await onSubmit(user);
            handleErrors(response);
        }
    };

    return {
        fields,
        setFieldValue,
        handleSubmit,
    };
};

export default useRegisterForm;