const fs = require('node:fs');
const path = require('node:path');
const filePath = path.join(__dirname, 'text.txt');

const createFile = fs.createWriteStream(filePath);

const readline = require('node:readline');

const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

rl.write('-----------\nHi, please enter the text.\n-----------\n');


rl.on('line', (input) => {
  if (input.toString().trim() === 'exit') {
    stopProgram();
  } else {
    createFile.write(`${input}\n`);
  }
});
rl.on('close', stopProgram);
rl.on('SIGINT', stopProgram);
    
function stopProgram() {
  rl.close();
  console.log('-----------\nThank you. Buy.\n-----------\n');
  process.exit();
}