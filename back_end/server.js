require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.BACK_END_PORT || 3000;
const { db } = require('./db_config/config');

const logger = require('morgan');
app.use(logger('dev'));

app.get('/', async (req, res) => {
  //res.setHeader('content-type', 'text/plain');
 try {
    const userDoc = await db.collection('users').doc(process.env.TEST_USER_ID).get();
    if (userDoc.exists) {
      res.status(200).json(userDoc.data());
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`)
});