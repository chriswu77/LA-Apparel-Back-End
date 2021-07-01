const express = require('express');
const path = require('path');

const app = express();

const port = 4000;

app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    console.log('couldn\'t connect to server');
  } else {
    console.log(`server connected at port ${port}`);
  }
});
