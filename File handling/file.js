const fileSystem = require('fs');


// write data to a file
//using synchronous method
//Writing file in current folder file handling

const result = fileSystem.writeFileSync('./File handling/example.txt', 'This is an example of writing to a file using Node.js');
console.log('File written successfully using writeFileSync',result);

//using asynchronous method
fileSystem.writeFile('./File handling/example_async.txt', 'This is an example of writing to a file asynchronously using Node.js', (err) => {
    if (err) throw err;
    console.log('File written successfully using writeFile');
});

// read data from a file
//using synchronous method
const dataSync = fileSystem.readFileSync('./File handling/example.txt', 'utf8');
console.log('Data read using readFileSync:', dataSync);

//using asynchronous method
fileSystem.readFile('./File handling/example_async.txt', 'utf8', (err, dataAsync) => {
    if (err) throw err;
    console.log('Data read using readFile:', dataAsync);
});

// append data to a file
//using synchronous method
fileSystem.appendFileSync('./File handling/example.txt', '\nThis is an appended line using appendFileSync');
console.log('Data appended successfully using appendFileSync');

//using asynchronous method
fileSystem.appendFile('./File handling/example_async.txt', '\nThis is an appended line using appendFile', (err) => {
    if (err) throw err;
    console.log('Data appended successfully using appendFile');
});

// delete a file
//using synchronous method
// fileSystem.unlinkSync('./File handling/example.txt');
// console.log('File deleted successfully using unlinkSync');

//using asynchronous method
// fileSystem.unlink('./File handling/example_async.txt', (err) => {
//     if (err) throw err;
//     console.log('File deleted successfully using unlink');
// });

// rename a file
//using synchronous method
fileSystem.renameSync('./File handling/example.txt', './File handling/example_renamed.txt');
console.log('File renamed successfully using renameSync');

//using asynchronous method
fileSystem.rename('./File handling/example_async.txt', './File handling/example_async_renamed.txt', (err) => {
    if (err) throw err;
    console.log('File renamed successfully using rename');
});