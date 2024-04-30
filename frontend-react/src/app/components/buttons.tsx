// src/app/components/Button.tsx

import React from 'react';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

const Button = ({ type, onClick, className, children }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export default Button;