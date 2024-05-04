import React, { useState } from "react";
import serverUri from '../../component/serverUrl';
import { Link, useNavigate } from 'react-router-dom'; 

const Login = () => {
    const serverlink = serverUri();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${serverlink}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
                    
                        
                navigate('/');

                window.location.reload();


            
            
            
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <>
            <h1 className="sing-up-header">Login Form</h1>
            <form className="sing-up-form">
                <Link to={'/'}>
                <div className="closeloginform">
                    Close
                </div></Link>
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
                    <Link to="/singup">
                    <button style={{ position: 'relative', right: '0', padding: '10px 20px' }} className="sing-up-btn">Sign Up</button>
                    </Link>
                </div>
            </form>
        </>
    );
};

export default Login;
