const http = require('http');
const createLogsFile  = require('./db.js');
const fs = require('fs');

const server = http.createServer((req,res) => {
  //create a simple log file with userId || timestamps || details
  createLogsFile();
  res.end('Event logged');
 
  //routing can be added here for different endpoints
  
});
const PORT =8000;
server.listen(PORT,(err) =>{
  if(err) throw err;;
  console.log('Server is running on http://localhost:' + PORT);
})