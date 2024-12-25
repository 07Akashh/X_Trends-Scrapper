const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const trendsController = require('./controllers/trendsController');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use('/', express.static('public'));

app.post('/run-script', trendsController.runScript);
app.get('/latest', trendsController.getLatest);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
