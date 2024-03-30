import React, { useState } from "react";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            const formData = {
                name: name,
                email: email,
                phone: phone,
                password: password
            };

            const response = await fetch('http://localhost:80/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newUser = await response.json();
                console.log('User registered successfully:', newUser);
            } else {
                console.error('Failed to register user:', response.status);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser();
    };

    return (
        <>
            <h1>Sign Up Form</h1>
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                onSubmit={handleSubmit}
            >
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default SignUp;
