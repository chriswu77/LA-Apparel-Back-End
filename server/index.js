const app = require('./app');

const port = 4000;

app.listen(port, (err) => {
  if (err) {
    console.log('couldn\'t connect to server');
  } else {
    console.log(`server connected at port ${port}`);
  }
});
