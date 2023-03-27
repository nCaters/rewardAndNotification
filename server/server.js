require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

const db = require('./db');

// For middle wares
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

// Get food
app.get('/api/v1/food', async (req, res) => {
  try {
    //const results = await db.query("select * from restaurants");
    const test = await db.query('select b.name as cuisine, c.name as meal, a.name, a.cost from food a Inner join cuisine b on b.cuisine_id = a.cuisine_id Inner join meal c on c.meal_id = a.meal_id');

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
