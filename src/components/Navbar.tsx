import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  showMenu?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showMenu = true }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'หน้าหลัก', path: '/App/HomePage' },
    { label: 'โพสต์', path: '/App/MyPost' },
    { label: 'แก้ไขข้อมูล', path: '/App/EditprofilePage' },
    { label: 'เกี่ยวกับ', path: '/App/AboutPage' },
    { label: 'ติดต่อ', path: '/App/ContactPage' },
    { label: 'ออกจากระบบ', path: '/' },
  ];

  const currentMenuItem = menuItems.find(item => item.path === location.pathname);
  const currentLabel = currentMenuItem ? currentMenuItem.label : 'หน้าหลัก';

  return (
    <nav style={{
      width: '100%',
      height: '64px',
      background: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      boxSizing: 'border-box',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontSize: '1.5rem',
      fontWeight: 500,
      color: 'black',
      position: 'relative',
      zIndex: 100,
    }}>
      <span style={{ fontWeight: 600, fontSize: '1.6rem' }}>KINDLINK</span>
      {showMenu && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {currentLabel} ▼
          </button>
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '160px',
                marginTop: '8px',
                zIndex: 1000,
              }}
            >
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setIsDropdownOpen(false);
                  }}
                  style={{
                    padding: '12px 20px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    borderBottom: index < menuItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
