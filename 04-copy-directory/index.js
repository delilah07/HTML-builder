const fsPromise = require('fs/promises');
const path = require('node:path');

const copyDir = async (folder) => {
  const firstDir = path.join(__dirname, folder);
  const destDir = path.join(__dirname, `${folder}-copy`);

  await fsPromise.rm(destDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  await fsPromise.mkdir(destDir);

  const files = await fsPromise.readdir(firstDir, { withFileTypes: true });
  files.forEach((file) => {
    src = path.join(firstDir, file.name);
    dest = path.join(destDir, file.name);
    if (file.isDirectory()) {
      copyDir(src, dest);
    } else {
      fsPromise.copyFile(src, dest);
    }
  });

  console.log('Файлы скопированы');
};
copyDir('files');



