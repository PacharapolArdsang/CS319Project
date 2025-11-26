import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    if (!currentPassword.trim()) {
      alert('กรุณากรอกรหัสผ่านปัจจุบัน');
      return;
    }
    if (!newPassword.trim()) {
      alert('กรุณากรอกรหัสผ่านใหม่');
      return;
    }
    if (newPassword.length < 6) {
      alert('รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }
    
    // In a real app, you would verify the current password and update to new password
    alert('เปลี่ยนรหัสผ่านสำเร็จ!');
    setCurrentPassword('');
    setNewPassword('');
  };

  const handleSave = () => {
    if (!firstName.trim()) {
      alert('กรุณากรอกชื่อจริง');
      return;
    }
    if (!lastName.trim()) {
      alert('กรุณากรอกนามสกุล');
      return;
    }
    if (!name.trim()) {
      alert('กรุณากรอกอีเมล');
      return;
    }
    if (!email.trim()) {
      alert('กรุณากรอกเบอร์โทรศัพท์');
      return;
    }

    // Save profile data
    const profileData = {
      firstName,
      lastName,
      name,
      email
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    alert('บันทึกข้อมูลสำเร็จ!');
    navigate('/App/HomePage');
  };

  const handleCancel = () => {
    navigate('/App/HomePage');
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar showMenu={true} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', position: 'relative', minHeight: 'calc(100vh - 64px)' }}>
        {/* Form Section - left side */}
        <div style={{ width: '480px', padding: '48px 0 0 60px', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '32px' }}>แก้ไขข้อมูล</h1>

          {/* Form Grid - 2 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* ชื่อจริง */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>
                ชื่อจริง
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="ชื่อจริง"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #d0d0d0',
                  backgroundColor: '#f8f8f8',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* นามสกุล */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>
                นามสกุล
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="นามสกุล"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #d0d0d0',
                  backgroundColor: '#f8f8f8',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* อีเมล */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>
              อีเมล
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="อีเมล"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #d0d0d0',
                backgroundColor: '#f8f8f8',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* เบอร์โทรศัพท์ */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>
              เบอร์โทรศัพท์
            </label>
            <input
              type="tel"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1px solid #d0d0d0',
                backgroundColor: '#f8f8f8',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* เปลี่ยนรหัสผ่าน Section */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>
              เปลี่ยนรหัสผ่าน
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
              {/* รหัสผ่าน */}
              <div>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="รหัสผ่าน"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d0d0d0',
                    backgroundColor: '#f8f8f8',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* รหัสผ่านใหม่ */}
              <div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="รหัสผ่านใหม่"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d0d0d0',
                    backgroundColor: '#f8f8f8',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* เปลี่ยนรหัส Button */}
            <button
              onClick={handleChangePassword}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                marginTop: '8px',
                width: '180px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              เปลี่ยนรหัสผ่าน
            </button>
          </div>
        </div>

        {/* Bottom Buttons - right bottom absolute */}
        <div style={{ position: 'absolute', right: 60, bottom: 40, display: 'flex', gap: '16px' }}>
          <button
            onClick={handleCancel}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: '1px solid #d0d0d0',
              backgroundColor: 'white',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
