import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'available' })
      .populate('userId', 'firstName lastName username')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลโพสต์' });
  }
});

// Get single post by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', 'firstName lastName username email phone');
    
    if (!post) {
      return res.status(404).json({ message: 'ไม่พบโพสต์' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลโพสต์' });
  }
});

// Get my posts (authenticated)
router.get('/user/my-posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Get my posts error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูลโพสต์' });
  }
});

// Create new post (authenticated)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, images, contact } = req.body;
    
    const post = new Post({
      title,
      description,
      images,
      contact,
      userId: req.userId
    });
    
    await post.save();
    
    res.status(201).json({
      message: 'สร้างโพสต์สำเร็จ',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างโพสต์' });
  }
});

// Update post (authenticated, owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, images, contact, status } = req.body;
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'ไม่พบโพสต์' });
    }
    
    // Check if user owns this post
    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'คุณไม่มีสิทธิ์แก้ไขโพสต์นี้' });
    }
    
    // Update fields
    if (title) post.title = title;
    if (description) post.description = description;
    if (images) post.images = images;
    if (contact) post.contact = contact;
    if (status) post.status = status;
    
    await post.save();
    
    res.json({
      message: 'อัปเดตโพสต์สำเร็จ',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตโพสต์' });
  }
});

// Delete post (authenticated, owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'ไม่พบโพสต์' });
    }
    
    // Check if user owns this post
    if (post.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'คุณไม่มีสิทธิ์ลบโพสต์นี้' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'ลบโพสต์สำเร็จ' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบโพสต์' });
  }
});

export default router;
