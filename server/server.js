require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const jwt = require('jsonwebtoken');

const db = require('./db');

// For middlewares
app.use(morgan('dev'));

// app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT || 3002;

// testing
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

app.post('/api/v1/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.query(
    `select * from "user" where username = $1 and password = $2`,
    [username, password]
  );

  if (user) {
    const data = user.rows[0];
    // Generate an access token
    const accessToken = jwt.sign(data, process.env.SECRET_ACCESS_TOKEN);
    // res.json({
    //   status: 'success',
    //   results: user.rows.length,
    //   data: {
    //     user: user.rows,
    //   },
    // });
    res.json({
      accessToken,
    });
  } else {
    res.status(400).json('Username or Password is incorrect!');
  }

  console.log(user);
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid!');
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated!');
  }
};

// Get food
app.get('/api/v1/food', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const test = await db.query(
      'select b.name as cuisine, c.name as meal, a.name, a.cost from food a Inner join cuisine b on b.cuisine_id = a.cuisine_id Inner join meal c on c.meal_id = a.meal_id'
    );

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

app.listen(port, () => {
  console.log(`server is up and listening on  port ${port}`);
});
