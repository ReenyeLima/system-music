const { initializeApp }  = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const config = require('./config');

const firebase = initializeApp(config.firebaseConfig);

const db = getFirestore();

module.exports = db;