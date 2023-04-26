require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const jwt = require('jsonwebtoken');

const ROLE = require('./common/enums/roles');

const db = require('./db');

// For middlewares
app.use(morgan('dev'));

// app.use(cors());
app.use(express.json());

const port = 3002;

// Functions
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: '30s',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN);
};

// Testing
app.get('/api/v1/test', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const test = await db.query('select * from cuisine');

    res.status(200).json({
      status: 'success',
      results: test.rows.length,
      data: {
        restaurants: test.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get reward
app.get('/api/v1/reward', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'select * from reward'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        reward: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is up and listening on  port ${port}`);
});
