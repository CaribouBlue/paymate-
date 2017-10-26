const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const con = require('./mysql-con');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));