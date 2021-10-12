const config = require('../server/config');

const jwt = require('jsonwebtoken');

const exceptions = ["/auth"];

const middleware = (req, res, next) => {
  let pass = true;
  exceptions.forEach(item => {
    if(req.originalUrl.toString() === item) pass = false;
  })

  if(pass) {
    const token = req.headers['authorization'];

    jwt.verify(token, config.secret, (err, decoded) => {
      if(err) return res.status(401).end();
  
      req.userId = decoded.userId;
      next();
    });
  }else {
    next();
  }  
}

const generateToken = (id) => {
  return jwt.sign({userId: id}, config.secret, { expiresIn : 500 });
}

module.exports = {
  middleware,
  generateToken,
}