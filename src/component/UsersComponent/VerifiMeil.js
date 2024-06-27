import React, { useState, useRef, useCallback, useEffect } from 'react';
import { repe, gmail, VerifiCont } from './Tools';
const TryAgainButton = ({ timer, wait, trayagain }) => {
  return (
    <div className="again">
      <div onClick={trayagain} className={`btntray ${wait ? 'disabled' : ''}`}>
        <samp>{wait ? `${timer} S` : 'Try again'}</samp>
        {wait && (
          <samp
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={repe} alt="" />
          </samp>
        )}
      </div>
    </div>
  );
};

const VerifiMeil = ({ email, setVerif, setVerified }) => {
  const [wait, setWait] = useState(false);
  const [timer, setTimer] = useState(90);
  const inputRef = useRef('');
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setWait(false);
          return 90;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const trayagain = () => {
    setTimer(90);
    setWait(true);
    startTimer();
  };

  useEffect(() => {
    trayagain();
  }, []);

  const sendVerificationEmail = async () => {
    console.log(email);

    try {
      const verifimeil = await fetch('http://localhost:3001/verifi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!verifimeil.ok) {
        throw new Error('Failed to send verification email');
      }

      const response = await verifimeil.json();
      console.log('Response from backend:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <VerifiCont className="verificationmessage">
        <div>
          <div className="close-container">
            <div
              onClick={() => {
                setVerif(false);
              }}
              className="btn"
            >
              {' '}
              {'Close'}
            </div>
          </div>
          <div>
            <div className="note">
              <span style={{ color: 'red' }}>Note!</span>
              Registration requires email verification, please enter the
              one-time code sent to your email address
            </div>
            <div className="email">
              <img src={gmail} alt="" /> {email}
            </div>
          </div>
          <div className="inputcode">
            <input
              type="text"
              placeholder="Enter Code"
              onChange={(e) => (inputRef.current = e.target.value)}
            />
          </div>
          <TryAgainButton timer={timer} wait={wait} trayagain={trayagain} />
          <div>
            <button
              onClick={() => {
                setVerified(true);
                setVerif(false);
              }}
            >
              {' '}
              verifi Now{' '}
            </button>
          </div>
        </div>

        <h1 style={{ textAlign: 'left', color: 'red' }}>
          This feature is under development
        </h1>
      </VerifiCont>
    </>
  );
};

export default VerifiMeil;
