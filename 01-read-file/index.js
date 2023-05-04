const path = require('path');
const fs = require('fs');
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'));
readStream.on('data', (data) => {
    console.log(data.toString());
});

// readStream.on('end', () => {
//     console.log('File reading completed');
// });