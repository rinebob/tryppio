const Image = require('../models/image');
const multer = require('multer');
const path = require('path');
const checkAuth = require('../middleware/check-auth');

  // ---------------------------------------------------
  //  image NEW BLOG image TO DATABASE
  exports.createImage = (req, res, next) => {

      // console.log('400 images.js createImage start. req.body = ', req.body );
      // console.log('401 images.js start. req.file = ', req.file );
      // console.log('402 images.js start. req.userData = ', req.userData );

      const url = req.protocol + '://' + req.get('host');

      const image = new Image ({

        title: req.body.title,
        description: req.body.description,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.body.creator,
        creatorId: req.body.creatorId,
        // creator: req.userData.userId,
        // address1: req.body.address1,
        // address2: req.body.address2,
        // city: req.body.city,
        // state: req.body.state,
        // postcode: req.body.postcode,
        // country: req.body.country,
        lat: req.body.lat,
        lng: req.body.lng

      });

    image.save()

      .then(createdImage => {

        // console.log('404 images.js image.save().  createdImage = ', createdImage );
        res.status(201).json({

          message: 'images.js image added successfully',
          image: {
            ...createdImage,
            id: createdImage._id
          }
        });
    })
      .catch(error => {
        // console.log('406 images.js error = ',error)
        res.status(500).json({
          message: 'images.js image creation failed'
        })
      })
  }


  // ---------------------------------------------------
  //  GET PAGINATED IMAGE RECORDS FROM DATABASE
  exports.getImages = (req, res, next) => {

    // console.log('420 images.js getAllImages. req.body = ', req.body );

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const imageQuery = Image.find();
    let fetchedImages;

    if(pageSize && currentPage) {
      imageQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }

    imageQuery

      .then(documents => {
        // console.log('424 images.js getAllImages. documents = ', documents );
        fetchedImages = documents;
        return Image.count();
      })
      .then(count => {
        res.status(200).json({
          message: 'getAllImages Images fetched successfully!',
          images: fetchedImages,
          maxImages: count
        });

      })
      .catch(err => {
        // console.log('428 images.js getAllImages. err = ', err );
        res.status(500).json({
          message: 'getAllImages Fetching images failed'
        })
      });
  }


  // ---------------------------------------------------
  //  GET ALL IMAGE RECORDS FROM DATABASE - no pagination
  exports.getAllImages = (req, res, next) => {

    // console.log('430 images.js getAllImages. req.body = ', req.body );
    let fetchedImages;

    Image.find()
      .then(documents => {
        // console.log('434 images.js getAllImages. documents = ', documents );
        fetchedImages = documents;
        res.status(200).json({
          message: 'getAllImages Images fetched successfully!',
          images: fetchedImages
        });

      })
      .catch(err => {
        // console.log('430 images.js getAllImages. err = ', err );
        res.status(500).json({
          message: 'getAllImages Fetching images failed'
        })
      });
  }




  // ---------------------------------------------------
  //  GET ALL IMAGES BY CREATOR
  exports.getImagesByCreatorId = (req, res, next) => {

    // console.log('440 images.js getImagesByCreatorId.  req.params = ', req.params );

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    var numImages = 0;

    Image.find({creatorId: req.params.creatorId}, function(err, images) {
      // console.log('440.5 images.js images.length = ',images.length)
      this.numImages = images.length;
    })

    const imageQuery = Image.find({creatorId: req.params.creatorId});

    // console.log('441 images.js getImagesByCreator. imageQuery = ', imageQuery );

    let fetchedImages;

    if(pageSize && currentPage) {
      imageQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }

    imageQuery

      .then(documents => {
        fetchedImages = documents;
        // console.log('442 images.js getImagesByCreator. documents.length = ', documents.length );
        // console.log('443 images.js getImagesByCreator. documents = ', documents );
        return documents.length;

      })
      .then(count => {
        res.status(200).json({
          message: 'Images by creator fetched successfully!',
          images: fetchedImages,
          maxImages: this.numImages,
          // maxImages: count
        });

      })
      .catch(err => {
        // console.log('446 images.js getImagesByCreator. err = ', err );
        res.status(500).json({
          message: 'Fetching images by creator failed'
        })
      });
  }

  // ---------------------------------------------------
  //  GET COUNT OF IMAGES BY CREATOR
  exports.getImagesCountByCreatorId = (req, res, next) => {

    // console.log('450 images.js getImagesCountByCreatorId.  req.params = ', req.params );

    var numImages = 0;

    Image.find({creatorId: req.params.creatorId}, function(err, images) {
      // console.log('451 images.js images.length = ',images.length)
      this.numImages = images.length;
    })

    const imageQuery = Image.find({creatorId: req.params.creatorId});

    // console.log('441 images.js getImagesByCreator. imageQuery = ', imageQuery );

    let fetchedImages;

    imageQuery

      .then(documents => {
        fetchedImages = documents;
        // console.log('452 images.js getImagesByCreator. documents.length = ', documents.length );
        return documents.length;

      })
      .then(count => {
        res.status(200).json({
          message: 'images.js Images count by creator obtained successfully!',
          numImages: count,

        });

      })
      .catch(err => {
        // console.log('446 images.js getImagesByCreator. err = ', err );
        res.status(500).json({
          message: 'images.js Obtain images count by creator failed'
        })
      });
  }

  // ---------------------------------------------------
  //  GET SPECIFIED image RECORD FROM DATABASE
  exports.getImage = (req, res, next) => {

      // console.log('440 images.js getImage. req.params = ', req.params );

      Image.findById(req.params._id)

      .then(image => {

        // console.log('442 images.js image = ', image );

        if (image) {

          res.status(200).json(image);

        } else {

          res.status(404).json({message: 'Image not found!'});

        }
      })
      .catch(err => {
        res.status(500).json({ message: 'Fetching image failed' })
      });
  }


  // ---------------------------------------------------
  //  SAVE EDITED image RECORD TO DATABASE
  exports.updateImage = (req, res, next) => {

      // console.log('450 images.js updateImage req.body = ', req.body );
      // console.log('451 images.js updateImage req.userData = ', req.userData );


      let imagePath = req.body.imagePath;

      if (req.file) {

        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename
      }

      const image = new Image({
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        imagePath: imagePath,
        creator: req.body.creator,
        creatorId: req.body.creatorId,
        // creator: req.userData.userId,
        // address1: req.body.address1,
        // address2: req.body.address2,
        // city: req.body.city,
        // state: req.body.state,
        // postcode: req.body.postcode,
        // country: req.body.country,
        lat: req.body.lat,
        lng: req.body.lng
      });

      // console.log('454 images.js updateImage image = ', image);



    Image.updateOne({ _id: req.body._id }, image)

      .then(result => {
      // console.log('455 images.js  result = ', result);

        if (result.n > 0) {
         res.status(200).json({message: 'images.js updateOne. Update successful!'})
        } else {
          res.status(401).json({message: 'images.js updateOne.  update not authorized!'})
        }
      })
      .catch(error => {
        res.status(500).json({ message: "images.js updateOne.  Couldn't update image" })
      });
  }


  // ---------------------------------------------------
  //  DELETE SPECIFIED image RECORD FROM DATABASE
  exports.deleteImage = (req, res, next) => {

      Image.deleteOne({_id: req.params._id, creatorId: req.userData.userId })

        .then(result => {
          if (result.n > 0) {
            res.status(200).json({message: 'Delete successful!'});
          } else {
            res.status(401).json({message: 'Delete not authorized!'});
        }
      })
      .catch( error => {
        res.status(500).json({message: 'Delete image failed'})
      })
  };
