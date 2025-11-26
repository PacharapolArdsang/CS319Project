import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BgWrapper from '../../components/BgWrapper';
import { postsAPI } from '../../services/api';
import riceImg from '../../assets/rice.png';
import jacketImg from '../../assets/Jacket.png';
import pantsImg from '../../assets/pants.png';
import tvImg from '../../assets/TV.png';
import microwaveImg from '../../assets/Microwave.png';
import shirtImg from '../../assets/Shirt.png';

interface Post {
  _id: string;
  title: string;
  description: string;
  images: string[];
  image?: string;
  contact: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  status: string;
  createdAt: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const mockPosts = [
    { id: 'mock1', title: 'ข้าวสาร', description: 'รายละเอียดเพิ่มเติม...', image: riceImg },
    { id: 'mock2', title: 'เสื้อกันลม', description: 'รายละเอียดเพิ่มเติม...', image: jacketImg },
    { id: 'mock3', title: 'ยีนส์คงกระพัน', description: 'รายละเอียดเพิ่มเติม...', image: pantsImg },
    { id: 'mock4', title: 'โทรทัศน์ตู้แก้ว', description: 'รายละเอียดเพิ่มเติม...', image: tvImg },
    { id: 'mock5', title: 'ไมโครเวฟ ปี 1987', description: 'รายละเอียดเพิ่มเติม...', image: microwaveImg },
    { id: 'mock6', title: 'เสื้อยืด', description: 'รายละเอียดเพิ่มเติม...', image: shirtImg },
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await postsAPI.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  const allPosts = [
    ...mockPosts.map(p => ({ ...p, isMock: true })),
    ...posts.map(p => ({ 
      id: p._id, 
      title: p.title, 
      description: p.description, 
      image: p.images?.[0] || p.image,
      isMock: false 
    }))
  ];

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
            {isLoading ? (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '40px', color: '#666' }}>
                กำลังโหลด...
              </div>
            ) : (
            allPosts.map((post) => {
              const isMock = 'isMock' in post && post.isMock;
              return (
                <div
                  key={post.id}
                  onClick={() => {
                    if (!isMock) {
                      navigate(`/App/DetailPage/${post.id}`);
                    }
                  }}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: isMock ? 'default' : 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isMock) {
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
            })
            )}
          </div>
        </div>
      </div>
    </BgWrapper>
  );
};

export default HomePage;
