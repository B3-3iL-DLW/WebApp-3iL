export const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
        return 'Veuillez remplir ce champ';
    } else if (!emailRegex.test(email)) {
        return "L'adresse email n'est pas valide";
    } else {
        return '';
    }
};

export const validateRequired = (value: string) => {
    return value ? '' : 'Veuillez remplir ce champ';
};