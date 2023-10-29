const express = require('express');
const bodyParser = require('body-parser');
var cors=require('cors')

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();
app.use(cors());

const User = require('./models/User');

const userRoutes= require('./routes/user');
const tableRoutes=require('./routes/expense')

app.use(bodyParser.json());

app.use('/User',userRoutes);

app.use('/Expense',tableRoutes)


app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
