const express = require('express');
const router = express.Router();
const image = require('../models/image');
const User = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersController = require('../controllers/users')

router.post('/signup', UsersController.createUser);
router.post('/login', UsersController.userLogin);


  // ---------------------------------------------------
  //  ADD USER TO DATABASE

  // router.post('/signup');


  // // ---------------------------------------------------
  // //  LOG USER INTO APP

  // router.post('/login')



  // ---------------------------------------------------
  //  MODULE EXPORTS
module.exports = router;
