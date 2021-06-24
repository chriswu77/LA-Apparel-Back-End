const fs = require('fs');
const path = require('path');
const readline = require('readline');

let readStream = fs.createReadStream(path.join(__dirname, '../data/photos.csv'));
let writeStream = fs.createWriteStream(path.join(__dirname, '../data/photosv2.csv'));

const rl = readline.createInterface({
  input: readStream
});

rl.on('line', (line) => {
  if (line[line.length - 1] !== '"') {
    line = line.concat('"');
  }

  writeStream.write(line + '\n')
});

rl.on('close', () => {
  writeStream.close();
  console.log('done');
});
