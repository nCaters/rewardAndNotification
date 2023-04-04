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

const generateAccessToken = (user) => {
  return jwt.sign(user.rows[0], process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: '20s',
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user.rows[0], process.env.SECRET_REFRESH_TOKEN);
};

app.post('/api/v1/refreshToken', async (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json('You are not authenticated!');

  // Check Database for refresh token validity
  const refreshTokenFromDb = await db.query(
    `select * from token where value = $1`,
    [refreshToken]
  );

  // if (refreshTokenFromDb) {
  //   console.log('refreshTokenFromDb: ', refreshTokenFromDb);
  // } else {
  //   return res.status(403).json('Refresh token is not valid!');
  // }

  if (!refreshTokenFromDb) {
    return res.status(403).json('Refresh token is not valid!');
  }

  jwt.verify(
    refreshToken,
    process.env.SECRET_REFRESH_TOKEN,
    async (err, user) => {
      err && console.log(err);
      console.log('jwt.verify user', user);
      // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const client = await db.getClient();
      try {
        await client.query('BEGIN');
        const deleteRefreshTokenText = 'DELETE FROM token WHERE value = ($1)';
        const deleteRefreshTokenValues = [refreshToken];
        await client.query(deleteRefreshTokenText, deleteRefreshTokenValues);
        await client.query('COMMIT');
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      try {
        await client.query('BEGIN');
        const insertTokenText = 'INSERT INTO token(value) VALUES ($1)';
        const insertTokenValues = [newRefreshToken];
        await client.query(insertTokenText, insertTokenValues);
        await client.query('COMMIT');
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    }
  );

  //if everything is ok, create new access token, refresh token and send to user
});

app.post('/api/v1/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await db.query(
    `select * from "user" where username = $1 and password = $2`,
    [username, password]
  );

  if (user) {
    // Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const client = await db.getClient();
    try {
      await client.query('BEGIN');
      const insertTokenText = 'INSERT INTO token(value) VALUES ($1)';
      const insertTokenValues = [refreshToken];
      await client.query(insertTokenText, insertTokenValues);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }

    res.json({
      data: user.rows[0],
      accessToken,
      refreshToken,
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

app.delete('/api/v1/users/:userId', verify, (req, res) => {
  const paramId = req.params.userId;
  const { user_id, role_id } = req.user;

  if (user_id === paramId || role_id === ROLE.ADMIN) {
    res.status(200).json('User has been deleted');
  } else {
    res.status(403).json('You are not allowed to delete user');
  }

  console.log('user_id: ', user_id);
  console.log('paramId: ', paramId);
});

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
