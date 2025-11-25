import React from 'react';
import bg from '../assets/Bgcs319.png';

const BgWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
};

export default BgWrapper;
