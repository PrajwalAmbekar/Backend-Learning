const http = require('http');
const userDetails  = require('./db.js');
const url = require('url');
const routes = require('./route.js');

const server = http.createServer((req,res) => {
  //create a simple log file with userId || timestamps || details
  userDetails.createLogsFile();
  //routing can be added here for different endpoints
  const parseUrl = url.parse(req.url,true);
  routes(req,res,parseUrl.pathname,parseUrl);
});
const PORT =8000;
server.listen(PORT,(err) =>{
  if(err) throw err;
  console.log('Server is running on http://localhost:' + PORT);
})
