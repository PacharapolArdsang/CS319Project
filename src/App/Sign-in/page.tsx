

import React from 'react';
import signInImage from '../../assets/SignIn_Page.png';
import signinButtonImage from '../../assets/SigninBotton.png';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#222' }}>
      <img
        src={signInImage}
        alt="Sign In"
        style={{ width: '100vw', height: '110vh', objectFit: 'cover', display: 'block' }}
      />
      <h1 style={{ position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)', color: 'white', fontSize: '3rem', zIndex: 2, margin: 0 }}></h1>
      <img
        src={signinButtonImage}
        alt="Sign In Button"
        style={{ position: 'absolute', right: '32px', top: '586px', width: '400px', height: '86px', cursor: 'pointer', zIndex: 3 }}
        onClick={() => navigate('/App/HomePage')}
      />
    </div>
  );
};

export default SignIn;
