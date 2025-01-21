require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.BACK_END_PORT || 3000;
const { db } = require('./db_config/config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const router = require('./routes');




app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());


app.use('/api',router);


app.get('/', async (req, res) => {
  res.status(200).json(userDoc.data());
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`)
});