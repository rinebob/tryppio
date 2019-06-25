const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

  // ---------------------------------------------------
  //  CREATE USER LOGIC

  exports.createUser = (req, res, next) => {
    console.log('100 routes users.js.  create User.');
    bcrypt.hash(req.body.password, 10)

      .then(hash => {

        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash
        });

        console.log('102 routes users.js.  create User. at user.save(). user = ',user);
        user.save()

          .then(result => {
            res.status(201).json({
              message: 'User Created!',
              result: result
            });
          })

          .catch(err => {
            console.log('104 routes users.js.  create User. at catch err. err = ',err);
            res.status(500).json({
                message: 'users.js user create failed / Invalid authentication credentials'
            });
          });

    })
  }

  // ---------------------------------------------------
  //  LOG USER INTO APP
  exports.userLogin =  (req, res, next) => {
    let fetchedUser;

    // check whether entered email exists in database
    User.findOne({ email: req.body.email })
      .then(user => {
        // if !user send fail msg
        if(!user) {
          return res.status(401).json({
            message: 'users.js controller.  user not found. Auth failed'
          });
        }

        // if user, compare entered password with stored bcrypt hashed pw
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {

        // if compare fails send message
        if (!result) {
          return res.status(401).json({
            message: 'users.js controller.  passwords don\'t match. Auth failed'
          });
        }

        // create new web token to manage session authorization
        const token = jwt.sign(

          { email: fetchedUser.email, userId: fetchedUser._id },

          // this contains the super-secret secret key.  stored in app/nodemon.json
          process.env.JWT_KEY,

          // sets timeout to terminate valid login
          { expiresIn: '1h' }
        );
        res.status(200).json({
          token: token,
          expiresIn: 360000,
          userId: fetchedUser._id,

          username: fetchedUser.username

        })
      })

      // catches any errors that occur above
      .catch(err => {
        return res.status(401).json({
          message: 'Invalid authentication credentials'
        });
      });

  }

  // ---------------------------------------------------
  //  GET IMAGE CREATOR USERNAME - QUERY USERS BY IMAGE CREATOR (= user._id)

  exports.getImageCreatorUsername = (req, res, next) => {

      console.log('110 users.js getImageCreatorUsername. req.params = ', req.params );

      User.findById(req.params._id)

      .then(user => {

        console.log('112 users.js user = ', user );

        if (user) {

          res.status(200).json(user);

        } else {

          res.status(404).json({message: 'users.js User not found!'});

        }
      })
      .catch(err => {
        res.status(500).json({ message: 'users.js Fetching user failed' })
      });
  }
