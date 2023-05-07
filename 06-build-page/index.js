const fs = require('fs');
const path = require('path');

// Функция для асинхронного чтения файла
function readFileAsync(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) throw err;
        callback(data);
    });
}

// Функция для асинхронной записи файла
function writeFileAsync(filePath, content, callback) {
    fs.writeFile(filePath, content, (err) => {
        if (err) throw err;
        callback();
    });
}

// Читаем содержимое шаблона
const templatePath = path.join(__dirname, 'template.html');
readFileAsync(templatePath, (templateContent) => {

    // Получаем список файлов в папке components
    const componentsPath = path.join(__dirname, 'components');
    fs.readdir(componentsPath, (err, componentsFiles) => {
        if (err) throw err;

        // Обходим каждый файл в папке components и заменяем соответствующие теги в шаблоне на содержимое компонента
        let resultContent = templateContent;

        componentsFiles.forEach((fileName) => {
        const componentName = path.parse(fileName).name;
        const componentPath = path.join(componentsPath, fileName);
        readFileAsync(componentPath, (componentContent) => {
            const tagToReplace = new RegExp(`{{${componentName}}}`, 'g');
            resultContent = resultContent.replace(tagToReplace, componentContent);

            // Если это последний компонент, то сохраняем результат в project-dist/index.html
            if (fileName === componentsFiles[componentsFiles.length - 1]) {
                const distPath = path.join(__dirname, 'project-dist');
                const indexFilePath = path.join(distPath, 'index.html');
                fs.mkdir(distPath, { recursive: true }, () => {
                    writeFileAsync(indexFilePath, resultContent, () => {
                        console.log('Шаблон успешно обработан и сохранен в project-dist/index.html');
                    });
                });
                }
            });
        });
    });

    // Читаем содержимое папки styles и объединяем все файлы в один файл project-dist/style.css
    const stylesPath = path.join(__dirname, 'styles');
    fs.readdir(stylesPath, (err, stylesFiles) => {
        if (err) throw err;

        let stylesContent = '';

        stylesFiles.forEach((fileName) => {
            const stylePath = path.join(stylesPath, fileName);
            readFileAsync(stylePath, (styleContent) => {
                stylesContent += styleContent;

            // Если это последний файл со стилями, то сохраняем их в project-dist/style.css
            if (fileName === stylesFiles[stylesFiles.length - 1]) {
                const distPath = path.join(__dirname, 'project-dist');
                const styleFilePath = path.join(distPath, 'style.css');
                writeFileAsync(styleFilePath, stylesContent, () => {
                        console.log('Стили успешно сохранены в project-dist/style.css');
                    });
                }
            });
        });
    });

    // Копируем папку assets в project-dist/assets
    const assetsPath = path.join(__dirname, 'assets');
    const distAssetsPath = path.join(__dirname, 'project-dist', 'assets');
    fs.mkdir(distAssetsPath, { recursive: true }, () => {
        fs.readdir(assetsPath, (err, assetsFiles) => {
        if (err) throw err;

        assetsFiles.forEach((fileName) => {
            const assetPath = path.join(assetsPath, fileName);
            const distAssetPath = path.join(distAssetsPath, fileName);
            fs.copyFile(assetPath, distAssetPath, (err) => {
            //   if (err) throw err;
                console.log(`Файл ${fileName} успешно скопирован в project-dist/assets`);
                });
            });
        });
    });

});