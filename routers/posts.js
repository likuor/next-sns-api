const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Post a tweet
router.post('/post', async (req, res) => {
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
        authorId: 1,
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
