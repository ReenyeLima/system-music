const express = require('express');
const config = require('./config');

const routesMusic = require('../view/music')

const app = express();

app.use(express.json())
app.use(routesMusic);

app.listen(config.port, () => {
  console.log("Server Running");
});