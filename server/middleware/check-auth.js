const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {

    // splits token from 'bearer' prefix on whitespace
    const token = req.headers.authorization.split(' ')[1];
    console.log('500 check-auth.js. token = ', token );

    //
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log('501 check-auth.js. decoded token = ', decodedToken );
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};

    console.log('Check-auth.  token = ', token,' decodedToken = ', decodedToken,' req.userData = ',req.userData)

    next();

    // catch means no token exists
  } catch (error) {
    console.log('502 check-auth.js. error = ', error );

    res.status(401).json({ message:'Check-auth.js: token authentication failed!'});
  }

}

