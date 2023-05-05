const fs = require('fs');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        fs.stat(filePath, (err, stat) => {
            if (err) {
                console.error(err);
                return;
            }
            if (stat.isFile()) {
                const name = path.parse(file).name;
                const extension = path.extname(filePath).replace('.', '');
                const size = Math.round(stat.size * 100) / 100;
                console.log(`${name} - ${extension} - ${size} bites`);
            }
        });
    });
});