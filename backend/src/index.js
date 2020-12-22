const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

require("dotenv-safe").config();

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.REACTJS_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());

const newsRoute = require('./routes/newsRoute')
const userRoute = require('./routes/userRoute')
 
app.use('/api/news', newsRoute);
app.use('/api/user', userRoute);

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




/**  MOCK PARA TER UM USUARIO ADMIN QUE TENHA PERMISSAO DE INICIAR AS REQUISIÇÕES COM ACCESS TOKEN */
const userDB  = require('./services/user/models/userModel');

const newUser = new userDB({
  name: 'Admin',
  login: 'admin',
  password: '1234'
});
newUser.save()
  .catch(error => {
    console.log("Usuário Admin não cadastrado. : "+error)
  });
  
/**  MOCK PARA TER UM USUARIO ADMIN QUE TENHA PERMISSAO DE INICIAR AS REQUISIÇÕES COM ACCESS TOKEN */