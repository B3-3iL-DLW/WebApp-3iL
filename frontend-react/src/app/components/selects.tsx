// src/app/components/Select.tsx

import React, {useEffect, useRef, useState} from 'react';

interface SelectProps {
    options: { [key: string]: string };
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    error?: string;
}

const Select: React.FC<SelectProps> = ({options = {}, value, onChange, placeholder, error}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const ref = useRef<HTMLDivElement>(null);

    const filteredOptions = options ? Object.keys(options)
        .filter(key => options[key].toLowerCase().includes(search.toLowerCase()))
        .reduce((obj: { [key: string]: string }, key) => {
            obj[key] = options[key];
            return obj;
        }, {}) : {};

    const handleSelect = (key: string) => {
        onChange(key);
        setOpen(false);
        setSearch('');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative pb-8" ref={ref}>
            <button type="button" onClick={(event) => {
                event.stopPropagation();
                setOpen(!open);
            }}
                    className={`relative z-0 w-full py-2 px-3 rounded-2xl pr-10 text-left 
                    transition duration-150 ease-in-out bg-white cursor-default
                    focus:outline-none   sm:text-sm sm:leading-5
                    ${error ? 'border-2 border-red-500' : 'border border-gray-300'} `}>
                {value in options ? options[value] : placeholder}
            </button>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            {open && (
                <div
                    className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg py-1 overflow-auto text-base leading-6 max-h-60 focus:outline-none sm:text-sm sm:leading-5">
                    <input
                        required={true}
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full px-2 py-1"
                        placeholder="Rechercher..."
                    />
                    <ul>
                        {Object.keys(filteredOptions).map(key => (
                            <li key={key}
                                onClick={() => handleSelect(key)}
                                onKeyDown={(event) => {
                                    // Add a keyboard event listener
                                    if (event.key === 'Enter') {
                                        handleSelect(key);
                                    }
                                }}
                                role="button" // Add a role attribute
                                tabIndex={0} // Add a tabIndex attribute
                                className="relative py-2 pl-3 text-gray-900 cursor-default select-none pr-9">
                                {options[key]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default Select;