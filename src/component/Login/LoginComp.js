import React, { useState } from "react";
import serverUri from '../serverUrl';


const LoginComp = () => {
    const serverlink = serverUri();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${serverlink}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Invalid email or password');
            }

            const { user } = await response.json();
            localStorage.setItem('token', user._id);
            localStorage.setItem('user', `${user.name} ${user.lastname}`);
            localStorage.setItem('address', user.address);
            localStorage.removeItem('favorits');



            setTimeout(() => {
                window.location.reload();
            }, 500);
                

            // fetchUserData();
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }
    };

    const handleSignUp = () => {
        // setSingUp(!singup);
        // setLogIn(!login);
    };

    const handleClose = () => {
        // setLogIn(false);
    };

    return (
        <>
            <h1 className="sing-up-header">Login Form</h1>
            <form className="sing-up-form">
                <div onClick={handleClose} className="closeloginform">
                    Close
                </div>
                <div className="sing-up-input-conteiner">
                    <div className="sing-up-input-label">Email:</div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                </div>
                <div className="sing-up-input-conteiner">
                    <div className="sing-up-input-label">Password:</div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                </div>
                <div className="sing-up-btn-conteiner">
                    <button style={{ position: 'relative', padding: '10px 20px' }} className="sing-up-btn" onClick={handleLogin}>Log In</button>
                </div>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} className="sing-up-btn-conteiner">
                    <samp style={{ display: 'flex', alignItems: 'center' }}><samp><input type="checkbox"></input></samp>Remember password</samp>
                    <sapm style={{ margin: '8px', cursor: 'pointer' }}>Forget Password</sapm>
                    <button style={{ position: 'relative', right: '0', padding: '10px 20px' }} className="sing-up-btn" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </>
    );
};

export default LoginComp;
