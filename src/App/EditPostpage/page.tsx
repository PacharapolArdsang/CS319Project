import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { postsAPI } from '../../services/api';
import { useAuth } from '../../context/useAuth';

interface Post {
  _id: string;
  title: string;
  description: string;
  images: string[];
  contact: string;
  status: string;
}

const EditPostPage: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const { isAuthenticated } = useAuth();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'available' | 'reserved' | 'donated'>('available');
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!isAuthenticated) {
        navigate('/');
        return;
      }
      
      if (!postId) {
        navigate('/App/MyPost');
        return;
      }
      
      try {
        const post = await postsAPI.getPostById(postId);
        setCurrentPost(post);
        setTitle(post.title);
        setDescription(post.description);
        setContact(post.contact);
        setStatus(post.status);
        setSelectedImages(post.images || []);
      } catch (error) {
        console.error('Failed to load post:', error);
        navigate('/App/MyPost');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPost();
  }, [postId, isAuthenticated, navigate]);

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

  const handleUpdate = async () => {
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

    setIsSaving(true);
    
    try {
      await postsAPI.updatePost(postId!, {
        title,
        description,
        images: selectedImages,
        contact,
        status
      });
      alert('แก้ไขโพสต์สำเร็จ!');
      navigate('/App/MyPost');
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('เกิดข้อผิดพลาดในการแก้ไขโพสต์');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('คุณต้องการลบโพสต์นี้ใช่หรือไม่?')) {
      try {
        await postsAPI.deletePost(postId!);
        alert('ลบโพสต์สำเร็จ!');
        navigate('/App/MyPost');
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('เกิดข้อผิดพลาดในการลบโพสต์');
      }
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        backgroundColor: 'white', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'white' }}>
      <Navbar showMenu={true} />
      
      <div style={{ 
        flex: 1, 
        padding: '40px 80px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '32px' }}>แก้ไขโพสต์</h1>

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

        <div style={{ marginBottom: '24px', maxWidth: '500px', marginTop: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '1rem', color: '#000' }}>
            สถานะ
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'available' | 'reserved' | 'donated')}
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
          >
            <option value="available">พร้อมบริจาค</option>
            <option value="reserved">จองแล้ว</option>
            <option value="donated">บริจาคแล้ว</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', marginTop: '40px' }}>
          <button
            onClick={handleDelete}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#ef4444',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
            }}
          >
            ลบโพสต์
          </button>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => navigate('/App/MyPost')}
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
              onClick={handleUpdate}
              disabled={isSaving}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                border: 'none',
                background: isSaving ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isSaving) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              {isSaving ? 'กำลังบันทึก...' : 'แก้ไข'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
