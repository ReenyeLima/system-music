const express = require('express');
const cors = require('cors');

const config = require('./config');

const routesMusic = require('../view/music');
const routesUser = require('../view/user');
const auth = require('../controller/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(auth.middleware);
app.use(routesMusic);
app.use(routesUser);

app.listen(config.port, () => {
  console.log("Server Running");
});