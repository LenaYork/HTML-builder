const fsPromises = require('fs/promises');
const path = require('path');
const fs = require('fs');

async function copyDir() {
    try {
        // создаем папку files-copy
        await fsPromises.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

        //удаляем предыдущие файлы, если они есть
        const folderPath = path.join(__dirname, 'files-copy');
        fs.readdir(folderPath, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.unlink(filePath, err => {
                if (err) throw err;
            });
        });
        });
    
        // получаем список файлов в папке files
        const files = await fsPromises.readdir(path.join(__dirname, 'files'));

        // копируем файлы
        for (const file of files) {
            const source = path.join(__dirname, 'files', file);
            const destination = path.join(__dirname, 'files-copy', file);
            await fsPromises.copyFile(source, destination);
        }

        console.log('Файлы успешно скопированы!');
    }   catch (error) {
        console.error(error);
    }
}

copyDir();