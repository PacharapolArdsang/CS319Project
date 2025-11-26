import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BgWrapper from '../../components/BgWrapper';
import { postsAPI } from '../../services/api';
import { useAuth } from '../../context/useAuth';

interface Post {
  _id: string;
  title: string;
  description: string;
  images: string[];
  contact: string;
  status: string;
  createdAt: string;
}

const MyPostPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      if (!isAuthenticated) {
        navigate('/');
        return;
      }
      
      try {
        const posts = await postsAPI.getMyPosts();
        setMyPosts(posts);
      } catch (error) {
        console.error('Failed to load my posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, [isAuthenticated, navigate]);

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
              โพสต์<span style={{ color: '#667eea' }}>ของฉัน</span>
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

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
              <p style={{ fontSize: '1.2rem' }}>กำลังโหลด...</p>
            </div>
          ) : myPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '16px' }}>ยังไม่มีโพสต์</p>
              <p style={{ fontSize: '0.95rem' }}>เริ่มต้นแบ่งปันสิ่งของของคุณเพื่อช่วยเหลือผู้อื่น</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                marginTop: '32px',
              }}
            >
              {myPosts.map((post) => (
                <div
                  key={post._id}
                  onClick={() => navigate(`/App/EditPostPage/${post._id}`)}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={post.images?.[0]}
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
                    <span style={{ 
                      display: 'inline-block',
                      marginTop: '8px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      background: post.status === 'available' ? '#e8f5e9' : post.status === 'reserved' ? '#fff3e0' : '#e3f2fd',
                      color: post.status === 'available' ? '#2e7d32' : post.status === 'reserved' ? '#ef6c00' : '#1565c0'
                    }}>
                      {post.status === 'available' ? 'พร้อมบริจาค' : post.status === 'reserved' ? 'จองแล้ว' : 'บริจาคแล้ว'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </BgWrapper>
  );
};

export default MyPostPage;
