'use strict';

const dotenv = require('dotenv').config();
const assert = require('assert');

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORATE_BUCKET,
  MESSAGIN_SENDER_ID,
  APP_ID
} = process.env;

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORATE_BUCKET,
    messagingSenderId: MESSAGIN_SENDER_ID,
    appId: APP_ID
  }
}