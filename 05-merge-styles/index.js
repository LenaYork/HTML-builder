const fs = require('fs');
const path = require('path');

const cssFolder = './05-merge-styles/styles';
const outputFolder = './05-merge-styles/project-dist';
const outputFile = 'bundle.css';
const outputFilePath = path.join(outputFolder, outputFile);

// Проверяем, есть ли папка outputFolder
fs.access(outputFolder, (err) => {
  if (err){
    fs.mkdir(outputFolder, (err) => {
      if (err) throw err;
    });
  }
});

// Читаем содержимое папки cssFolder
fs.readdir(cssFolder, (err, files) => {
    if (err) throw err;
    const cssFiles = files.filter(file => path.extname(file) === '.css');
    if (cssFiles.length === 0) {
        console.log('Нет css файлов в папке styles');
    } else {
        let cssContent = '';
        let filesProcessed = 0;
        cssFiles.forEach((file) => {
          fs.readFile(path.join(cssFolder, file), 'utf8', (err, data) => {
            if (err) throw err;
            cssContent += data;
            filesProcessed++;
            if (filesProcessed === cssFiles.length) {
              fs.writeFile(outputFilePath, cssContent, (err) => {
                if (err) throw err;
                console.log('Стили успешно собраны и сохранены в файле bundle.css');
              });
            }
          });
        });
    }
});