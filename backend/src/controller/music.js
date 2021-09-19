'use strict';

const db = require('../server/database');
const { collection, doc, addDoc, getDocs, getDoc } = require('firebase/firestore');

const Music = require('../model/music');

const collectionName = "musics";

const create = async (req, res, next) => {
  try {
    const data = req.body;

    await addDoc(collection(db, collectionName), data)

    res.send('Record saved successfuly');
  }catch(err) {
    res.status(400).send(err.message);
  }
};

const listAll = async (req, res, next) => {
  try {
    let ret = [];
    const musics = await getDocs(collection(db, collectionName));
    
    musics.forEach(doc => {
      ret.push(doc.data());
    })

    res.send(ret);    
  }catch(err) {
    res.status(400).send(err.message);
  }
}

const list = async (req, res, next) => {
  try {
    const docRef = doc(db, collectionName, req.params.id);
    const docRet = await getDoc(docRef);
  
    res.send(docRet.data());
  }catch(err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  create,
  listAll,
  list
}