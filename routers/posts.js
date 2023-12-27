const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const isAuthenticated = require('../middlewares/isAuthenticated');

const prisma = new PrismaClient();

// Post a tweet
router.post('/post', isAuthenticated, async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({
      message: 'The content is empty',
    });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        authorId: req.userId,
      },
      include: {
        author: true,
      },
    });
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }

  return res.json({ user });
});

// Show tweets
router.get('/get_latest_post', async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        author: true,
      },
    });
    return res.status(200).json(latestPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }

  return res.json({ user });
});

module.exports = router;
