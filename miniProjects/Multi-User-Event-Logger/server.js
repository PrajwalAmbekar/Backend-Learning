const http = require("http");
const fs = require("fs");
const userDetails = require("./db.js");
const url = require("url");
const routes = require("./route.js");

const server = http.createServer((req, res) => {
  //create a simple log file with userId || timestamps || details

  if (!fs.existsSync("./miniProjects/Multi-User-Event-Logger/logs.txt")) {
    userDetails.createLogsFile();
  }

  //routing
  const parseUrl = url.parse(req.url, true);
  routes(req, res, parseUrl.pathname, parseUrl);
});
const PORT = 8000;
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server is running on http://localhost:" + PORT);
});
