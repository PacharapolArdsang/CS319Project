import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import bg from '../../assets/Bgcs319.png';
import { useAuth } from '../../context/useAuth';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleRegister = async () => {
    // Validation
    if (!formData.username.trim()) {
      setError('กรุณากรอกชื่อบัญชีผู้ใช้งาน');
      return;
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }
    if (!formData.firstName.trim()) {
      setError('กรุณากรอกชื่อจริง');
      return;
    }
    if (!formData.lastName.trim()) {
      setError('กรุณากรอกนามสกุล');
      return;
    }
    if (!formData.email.trim()) {
      setError('กรุณากรอกอีเมล');
      return;
    }
    if (!formData.phone.trim()) {
      setError('กรุณากรอกเบอร์โทรศัพท์');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/App/HomePage');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
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
        
        {/* Right side - Sign-up form */}
        <div style={{ 
          flex: 1,
          background: 'white', 
          boxShadow: '-4px 0 16px rgba(0,0,0,0.1)', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '60px 40px 20px',
        }}>
          <div style={{ width: '100%', maxWidth: '520px' }}>
            <h2 style={{ textAlign: 'center', margin: 0, fontSize: '1.7rem', fontWeight: 700, marginBottom: '28px', color: '#000' }}>สมัครสมาชิก</h2>
            
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#000' }}>บัญชีผู้ใช้งาน</label>
                <input 
                  type="text" 
                  placeholder="กรอกชื่อบัญชีผู้ใช้งาน"
                  value={formData.username}
                  onChange={handleChange('username')} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '8px', 
                    border: '1px solid #d0d0d0', 
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    backgroundColor: '#f8f8f8'
                  }} 
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#000' }}>รหัสผ่าน</label>
                <input 
                  type="password" 
                  placeholder="กรอกรหัสผ่าน"
                  value={formData.password}
                  onChange={handleChange('password')} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '8px', 
                    border: '1px solid #d0d0d0', 
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    backgroundColor: '#f8f8f8'
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#000' }}>ชื่อจริง</label>
                <input 
                  type="text" 
                  placeholder="กรอกชื่อจริง"
                  value={formData.firstName}
                  onChange={handleChange('firstName')} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '8px', 
                    border: '1px solid #d0d0d0', 
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    backgroundColor: '#f8f8f8'
                  }} 
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#000' }}>นามสกุล</label>
                <input 
                  type="text" 
                  placeholder="กรอกนามสกุล"
                  value={formData.lastName}
                  onChange={handleChange('lastName')} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '8px', 
                    border: '1px solid #d0d0d0', 
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    backgroundColor: '#f8f8f8'
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#000' }}>อีเมล</label>
                <input 
                  type="email" 
                  placeholder="กรอกอีเมล"
                  value={formData.email}
                  onChange={handleChange('email')} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '8px', 
                    border: '1px solid #d0d0d0', 
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    backgroundColor: '#f8f8f8'
                  }} 
                />
              </div>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#000' }}>เบอร์โทรศัพท์</label>
                <input 
                  type="tel" 
                  placeholder="กรอกเบอร์โทรศัพท์"
                  value={formData.phone}
                  onChange={handleChange('phone')} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '8px', 
                    border: '1px solid #d0d0d0', 
                    fontSize: '0.9rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    backgroundColor: '#f8f8f8'
                  }} 
                />
              </div>
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
                marginBottom: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#000' }}>
              มีบัญชีผู้ใช้งานแล้ว? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600 }}>เข้าสู่ระบบ</a>
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

export default SignUp;
