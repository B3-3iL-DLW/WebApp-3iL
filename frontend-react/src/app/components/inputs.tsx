// src/app/components/inputs.tsx

import React from 'react';

interface InputFieldProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
}

const InputField = ({ type, value, onChange, placeholder, error }: InputFieldProps) => {
    return (
        <div className="mb-8">
            <div
                className={`flex items-center py-2 px-3 rounded-2xl ${error ? 'border-2 border-red-500' : 'border-2'}`}>
                <input
                    // required={true}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="pl-2 w-full outline-none border-none pb-0"
                    placeholder={placeholder}
                />
            </div>
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
};

export default InputField;