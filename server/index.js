const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./router');

const app = express();

const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

app.listen(port, (err) => {
  if (err) {
    console.log('couldn\'t connect to server');
  } else {
    console.log(`server connected at port ${port}`);
  }
});
