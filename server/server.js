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

app.listen(port, () => {
  console.log(`server is up and listening on  port ${port}`);
});
