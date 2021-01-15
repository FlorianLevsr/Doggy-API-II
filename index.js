require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./router')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    preflightContinue: false,
    credentials: true
  }

app.use(cors(corsOptions));

app.options('*', cors());

app.use(router);

const port = process.env.PORT || 3000;


app.listen(port, _ => {
    console.log('Running on ', port, '!');
});



