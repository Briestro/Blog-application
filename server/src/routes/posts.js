const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect, adminOnly } = require('../auth');

// GET /api/posts — All users: view all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: posts.length, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching posts' });
  }
});

// GET /api/posts/:id — All users: view single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, post });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }
    res.status(500).json({ success: false, message: 'Error fetching post' });
  }
});

// POST /api/posts — Authenticated users: create post
router.post('/', protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }
    if (!title.trim() || !content.trim()) {
      return res.status(400).json({ success: false, message: 'Title and content cannot be blank' });
    }

    const post = await Post.create({ title: title.trim(), content: content.trim(), author: req.user._id });
    await post.populate('author', 'username email');

    res.status(201).json({ success: true, message: 'Post created successfully', post });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Error creating post' });
  }
});

// PUT /api/posts/:id — Author only: update post
router.put('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Only the author can update
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this post' });
    }

    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ success: false, message: 'Provide at least a title or content to update' });
    }
    if (title) post.title = title.trim();
    if (content) post.content = content.trim();

    await post.save();
    await post.populate('author', 'username email');

    res.json({ success: true, message: 'Post updated successfully', post });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }
    res.status(500).json({ success: false, message: 'Error updating post' });
  }
});

// DELETE /api/posts/:id — Author or Admin: delete post
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Author or Admin can delete
    const isAuthor = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid post ID' });
    }
    res.status(500).json({ success: false, message: 'Error deleting post' });
  }
});

module.exports = router;
