import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignIn from './App/Sign-in/page';
import SignUp from './App/Sign-up/page';
import HomePage from './App/Homepage/page';
import MyPostPage from './App/Mypost/page';
import PostPage from './App/Postpage/page';
import EditPostPage from './App/EditPostpage/page';
import DetailPage from './App/Detailpage/page';
import EditProfilePage from './App/Editprofilepage/page';
import AboutPage from './App/Aboutpage/page';
import ContactPage from './App/Contactpage/page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/App/Sign-up" element={<SignUp />} />
          <Route path="/App/HomePage" element={<HomePage />} />
          <Route path="/App/MyPost" element={<MyPostPage />} />
          <Route path="/App/PostPage" element={<PostPage />} />
          <Route path="/App/EditPostPage/:postId" element={<EditPostPage />} />
          <Route path="/App/DetailPage/:postId" element={<DetailPage />} />
          <Route path="/App/EditprofilePage" element={<EditProfilePage />} />
          <Route path="/App/AboutPage" element={<AboutPage />} />
          <Route path="/App/ContactPage" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
