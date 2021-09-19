const express = require('express');
const cors = require('cors');

const config = require('./config');

const routesMusic = require('../view/music');

const app = express();

app.use(cors());
app.use(express.json())
app.use(routesMusic);

app.listen(config.port, () => {
  console.log("Server Running");
});