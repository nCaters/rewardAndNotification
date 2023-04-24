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

const port = 3003;

// Functions
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: '30s',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN);
};

app.get('/api/v1/notification', async (req, res) => {
  try {
    const result = await db.query('select * from notification where current_date = date');

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        message: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/api/v1/get_Upcoming_Notifications', async (req, res) => {
  try {
    const result = await db.query('select * from notification where current_date <= date');

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        notifications: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post('/api/v1/add_Notification', async (req, res) => {
  try {
    const { message, date } = req.body;

    const result = await db.query(
      `INSERT INTO notification (notification_id,message, date) VALUES(DEFAULT,$1, $2)`, [message, date]
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

app.post('/api/v1/delete_Notification', async (req, res) => {
  try {
    const { id } = req.body;

    const result = await db.query(
      `DELETE FROM notification WHERE notification_id = $1`, [id]
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

app.post('/api/v1/search_Notification', async (req, res) => {
  try {
    const { date } = req.body;

    const result = await db.query(
      `SELECT * FROM notification WHERE date = $1`, [date]
    );

    res.status(200).json({
      status: 'success',
      results: result.rows.length,
      data: {
        notifications: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`server is up and listening on  port ${port}`);
});
