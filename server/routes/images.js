const express = require('express');
const router = express.Router();
const image = require('../models/image');
// const multer = require('multer');
const path = require('path');
const checkAuth = require('../middleware/check-auth')
const extractFile = require('../middleware/file')
const imagesController = require('../controllers/images')


  // ---------------------------------------------------
  //  NOTE: ALL ROUTES BELOW ARE PREFIXED BY ./routes/images
  //  FROM APP.JS
  //  const imagesRoutes = require('./routes/images')
  //  app.use('/api/images', imagesRoutes);
  //  SUB'D var router FOR var app

  // ---------------------------------------------------
  //  POST NEW IMAGE TO DATABASE
  router.post('', checkAuth, extractFile, imagesController.createImage);
  // router.post('', extractFile, imagesController.createImage);

  // ---------------------------------------------------
  //  GET PAGINATED image RECORDS FROM DATABASE
  router.get('', imagesController.getImages);

  // ---------------------------------------------------
  //  GET ALL IMAGE RECORDS FROM DATABASE
  router.get('/all', imagesController.getAllImages);

  // ---------------------------------------------------
  //  GET ALL IMAGES BY CREATOR
  router.get('/creator/:creatorId', imagesController.getImagesByCreatorId);

  // ---------------------------------------------------
  //  GET IMAGES COUNT BY CREATOR
  router.get('/count/:creatorId', imagesController.getImagesCountByCreatorId);


  // ---------------------------------------------------
  //  GET SPECIFIED image RECORD FROM DATABASE
  router.get('/:_id', imagesController.getImage);

  // ---------------------------------------------------
  //  SAVE EDITED RECORD TO DATABASE
  router.put('/:_id', checkAuth, extractFile, imagesController.updateImage);

  // ---------------------------------------------------
  //  DELETE SPECIFIED image RECORD FROM DATABASE
  router.delete('/:_id', checkAuth, imagesController.deleteImage);


  module.exports = router;
