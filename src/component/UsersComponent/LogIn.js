import React, { useEffect, useState } from 'react';
import serverUri from '../../component/serverUrl';
import { useNavigate } from 'react-router-dom';

import {
  Form,
  FooterComp,
  HeaderComp,
  close,
  showpass,
  Mail,
  Pass,
  View,
  hide,
  LoadingComponent,
} from './Tools';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const serverlink = serverUri();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loginform = document.getElementById('LoginForm');
    if (loginform) {
      setTimeout(() => {
        loginform.style.translate = '0';
        setTimeout(() => {
          loginform.style.transform = 'scale(1)';
        }, 700);
      }, 100);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${serverlink}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };
  return (
    <>
      <HeaderComp navigate={navigate} title={'Login Form'} />

      <Form id="LoginForm">
        {loading && <LoadingComponent />}

        <h2> You are welcome </h2>
        <div className="item-cont">
          <img src={Mail} alt="" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="item-cont">
          <img src={Pass} alt="" />
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />
          <img
            className="view"
            onClick={() => {
              showpass(showPass, setShowPass);
            }}
            src={showPass ? hide : View}
            alt=""
          />
        </div>

        <div className="item-cont add">
          <div className="prop">
            <samp>
              <input type="checkbox" />
              Remember password
            </samp>
            <samp> Forget Password </samp>
          </div>

          <button onClick={handleLogin}>Log In</button>
        </div>

        <div style={{ justifyContent: 'center' }} className="item-cont add">
          <div
            className="singup"
            onClick={() => {
              close(navigate, 'singup');
            }}
            style={{ padding: '10px 30px' }}
          >
            Sign Up
          </div>
        </div>
      </Form>

      <FooterComp />
    </>
  );
};
export default Login;
