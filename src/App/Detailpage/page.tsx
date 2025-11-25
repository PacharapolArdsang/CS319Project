import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const DetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    const foundPost = posts.find((p: any) => p.id.toString() === postId);
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/App/HomePage');
    }
  }, [postId, navigate]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const images = post.images || [post.image];

  return (
    <div style={{
      backgroundColor: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar showMenu={false} />
      
      <div style={{
        flex: 1,
        padding: '40px 60px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
        position: 'relative'
      }}>
        {/* Left side - Images */}
        <div style={{
          float: 'left',
          width: '300px',
          marginRight: '40px'
        }}>
          <div style={{
            marginBottom: '12px'
          }}>
            <img
              src={images[currentImageIndex]}
              alt={post.title}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
          </div>
          {images.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setCurrentImageIndex(index)}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: currentImageIndex === index ? '2px solid #667eea' : '2px solid transparent',
                    opacity: currentImageIndex === index ? 1 : 0.6
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side - Details */}
        <div style={{
          overflow: 'hidden'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 700,
              marginBottom: '8px',
              color: '#000'
            }}>
              {post.title}
            </h2>
            <div style={{
              fontSize: '0.8rem',
              color: '#999',
              display: 'flex',
              gap: '8px'
            }}>
              <span>โพสต์เมื่อเวลา</span>
              <span>•</span>
              <span>สถานะ</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#000'
            }}>
              รายเอียดของบริจาค
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#333',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {post.description}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#000'
            }}>
              ชื่อผู้บริจาค
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#333'
            }}>
              {post.contact ? post.contact.split(',')[0] : 'ไม่ระบุ'}
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#000'
            }}>
              ช่องทางติดต่อ
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#333'
            }}>
              {post.contact || 'ไม่ระบุ'}
            </p>
          </div>
        </div>

        {/* Close Button - Bottom Right */}
        <div style={{
          clear: 'both',
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '40px'
        }}>
          <button
            onClick={() => navigate('/App/HomePage')}
            style={{
              padding: '10px 40px',
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
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
