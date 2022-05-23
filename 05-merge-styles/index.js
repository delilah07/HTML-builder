const fsPromise = require('fs/promises');
const path = require('node:path');

const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist');
const styleFileExtends = '.css';

const mergeStyles = async (src, dist, fileName) => {
  const files = await fsPromise.readdir(src, { withFileTypes: true });
  const styleFiles = files.filter((file) => {
    return file.isFile() || path.extname(file.name) === styleFileExtends;
  });
  const styleArr = await Promise.all(
    styleFiles.map((styleFile) => {
      return fsPromise.readFile(path.join(src, styleFile.name), 'utf-8');
    })
  );
  await fsPromise.writeFile(path.join(dist, fileName), styleArr.join('\n'));
};

mergeStyles(stylesFolder, projectFolder, 'bundle.css');