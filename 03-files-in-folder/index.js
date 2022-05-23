
const fsPromises = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');

const testFolder = path.join(__dirname, 'secret-folder');

(async function() {
  try {
    const files = await fsPromises.readdir(testFolder, {withFileTypes: true});
    for (const file of files) {
      if (file.isFile()) {
        
        fs.stat(path.join(testFolder, file.name), (err, stats) => {
          console.log(`${path.parse(file.name).name} - ${path
            .extname(file.name)
            .slice(1)} - ${stats.size / 1000}kb`);
        });
      } 
      if (file.isDirectory()){
        const testFolder = path.join(__dirname, `secret-folder/${file.name}`);
        const files = await fsPromises.readdir(testFolder, {withFileTypes: true});
        for (const file of files) {
          if (file.isFile()) {     
            fs.stat(path.join(testFolder, file.name), (err, stats) => {
              console.log(`${path.parse(file.name).name} - ${path
                .extname(file.name)
                .slice(1)} - ${stats.size / 1000}kb`);
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('there was an error:', error.message);
  }
})();

