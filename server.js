const express = require('express');
const app = express();
const authRoute = require('./routers/auth');
const postsRoute = require('./routers/posts');
const usersRoute = require('./routers/users');
const cors = require('cors');

require('dotenv').config;

const PORT = process.env.PORT || 10000;
// const PORT = 5005;

app.use(cors());
app.use(express.json());

// auth
app.use('/api/auth', authRoute);

// posts
app.use('/api/posts', postsRoute);

// user
app.use('/api/users', usersRoute);

app.listen(PORT, () => console.log(`Server is runnnig on Port ${PORT}`));
