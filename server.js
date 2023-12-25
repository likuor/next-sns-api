const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const PORT = 5005;
const prisma = new PrismaClient();
app.use(express.json());

// Register new user
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.json({ user });
});

app.listen(PORT, () => console.log(`Server is runnnig on Port ${PORT}`));
