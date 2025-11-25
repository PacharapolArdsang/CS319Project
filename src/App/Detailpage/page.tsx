import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e5e5e5',
          fontSize: '1.3rem',
          fontWeight: 700,
          display: 'flex',
          justifyContent: 'center',
          position: 'relative'
        }}>
          รายะเอียด
        </div>

        {/* Content */}
        <div style={{
          display: 'flex',
          padding: '24px'
        }}>
          {/* Left side - Images */}
          <div style={{
            flex: '0 0 350px',
            marginRight: '32px'
          }}>
            <div style={{
              position: 'relative',
              marginBottom: '12px'
            }}>
              <img
                src={images[currentImageIndex]}
                alt={post.title}
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
              />
            </div>
            {images.length > 1 && (
              <div style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto'
              }}>
                {images.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: currentImageIndex === index ? '3px solid #667eea' : '3px solid transparent',
                      opacity: currentImageIndex === index ? 1 : 0.6
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right side - Details */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '8px',
                color: '#000'
              }}>
                {post.title}
              </h2>
              <div style={{
                fontSize: '0.85rem',
                color: '#999',
                display: 'flex',
                gap: '8px'
              }}>
                <span>เมื่อผู้โพส</span>
                <span>•</span>
                <span>ทุกวันนี้</span>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#000'
              }}>
                รายเอียดของบริจาค
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#333',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {post.description}
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#000'
              }}>
                ชื่อผู้บริจาค
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#333'
              }}>
                {post.contact ? post.contact.split(',')[0] : 'ไม่ระบุ'}
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: '12px',
                color: '#000'
              }}>
                ช่องทางติดต่อ
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: '#333'
              }}>
                {post.contact || 'ไม่ระบุ'}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => navigate('/App/HomePage')}
            style={{
              padding: '12px 48px',
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
