const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());

const newsRoute = require('./routes/newsRoute')
//const userRoute = require('./routes/userRoute')
 
app.use('/api/news', newsRoute);
//app.use('/api/user', userRoute);

mongoose
  .connect('mongodb://db:27017/desafio-editora-globo', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('MongoDB Connected');
  })
  .catch(error => {
    console.log(error);
  });

app.listen(9000, () => console.log('Server active on port 9000'));