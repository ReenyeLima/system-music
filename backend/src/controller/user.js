'use strict';

const db = require('../server/database');
const { collection, doc, addDoc, getDocs, getDoc, query, where } = require('firebase/firestore');

const auth = require('../controller/auth');

const User = require('../model/user');

const collectionName = "users";

const create = async (req, res, next) => {
  try {
    const data = req.body;

    console.log(data);

    let resp = await addDoc(collection(db, collectionName), data);

    const token = auth.generateToken(resp.id);

    res.send({id:resp.id, token: token});
  }catch(err) {
    res.status(400).send(err.message);
  }
};

const listAll = async (req, res, next) => {
  try {
    let ret = [];
    const users = await getDocs(collection(db, collectionName));
    
    users.forEach(doc => {
      let user = doc.data();
      user["id"] = doc.id;
      delete user['password'];
      ret.push(user);
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

    let user = docRet.data();
    delete user['password'];

    res.send(user);
  }catch(err) {
    res.status(400).send(err.message);
  }
}

const login = async (req, res, next) => {
  try {
    const docRef = collection(db, collectionName);

    const q = query(docRef, where("email", "==", req.body.email), where("password", "==", req.body.password));
   
    const docRet = await getDocs(q);

    docRet.forEach(item => {
      const token = auth.generateToken(item.id);
      
      res.send({auth:true, token, userId: item.id}).end();
    })

    res.status(401).end();
  }catch(err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  create,
  listAll,
  list,
  login
}