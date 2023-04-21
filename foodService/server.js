require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const jwt = require('jsonwebtoken');

const ROLE = require('./common/enums/roles');
const authorize = require("./middleware/authorize");

const db = require('./db');

// For middlewares
app.use(morgan('dev'));

// app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT;

// Functions
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: '30s',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN);
};

const cors = require('cors');
app.use(cors({
  origin: '*'
}));

// Get food
app.get('/api/v1/food', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'select b.name as cuisine, c.name as meal, a.name, a.cost from food a Inner join cuisine b on b.cuisine_id = a.cuisine_id Inner join meal c on c.meal_id = a.meal_id'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        food: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get meal
app.get('/api/v1/meal', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'select meal_id, "name" from meal'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

// Make food preference
app.post('/api/v1/preference', async (req, res) => {
  try {
    var user_id = req.body.user_id;
    var meal_id = req.body.meal_id;
    var food_id = req.body.food_id;

    const result = await db.query(
      `INSERT INTO Preference (user_id, meal_id, date, food_id) VALUES($1, $2,CURRENT_DATE, $3)`, [user_id, meal_id, food_id]
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        test: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// add food
app.post('/api/v1/food-entry', async (req, res) => {
  try {
    var cuisine_id = req.body.cuisine_id;
    var meal_id = req.body.meal_id;
    var name = req.body.name;
    var cost = req.body.cost;

    const result = await db.query(
      `INSERT INTO food (cuisine_id, meal_id, name, cost, date_added) VALUES($1, $2, $3, $4, CURRENT_DATE)`, [cuisine_id, meal_id, name, cost]
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Test authorization to get food
app.get('/api/v1/foodAuth', authorize, async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const result = await db.query(
      'select b.name as cuisine, c.name as meal, a.name, a.cost from food a Inner join cuisine b on b.cuisine_id = a.cuisine_id Inner join meal c on c.meal_id = a.meal_id'
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        food: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is up and listening on  port ${port}`);
});
