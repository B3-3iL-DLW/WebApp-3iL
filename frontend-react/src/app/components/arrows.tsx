// src/app/components/arrows.tsx

import React from 'react';

interface ArrowProps {
    direction: string;
    onClick: () => void;
}

const Arrow = ({ direction, onClick }: ArrowProps) => {
    return (
        <button onClick={onClick}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            >
                <path d={direction === 'right' ? 'M5 12h13M12 5l7 7-7 7' : 'M19 12H6M12 5l-7 7 7 7'}/>
            </svg>
        </button>
    );
};

export default Arrow;