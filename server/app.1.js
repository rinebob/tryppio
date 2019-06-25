// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// // not used in max's app but here for availablity
// app.use(bodyParser.urlencoded({ extended: false}));

// // ------------------------------
// // Mongo db
// const Image = require('./models/image');
// // Mongoose / mongodb database connection (uses mongo atlas cloud db, not local mongo)
// const mongoose = require('mongoose');
// // mongoose.connect("mongodb+srv://rinebob:" + process.env.MONGO_ATLAS_PW + "@cluster0-nhgat.mongodb.net/node-angular?retryWrites=true")

// mongoose.connect("mongodb+srv://rinebob:1!Mongopw@cluster0-nhgat.mongodb.net/node-images?retryWrites=true")
//   .then(() => {
//     console.log('Connected to database!');
//   })
//   .catch(() => {
//     console.log('Connection failed');
//   });

// //-----------------------------------
// // set CORS access permissions
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

// //-----------------------------------
// // Route: save one image to db
// app.post('/api/images', (req, res, next) => {
//   const image = new Image({
//     title: req.body.title,
//     description: req.body.description
//   });
//   console.log('image = ', image);
//   image.save().then(result => {
//     console.log('result = ',result);
//     res.status(201).json({
//       message: 'Image added to db',
//       imageId: result._id
//     });
//   });
// })

// //-----------------------------------
// // Route: get all images from db
// app.get('/api/images', (req, res, next) => {
//   Image.find()
//   .then(documents => {
//     // console.log('documents = ',documents);
//     res.status(200).json({
//       message: 'Got posts dude',
//       images: documents
//     });
//   })
// });

// //-----------------------------------
// // Route: delete image from db
// app.delete('/api/images/:_id', (req, res, next) => {
//   console.log(' req.params = ',req.params)
//   Image.deleteOne({_id: req.params._id})
//     .then(result => {
//       console.log('result = ',result);
//       res.status(200).json({message: 'Image deleted'});
//     })

// });


// module.exports = app;
