const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Request received:", req.method, req.url);
  const now = new Date(); // 2024-06-20T14:28:23.382Z
  const nowString = new Date().toString(); // Thu Jun 20 2024 14:28:23 GMT+0000 (Coordinated Universal Time)
  const nowISOString = new Date().toISOString(); // 2024-06-20T14:28:23.382Z
  const nowLocaleString = new Date().toLocaleString(); // 6/20/2024, 2:28:23 PM

  console.log("Current Date and Time:", now);
  console.log("Date as String:", nowString);
  console.log("Date as ISO String:", nowISOString);
  console.log("Date as Locale String:", nowLocaleString);

  const logline = `At this time :- ${nowString} -Server using - ${req.url}\n`;

  fs.appendFile("./HTTP Request/server.log", logline, (err) => {
    if (err) {
      console.error("Error writing to log file", err);
    }
    // // console.log(req.headers);
    // res.end("Hello,World!");

    switch (req.url) {
      case "/":
        res.end("Hello, World!");
        break;
      case "/about":
        res.end("This is the about page.");
        break;
      case "/contact":
        res.end("This is the contact page.");
        break;
      default:
        res.statusCode = 404;
        res.end("404 Not Found");
    }
  });
});

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
