const express = require('express');
const imagesRoutes = require('./routes/images')
const userRoutes = require('./routes/user')

const mongoose = require("mongoose");
const app = express();
const path = require('path');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('server/images')));

// mongoose.connect("mongodb+srv://rinebob:" + process.env.MONGO_ATLAS_PW + "@cluster0-nhgat.mongodb.net/node-angular?retryWrites=true")
mongoose.connect("mongodb+srv://rinebob:" + process.env.MONGO_ATLAS_PW + "@cluster0-nhgat.mongodb.net/node-images?retryWrites=true")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use('/api/images', imagesRoutes);
app.use('/api/user', userRoutes);

module.exports = app;

