import React from 'react';
import Navbar from '../../components/Navbar';

const AboutPage: React.FC = () => {
  const teamMembers = [
    { id: 1, name: '', description: '', image: '' },
    { id: 2, name: '', description: '', image: '' },
    { id: 3, name: '', description: '', image: '' },
    { id: 4, name: '', description: '', image: '' },
    { id: 5, name: '', description: '', image: '' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
      <Navbar showMenu={true} />
      
      <div style={{ flex: 1, padding: '40px 60px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            margin: '0 0 10px 0',
            color: '#667eea'
          }}>
            KINDLINK
          </h1>
          <p style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            margin: '0 0 10px 0',
            color: '#000'
          }}>
            เริ่มต้นจากความต้องการ
          </p>
          <p style={{ 
            fontSize: '1.3rem', 
            fontWeight: 600, 
            margin: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ช่วยเหลือกลุ่มคนและบริจาคของใช้เพื่อสังคม
          </p>
        </div>

        {/* Team Title */}
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 700, 
          marginBottom: '30px',
          color: '#000'
        }}>
          ทีม KINDLINK
        </h2>

        {/* Team Members Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '24px',
          marginBottom: '40px'
        }}>
          {teamMembers.map((member) => (
            <div key={member.id} style={{ 
              backgroundColor: '#e8e8e8', 
              borderRadius: '12px', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16px',
            }}>
              {/* Profile Image Placeholder */}
              <div style={{ 
                width: '80px',
                height: '80px',
                borderRadius: '50%', 
                backgroundColor: '#c0c0c0',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {member.image && <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              
              {/* Member Info */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: 600, fontSize: '0.95rem', color: '#000' }}>
                  ชื่อ : {member.name}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#000' }}>
                  ตำแหน่ง : {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        textAlign: 'right', 
        padding: '20px 60px', 
        fontSize: '0.85rem', 
        color: '#000'
      }}>
        © 2025 by WeLoveLungTuu Co.
      </div>
    </div>
  );
};

export default AboutPage;
