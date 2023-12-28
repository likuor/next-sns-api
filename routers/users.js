const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const isAuthenticated = require('../middlewares/isAuthenticated');

const prisma = new PrismaClient();

// Show tweets
router.get('/find', isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      res.status(404).json({
        error: 'Can not find the user',
      });
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: parseInt(userId),
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!profile) {
      res.status(404).json({
        error: 'Can not find the profile',
      });
    }

    return res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
