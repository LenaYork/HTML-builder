const readline = require('readline');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'user_input.txt');

fs.access(filePath, (err) => {
    if (err) {
        fs.writeFile(filePath, '', 'utf-8', (err) => {
            if (err) throw err;
            // console.log('File user_input.txt has been created');
        });
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function writeToFile(input) {
    // Флаг 'a' - добавление данных в конец файла
    const stream = fs.createWriteStream(filePath, { flags: 'a' }); 
    stream.write(`${input}\n`);
    stream.end();
}

function handleInput(input) {
    // Если ввели "exit", завершаем программу
    if (input.toLowerCase().trim() === 'exit') { 
        rl.close();
    // Иначе записываем введенный текст в файл и ждем следующего ввода
    } else { 
        writeToFile(input);
        console.log('Text has been added to file');
        rl.question('Enter text to add to file (type "exit" to quit): ', handleInput);
    }
}

console.log('Welcome! Please enter some text (type "exit" to quit): ');
rl.question('Enter text to add to file: ', handleInput);

process.on('exit', () => {
    console.log('\nGoodbye');
    rl.close();
});