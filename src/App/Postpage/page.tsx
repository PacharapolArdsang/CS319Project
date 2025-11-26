import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { postsAPI } from '../../services/api';
import { useAuth } from '../../context/useAuth';

const PostPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setSelectedImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    // Check authentication
    if (!isAuthenticated) {
      alert('กรุณาเข้าสู่ระบบก่อนโพสต์');
      navigate('/');
      return;
    }

    // Validate inputs
    if (!title.trim()) {
      alert('กรุณากรอกชื่อของบริจาค');
      return;
    }
    if (!description.trim()) {
      alert('กรุณากรอกรายละเอียด');
      return;
    }
    if (selectedImages.length === 0) {
      alert('กรุณาเลือกรูปภาพอย่างน้อย 1 รูป');
      return;
    }
    if (!contact.trim()) {
      alert('กรุณากรอกช่องทางติดต่อ');
      return;
    }

    setIsLoading(true);

    try {
      await postsAPI.createPost({
        title,
        description,
        images: selectedImages,
        contact
      });

      alert('โพสต์สำเร็จ!');
      navigate('/App/HomePage');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('เกิดข้อผิดพลาดในการสร้างโพสต์');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
      <Navbar showMenu={true} />
      
      <div style={{ 
        flex: 1, 
        padding: '40px 80px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* ชื่อของบริจาค */}
        <div style={{ marginBottom: '24px', maxWidth: '500px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '1rem', color: '#000' }}>
            ชื่อของบริจาค
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="กรอกชื่อของบริจาค"
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

        {/* รายละเอียดของบริจาค */}
        <div style={{ marginBottom: '24px', maxWidth: '500px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '1rem', color: '#000' }}>
            รายละเอียดของบริจาค
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="กรอกรายละเอียด"
            rows={5}
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

        {/* รูปภาพประกอบ */}
        <div style={{ marginBottom: '24px', maxWidth: '500px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '1rem', color: '#000' }}>
            รูปภาพประกอบ
          </label>
          <div style={{
            width: '100%',
            minHeight: '200px',
            border: '2px dashed #d0d0d0',
            borderRadius: '8px',
            backgroundColor: '#f8f8f8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            padding: '20px'
          }}
          onClick={() => document.getElementById('imageUpload')?.click()}
          >
            {selectedImages.length === 0 ? (
              <>
                <div style={{ fontSize: '3rem', color: '#c0c0c0', marginBottom: '8px' }}>🖼️</div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>Drop image here,</div>
                <div style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: 600 }}>
                  Select from library or Upload
                </div>
              </>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
                gap: '12px',
                width: '100%'
              }}>
                {selectedImages.map((img, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img 
                      src={img} 
                      alt={`Preview ${index + 1}`} 
                      style={{ 
                        width: '100%', 
                        height: '120px', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }} 
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* ช่องทางติดต่อ */}
        <div style={{ marginBottom: 'auto', maxWidth: '500px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '1rem', color: '#000' }}>
            ช่องทางติดต่อ
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="กรอกข้อมูลช่องทางการติดต่อ"
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

        {/* Buttons - Right Bottom */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '40px' }}>
          <button
            onClick={() => navigate('/App/HomePage')}
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
            onClick={handlePost}
            disabled={isLoading}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              background: isLoading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
            }}
          >
            {isLoading ? 'กำลังโพสต์...' : 'โพสต์'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
