
const fs = require('fs');

const createLogsFile = () =>{ fs.writeFile('./miniProjects/Multi-User-Event-Logger/logs.txt','' ,((err)=>{
    if(err) throw err;
    console.log('Logs file created');
}))};


module.exports = createLogsFile;