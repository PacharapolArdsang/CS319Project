import React from 'react';
import Navbar from '../../components/Navbar';
import bg from '../../assets/Bgcs319.png';
import contactPic from '../../assets/Contactpic.png';

const ContactPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar showMenu={true} />
      
      <div style={{ 
        flex: 1, 
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        position: 'relative'
      }}>
        {/* Form Container */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '60px 80px',
          maxWidth: '1100px',
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          position: 'relative',
          display: 'flex',
          gap: '40px'
        }}>
          {/* Left Side - Form Fields */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>ชื่อจริง</label>
                <input
                  type="text"
                  placeholder="ชื่อจริง"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d0d0d0',
                    backgroundColor: '#f8f8f8',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>นามสกุล</label>
                <input
                  type="text"
                  placeholder="นามสกุล"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>อีเมล</label>
                <input
                  type="email"
                  placeholder="อีเมล"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d0d0d0',
                    backgroundColor: '#f8f8f8',
                    fontSize: '0.9rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  placeholder="เบอร์โทรศัพท์"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
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

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>รายละเอียด</label>
              <textarea
                placeholder="กรอกรายละเอียด"
                rows={7}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d0d0d0',
                  backgroundColor: '#f8f8f8',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Right Side - Contact Image with Button */}
          <div style={{ 
            position: 'relative',
            width: '420px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={contactPic} 
              alt="Contact" 
              style={{ 
                width: '100%', 
                height: 'auto',
                objectFit: 'contain',
                marginBottom: '20px'
              }} 
            />
            
            {/* Submit Button positioned over image */}
            <button
              style={{
                width: '85%',
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
                position: 'absolute',
                bottom: '30px'
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
              ส่งฟอร์ม
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
