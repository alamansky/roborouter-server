/** @format */

require('dotenv').config();
const express = require('express');
const config = require('./config');
const path = require('path');

// require routes
const root = require(path.join(__dirname, './routes/get/root'));
const upload = require(path.join(__dirname, './routes/post/upload'));
const tech = require(path.join(__dirname, './routes/get/tech'));

// set up express and init db class
const app = express();
const db = require('./database');

// middleware
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.use(express.json());

// routes
app.get('/', root);
app.post('/upload', upload);
app.get('/:tech', tech);

// init app
app.listen(config.args.PORT, () => console.log(`server running on ${config.args.PORT}`));

/* (async () => await populateTestData(PORT))();
 */
