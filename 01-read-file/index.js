const fs = require('node:fs');
const path = require('node:path');
const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(filePath);

stream.on('data', (chunk) => {
  console.log(`${chunk}`);
});

stream.on('error', (err) => console.log(`Err: ${err}`));