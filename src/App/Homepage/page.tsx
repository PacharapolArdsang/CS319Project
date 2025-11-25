import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BgWrapper from '../../components/BgWrapper';
import riceImg from '../../assets/rice.png';
import jacketImg from '../../assets/Jacket.png';
import pantsImg from '../../assets/pants.png';
import tvImg from '../../assets/TV.png';
import microwaveImg from '../../assets/Microwave.png';
import shirtImg from '../../assets/Shirt.png';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  
  const mockPosts = [
    { id: 1, title: 'ข้าวสาร', description: 'รายละเอียดเพิ่มเติม...', image: riceImg },
    { id: 2, title: 'เสื้อกันลม', description: 'รายละเอียดเพิ่มเติม...', image: jacketImg },
    { id: 3, title: 'ยีนส์คงกระพัน', description: 'รายละเอียดเพิ่มเติม...', image: pantsImg },
    { id: 4, title: 'โทรทัศน์ตู้แก้ว', description: 'รายละเอียดเพิ่มเติม...', image: tvImg },
    { id: 5, title: 'ไมโครเวฟ ปี 1987', description: 'รายละเอียดเพิ่มเติม...', image: microwaveImg },
    { id: 6, title: 'เสื้อยืด', description: 'รายละเอียดเพิ่มเติม...', image: shirtImg },
  ];

  useEffect(() => {
    const loadPosts = () => {
      const posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
      setUserPosts(posts);
    };
    
    loadPosts();
    
    window.addEventListener('storage', loadPosts);
    return () => window.removeEventListener('storage', loadPosts);
  }, []);

  const allPosts = [...mockPosts, ...userPosts];

  return (
    <BgWrapper>
      <Navbar showMenu={true} />
      <div style={{ padding: '40px 60px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '48px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#000', marginBottom: '16px' }}>
              เริ่มต้นการ<span style={{ color: '#667eea' }}>แบ่งปัน</span>
            </h1>
            <button
              onClick={() => navigate('/App/PostPage')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '24px',
                color: 'white',
                padding: '12px 28px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
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
              โพสต์สิ่งของที่ต้องการบริจาค ➜
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginTop: '32px',
            }}
          >
            {allPosts.map((post, index) => {
              const isUserPost = index >= mockPosts.length;
              return (
                <div
                  key={post.id}
                  onClick={() => {
                    // Only navigate to detail page if it's a user post (not mock data)
                    if (isUserPost) {
                      navigate(`/App/DetailPage/${post.id}`);
                    }
                  }}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: isUserPost ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (isUserPost) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: '#000', marginBottom: '6px' }}>
                    {post.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{post.description}</p>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </BgWrapper>
  );
};

export default HomePage;
