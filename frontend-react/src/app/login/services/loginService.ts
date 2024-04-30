export interface Credentials {
    email: string;
    password: string;
}

export async function login({ email, password }: Credentials) {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to log in');
    }

    const { access_token } = await response.json();
    console.log('Access token:', access_token);
    return access_token;
}