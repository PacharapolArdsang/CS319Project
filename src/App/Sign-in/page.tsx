

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import bg from '../../assets/Bgcs319.png';
import { useAuth } from '../../context/useAuth';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username.trim()) {
      setError('กรุณากรอกชื่อบัญชีผู้ใช้งาน');
      return;
    }
    if (!password.trim()) {
      setError('กรุณากรอกรหัสผ่าน');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/App/HomePage');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar showMenu={false} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left side - Background */}
        <div style={{
          flex: 1,
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }} />
        
        {/* Right side - Sign-in form */}
        <div style={{ 
          width: '400px',
          background: 'white', 
          boxShadow: '-4px 0 16px rgba(0,0,0,0.1)', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '80px 40px 20px',
        }}>
          <div style={{ width: '100%', maxWidth: '320px' }}>
            <h2 style={{ textAlign: 'center', margin: 0, fontSize: '1.7rem', fontWeight: 700, marginBottom: '28px', color: '#000' }}>เข้าสู่ระบบ</h2>
            {error && (
              <div style={{ 
                background: '#fee', 
                color: '#c00', 
                padding: '12px', 
                borderRadius: '8px', 
                marginBottom: '16px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#000' }}>บัญชีผู้ใช้งาน</label>
              <input 
                type="text" 
                placeholder="กรอกชื่อบัญชีผู้ใช้งาน"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  borderRadius: '8px', 
                  border: '1px solid #d0d0d0', 
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                  backgroundColor: '#f8f8f8'
                }} 
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#000' }}>รหัสผ่าน</label>
              <input 
                type="password" 
                placeholder="กรอกรหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  borderRadius: '8px', 
                  border: '1px solid #d0d0d0', 
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                  backgroundColor: '#f8f8f8'
                }} 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <input type="checkbox" id="remember" style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
              <label htmlFor="remember" style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#000' }}>จดจำฉัน</label>
            </div>
            <button
              style={{ 
                width: '100%', 
                height: '52px', 
                cursor: 'pointer', 
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                marginBottom: '20px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#000' }}>
              ยังไม่มีบัญชีผู้ใช้งาน? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/App/Sign-up'); }} style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>สมัครสมาชิก</a>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#000000ff', textAlign: 'center', marginTop: '20px' }}>
            © 2025 by WeLoveLungTuu Co.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
